import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  createUserForGoogle,
} from "./utils/firebase";

const SignUp = () => {
  // form state
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserForGoogle(email, password);
      const userDocRef = await createUserDocFromAuth(user, { displayName });
      console.log(user);
      console.log(userDocRef);

      setDisplayName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err.message);
      console.log(err.code);
      if (err.code === "auth/email-already-in-use") {
        alert("Email-already-in-use");
      }
      if (err.code === "auth/invalid-email") {
        alert("Invalid-email");
      }
    }
  };

  return (
    <div className="form">
      <div className="form-control">
        <label htmlFor="displayName">Display Name</label>
        <input
          type="text"
          name="displayName"
          id="displayName"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
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
        <button type="submit" onClick={signUpHandler}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
