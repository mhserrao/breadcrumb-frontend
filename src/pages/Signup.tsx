import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signed up!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Sign Up</h2>
      <input
        className="border p-2 mb-2 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2"
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </div>
  );
}
