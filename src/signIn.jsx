import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  signInAuthForGoogle,
} from "./utils/firebase";
// import { doc, getDoc } from "firebase/firestore";

const SignUp = ({ setUser }) => {
  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandler = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInAuthForGoogle(email, password);
      console.log(user);

      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err.message);
      console.log(err.code);
      if (err.code === "auth/invalid-login-credentials") {
        alert("Invalid-login-credentials");
      }
    }
  };

  const googleHandler = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
    // const userDetails = doc(
    //   db,
    //   "user",
    //   userDocRef.firestore._firestoreClient.user.uid
    // );
    // const snapShotOfUserDetails = await getDoc(userDetails);

    // console.log(
    //   snapShotOfUserDetails._document.data.value.mapValue.fields.displayName
    //     .stringValue
    // );
    setUser(user);
  };

  return (
    <form className="form">
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your valid password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex">
        <button type="submit" onClick={signInHandler}>
          Sign In
        </button>
        <button type="button" onClick={googleHandler}>
          Sign In with Google
        </button>
      </div>
    </form>
  );
};

export default SignUp;
