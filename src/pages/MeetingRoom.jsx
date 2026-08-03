import React, { useState } from "react";
import { useParams } from "react-router-dom";

const MeetingRoom = () => {
  const { roomId } = useParams();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    alert("Meeting ID copied successfully!");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Meeting Room</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <div>
          <strong>Meeting ID:</strong> {roomId}
        </div>

        <button onClick={copyRoomId}>
          Copy Meeting ID
        </button>
      </div>

      <hr />

      <h2>Chat</h2>

      <div
        style={{
          height: "300px",
          border: "1px solid gray",
          overflowY: "scroll",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button style={{ marginLeft: "10px" }}>
        Send
      </button>
    </div>
  );
};

export default MeetingRoom;