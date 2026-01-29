import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Konfigurace z Vercel Environment Variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const translations = {
  cs: { flag: "🇨🇿", login: "Přihlášení", register: "Registrace", client: "HLEDÁM ŘEMESLNÍKA 🏠", pro: "JSEM ŘEMESLNÍK 🛠️", back: "⬅ Zpět", logout: "Odhlásit", email: "E-mail", pass: "Heslo", btnLogin: "VSTOUPIT", btnReg: "ZAREGISTROVAT SE" },
  en: { flag: "🇬🇧", login: "Login", register: "Register", client: "I NEED A PRO 🏠", pro: "I AM A PRO 🛠️", back: "⬅ Back", logout: "Logout", email: "Email", pass: "Password", btnLogin: "LOGIN", btnReg: "SIGN UP" },
  de: { flag: "🇩🇪", login: "Login", register: "Register", client: "PROFI SUCHEN 🏠", pro: "ICH BIN PROFI 🛠️", back: "⬅ Zurück", logout: "Abmelden", email: "E-mail", pass: "Passwort", btnLogin: "EINLOGGEN", btnReg: "REGISTRIEREN" },
  es: { flag: "🇪🇸", login: "Login", register: "Registro", client: "BUSCO PRO 🏠", pro: "SOY PRO 🛠️", back: "⬅ Volver", logout: "Salir", email: "Correo", pass: "Contraseña", btnLogin: "ENTRAR", btnReg: "REGISTRARSE" },
  it: { flag: "🇮🇹", login: "Login", register: "Registro", client: "CERCO PRO 🏠", pro: "SONO PRO 🛠️", back: "⬅ Indietro", logout: "Esci", email: "Email", pass: "Password", btnLogin: "ACCEDI", btnReg: "REGISTRATI" }
};

function App() {
  const [lang, setLang] = useState('cs');
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [view, setView] = useState('main'); // main, login, register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const t = translations[lang];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleAuth = async (type) => {
    try {
      if (type === 'register') await createUserWithEmailAndPassword(auth, email, password);
      else await signInWithEmailAndPassword(auth, email, password);
      setView('main');
    } catch (e) { alert("Chyba: " + e.message); }
  };

  // Obrazovka přihlášení / registrace
  if (view === 'login' || view === 'register') {
    return (
      <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <button onClick={() => setView('main')}>{t.back}</button>
        <h2>{view === 'login' ? t.login : t.register}</h2>
        <input type="email" placeholder={t.email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', margin: '10px 0' }} />
        <input type="password" placeholder={t.pass} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', margin: '10px 0' }} />
        <button onClick={() => handleAuth(view)} style={{ width: '100%', padding: '15px', backgroundColor: '#ffcc00', border: 'none', fontWeight: 'bold' }}>
          {view === 'login' ? t.btnLogin : t.btnReg}
        </button>
      </div>
    );
  }

  // Hlavní rozcestník
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        {Object.keys(translations).map(l => (
          <button key={l} onClick={() => setLang(l)} style={{ fontSize: '20px', margin: '5px', border: lang === l ? '2px solid black' : '1px solid #ccc' }}>{translations[l].flag}</button>
        ))}
      </div>
      
      <h1>⚡ BLESK.ai</h1>

      {!user ? (
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setView('login')} style={{ margin: '10px', padding: '10px' }}>{t.login}</button>
          <button onClick={() => setView('register')} style={{ margin: '10px', padding: '10px' }}>{t.register}</button>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <p>📧 {user.email}</p>
          <button onClick={() => setRole('zakaznik')} style={{ width: '100%', maxWidth: '300px', padding: '20px', margin: '10px', backgroundColor: '#222', color: '#ffcc00', borderRadius: '15px', fontWeight: 'bold' }}>{t.client}</button>
          <button onClick={() => setRole('remeslnik')} style={{ width: '100%', maxWidth: '300px', padding: '20px', margin: '10px', backgroundColor: '#ffcc00', color: '#222', borderRadius: '15px', fontWeight: 'bold' }}>{t.pro}</button>
          <br /><button onClick={() => signOut(auth)} style={{ marginTop: '20px', color: 'red' }}>{t.logout}</button>
        </div>
      )}

      {role && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white', padding: '20px' }}>
          <button onClick={() => setRole(null)}>{t.back}</button>
          <h2>{role === 'zakaznik' ? t.client : t.pro}</h2>
          <p>Pracovní plocha pro {lang}...</p>
        </div>
      )}
    </div>
  );
}

export default App;
        
