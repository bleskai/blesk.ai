import React, { useState } from 'react';

const translations = {
  cs: { flag: "🇨🇿", login: "Přihlášení", register: "Registrace", myAccount: "Můj Účet", wallet: "Peněženka", credit: "Kredit", calendar: "Můj Kalendář", settings: "Nastavení", logout: "Odhlásit se", client: "ZÁKAZNÍK", pro: "ŘEMESLNÍK", back: "⬅ Zpět", sections: { painting: "Dobrý den, malování zvládnu...", water: "Zdravím, instalatérské práce dělám..." } },
  en: { flag: "🇬🇧", login: "Login", register: "Register", myAccount: "My Account", wallet: "Wallet", credit: "Credit", calendar: "Calendar", settings: "Settings", logout: "Logout", client: "CUSTOMER", pro: "PRO", back: "⬅ Back", sections: { painting: "Hello, I can paint...", water: "Hi, I am a plumber..." } }
};

function App() {
  const [lang, setLang] = useState('cs');
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('main'); // 'main', 'profile', 'login'
  const [kredit, setKredit] = useState(500);
  const t = translations[lang];

  // Simulované přihlášení
  const handleLogin = () => {
    setIsLoggedIn(true);
    setView('main');
  };

  // --- KOMPONENTA PROFIL / NASTAVENÍ ---
  if (view === 'profile') {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
        <button onClick={() => setView('main')} style={{ marginBottom: '20px' }}>{t.back}</button>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ borderBottom: '2px solid #ffcc00', paddingBottom: '10px' }}>👤 {t.myAccount}</h2>
          
          <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#fff9e6', borderRadius: '10px' }}>
            <h3>💰 {t.wallet}</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{kredit} Kč</p>
            <button style={{ backgroundColor: '#222', color: 'white', padding: '10px', borderRadius: '5px', border: 'none' }}>+ Dobít kredit</button>
          </div>

          <div style={{ margin: '20px 0' }}>
            <h3>📅 {t.calendar}</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '10px', borderBottom: '1px solid #eee' }}>✅ Úterý 14:00 - Malování (Pepa, Praha)</li>
              <li style={{ padding: '10px', borderBottom: '1px solid #eee' }}>✅ Čtvrtek 10:00 - Obhlídka (Jana, Brno)</li>
            </ul>
          </div>

          <button onClick={() => {setIsLoggedIn(false); setView('main');}} style={{ width: '100%', padding: '10px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px' }}>{t.logout}</button>
        </div>
      </div>
    );
  }

  // --- VSTUPNÍ STRÁNKA ---
  if (!role) {
    return (
      <div style={{ padding: '30px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
        <div style={{ marginBottom: '20px' }}>
          {Object.keys(translations).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ fontSize: '20px', margin: '5px', cursor: 'pointer', border: lang === l ? '2px solid #000' : '1px solid #ccc', borderRadius: '5px' }}>{translations[l].flag}</button>
          ))}
        </div>
        <h1>⚡ BLESK.ai</h1>
        <button onClick={() => setRole('zakaznik')} style={{ width: '100%', maxWidth: '300px', padding: '20px', margin: '10px', backgroundColor: '#222', color: '#ffcc00', borderRadius: '15px', fontWeight: 'bold' }}>{t.client}</button>
        <button onClick={() => setRole('remeslnik')} style={{ width: '100%', maxWidth: '300px', padding: '20px', margin: '10px', backgroundColor: '#ffcc00', color: '#222', borderRadius: '15px', fontWeight: 'bold' }}>{t.pro}</button>
        
        {!isLoggedIn && (
           <p onClick={handleLogin} style={{ marginTop: '20px', textDecoration: 'underline', cursor: 'pointer' }}>{t.login} / {t.register}</p>
        )}
      </div>
    );
  }

  // --- HLAVNÍ PRACOVNÍ PLOCHA ---
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setRole(null)}>{t.back}</button>
        {isLoggedIn && role === 'remeslnik' && (
          <button onClick={() => setView('profile')} style={{ backgroundColor: '#222', color: '#ffcc00', padding: '5px 15px', borderRadius: '20px' }}>⚙️ {t.myAccount}</button>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>{role === 'zakaznik' ? 'Nová poptávka' : 'Přehled zakázek'}</h2>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <p>Tady bude komunikační okno...</p>
          {role === 'remeslnik' && <p style={{ color: 'green', fontWeight: 'bold' }}>Dostupný kredit: {kredit} Kč</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
