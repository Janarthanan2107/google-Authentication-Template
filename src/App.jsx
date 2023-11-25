import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGooglePopup, createUserDocFromAuth } from "./utils/firebase";

const App = () => {
  const [user] = useAuthState(auth);

  const createUserDocument = async (user) => {
    if (!user) return;
    const userDocRef = await createUserDocFromAuth(user);
    // Do additional user document-related logic if needed
    return userDocRef;
  };

  useEffect(() => {
    const createUserData = async () => {
      if (user) {
        await createUserDocument(user); // Pass the user object
      }
    };

    createUserData();
  }, [user]);

  const googleHandler = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocument(user);
    } catch (error) {
      console.error("Error during Google sign-in or user document creation:", error.message);
      // Handle the error or show a user-friendly message
    }
  };

  const logoutHandler = () => {
    auth.signOut();
  };

  return (
    <div className="g-container">
      <div className="user" style={{ textAlign: "center" }}>
        {user ? (
          <>
            <img
              src={user.photoURL || "https://kirstymelmedlifecoach.com/wp-content/uploads/2020/10/279-2799324_transparent-guest-png-become-a-member-svg-icon.png"}
              alt={user.displayName}
              className="user-image"
            />
            <h2>{user.displayName}</h2>
          </>
        ) : (
          <>
            <img
              src="https://kirstymelmedlifecoach.com/wp-content/uploads/2020/10/279-2799324_transparent-guest-png-become-a-member-svg-icon.png"
              alt="user"
              className="user-image"
            />
            <h2>Guest</h2>
          </>
        )}
      </div>

      {user ? (
        <button onClick={logoutHandler}>Logout</button>
      ) : (
        <button onClick={googleHandler}>Sign In with Google</button>
      )}
    </div>
  );
};

export default App;
