import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    const res = login({ email: email.trim(), pin: pin.trim() });

    if (!res.ok) {
      setError(res.message || "Login failed.");
      return;
    }

    navigate("/", { replace: true });
  }

  return (
    <div className="stack" style={{ maxWidth: 520, margin: "0 auto" }}>
      <h1>Sign in</h1>
      <p className="muted">Prototype login for exam submission. Not real ABSA authentication.</p>

      <div className="info">
        <strong>Demo login:</strong> This is a prototype for exam submission - not real ABSA authentication.
        No data is sent to a server.
      </div>

      <form className="card" onSubmit={onSubmit}>
        <label className="field">
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
            autoComplete="email"
          />
        </label>

        <label className="field">
          4-digit PIN (demo)
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="1234"
            inputMode="numeric"
            autoComplete="one-time-code"
          />
        </label>

        {error && <div className="error">{error}</div>}

        <button className="btn btnPrimary" type="submit">
          Sign in
        </button>

        <div className="info">Use any valid email + any 4-digit PIN.</div>
      </form>
    </div>
  );
}