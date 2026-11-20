import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <>
      <h2>Şifremi Unuttum</h2>
      <p>
        Kayıtlı e-posta adresini yaz, şifreni yenilemen için bir bağlantı
        gönderelim.
      </p>

      {sent && (
        <div className="basari-kutusu">
          <p>Bağlantı {email} adresine gönderildi (demo).</p>
        </div>
      )}

      <form noValidate onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
          <span className="hata">{error}</span>
        </p>

        <button type="submit">Bağlantı gönder</button>
      </form>

      <p>
        <Link to="/login">← Girişe dön</Link>
      </p>
    </>
  );
}

export default ForgotPasswordPage;