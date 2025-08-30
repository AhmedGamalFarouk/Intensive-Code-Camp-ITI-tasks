import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/config";
import { useNavigate } from "react-router";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { EmailIcon, PasswordIcon } from "../assets/icons/icons"; // Assuming these are still needed
import Button from "../components/Button"; // Import Button component
import FormInput from "../components/FormInput"; // Import FormInput component

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useGoogleAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="card w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <div className="card-body p-0">
          <h2 className="font-heading text-3xl text-center text-base-content mb-2">Sign Up</h2>
          <p className="font-body text-sm text-center text-neutral mb-6">
            Create your account to start ordering!
          </p>

          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <FormInput
              type="email"
              placeholder="mail@site.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              icon={<EmailIcon className="w-5 h-5 text-neutral" />}
            />
            <FormInput
              type="password"
              placeholder="Password"
              required
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              onChange={(e) => setPassword(e.target.value)}
              icon={<PasswordIcon className="w-5 h-5 text-neutral" />}
            />
            <FormInput
              type="password"
              placeholder="Confirm Password"
              required
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<PasswordIcon className="w-5 h-5 text-neutral" />}
            />

            {error && <p className="text-error text-sm text-center">{error}</p>}

            <Button type="submit" children={"Sign Up"} className="w-full mt-4" />
          </form>

          <div className="divider font-body text-neutral my-6">OR</div>

          <Button variant="outline" children={
            <>
              <span className="text-xl mr-2">G</span>
              Sign up with Google
            </>
          } className="w-full" onClick={login} />
        </div>
      </div>
    </div>
  );
}
