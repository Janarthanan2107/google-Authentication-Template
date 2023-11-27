import { useEffect, useState } from "react";
import "./App.css";
import SignUp from "./signUp";
import SignIn from "./signIn";
import {
  createUserDocFromAuth,
  onAuthStateChangeListener,
  signOutUser,
  getUserDataFromCollection,
} from "./utils/firebase";

const App = () => {
  const [user, setUser] = useState(null);

  const logoutHandler = async () => {
    // Reset the user state to null
    await signOutUser();
  };

  useEffect(() => {
    // adding listener function
    const unSubscribe = onAuthStateChangeListener(async (user) => {
      setUser(user);
      console.log(user);
      if (user) {
        createUserDocFromAuth(user);
        const userData = await getUserDataFromCollection(user);
        setUser((prevUser) => ({ ...prevUser, ...userData })); // Update user with additional data
      }
    });

    return unSubscribe;
  }, []);

  return (
    <div className="g-container">
      <div className="user" style={{ textAlign: "center" }}>
        {user ? (
          <>
            <h2>{user.displayName}</h2>
          </>
        ) : (
          <>
            <h2>Guest</h2>
          </>
        )}
      </div>

      {user ? (
        <button onClick={logoutHandler}>Logout</button>
      ) : (
        <span className="flex" style={{ gap: "100px" }}>
          <SignIn setUser={setUser} />
          <SignUp setUser={setUser} />
        </span>
      )}
    </div>
  );
};

export default App;
