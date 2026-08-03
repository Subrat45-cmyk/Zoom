import { useState, useCallback, useRef, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc, getDoc, updateDoc, onSnapshot, collection, addDoc } from 'firebase/firestore';

export const useWebRTC = (roomId, localStream) => {
  const [participants, setParticipants] = useState([]);
  const pcRef = useRef(null);

  const updateParticipants = useCallback((remoteStream, name = 'Remote User') => {
     setParticipants([{
        id: 'remote',
        name,
        isMuted: false,
        isVideoOff: false,
        stream: remoteStream
     }]);
  }, []);

  useEffect(() => {
    if (!roomId) return;
    let unsubscribeCall = () => {};
    let unsubscribeAnswerCandidates = () => {};
    let unsubscribeOfferCandidates = () => {};

    const setupWebRTC = async () => {
       const pc = new RTCPeerConnection({
         iceServers: [{ urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }]
       });
       pcRef.current = pc;

       const remoteStream = new MediaStream();
       
       if (localStream) {
          localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
       }

       pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
          updateParticipants(remoteStream);
       };

       const callDoc = doc(db, 'calls', roomId);
       const offerCandidates = collection(callDoc, 'offerCandidates');
       const answerCandidates = collection(callDoc, 'answerCandidates');

       const callDocSnap = await getDoc(callDoc);

       if (!callDocSnap.exists() || !callDocSnap.data().offer) {
          // We are caller
          pc.onicecandidate = (event) => {
             event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
          };

          const offerDescription = await pc.createOffer();
          await pc.setLocalDescription(offerDescription);
          await setDoc(callDoc, { offer: { type: offerDescription.type, sdp: offerDescription.sdp } });

          unsubscribeCall = onSnapshot(callDoc, (snapshot) => {
             const data = snapshot.data();
             if (!pc.currentRemoteDescription && data?.answer) {
                const answerDescription = new RTCSessionDescription(data.answer);
                pc.setRemoteDescription(answerDescription);
             }
          });

          unsubscribeAnswerCandidates = onSnapshot(answerCandidates, (snapshot) => {
             snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                   const candidate = new RTCIceCandidate(change.doc.data());
                   pc.addIceCandidate(candidate);
                }
             });
          });
       } else {
          // We are callee
          pc.onicecandidate = (event) => {
             event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
          };

          const offerDescription = callDocSnap.data().offer;
          await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

          const answerDescription = await pc.createAnswer();
          await pc.setLocalDescription(answerDescription);

          await updateDoc(callDoc, { answer: { type: answerDescription.type, sdp: answerDescription.sdp } });

          unsubscribeOfferCandidates = onSnapshot(offerCandidates, (snapshot) => {
             snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                   const candidate = new RTCIceCandidate(change.doc.data());
                   pc.addIceCandidate(candidate);
                }
             });
          });
       }
    };

    setupWebRTC();

    return () => {
       if (pcRef.current) pcRef.current.close();
       unsubscribeCall();
       unsubscribeAnswerCandidates();
       unsubscribeOfferCandidates();
       setParticipants([]);
    };
  }, [roomId, localStream, updateParticipants]);

  return { participants };
};
