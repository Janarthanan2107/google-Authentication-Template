import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "./utils/firebase";

const App = () => {
  const [user, setUser] = useState(null);

  const googleHandler = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
    setUser(user);
  };

  const logoutHandler = () => {
    // Reset the user state to null
    setUser(null);
  };

  return (
    <div className="g-container">
      <div className="user" style={{ textAlign: "center" }}>
        {user ? (
          <>
            <img
              src={
                user.photoURL ||
                "https://kirstymelmedlifecoach.com/wp-content/uploads/2020/10/279-2799324_transparent-guest-png-become-a-member-svg-icon.png"
              }
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
