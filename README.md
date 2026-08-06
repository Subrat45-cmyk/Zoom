# Auth state in React

Use Firebase's onAuthStateChanged to subscribe to authentication state changes and keep your UI in sync. Below is a minimal example and best practices.

### Example usage

1. Ensure you have your environment configured (.env.local) and the Firebase helpers exported from `src/firebase.js`.

2. Example (see `src/components/AuthExample.jsx` for a working component):

```jsx
import React, { useEffect, useState } from 'react';
import { auth, signInWithGoogle, signInWithEmail, signUpWithEmail, signOutUser } from './src/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading };
}

export default useAuth;
```

### Notes
- Always unsubscribe from onAuthStateChanged when the component unmounts (the example uses the return cleanup function).
- Keep auth logic centralized (hooks or context) and consume `user` across your app via React Context or state management.
- On the server side, verify ID tokens using `firebase-admin` before trusting authenticated requests.
