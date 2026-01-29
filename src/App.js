import React, { useState } from 'react';

function App() {
  const [zprava, setZprava] = useState('');
  const [odpoved, setOdpoved] = useState('');

  const vygenerujOdpoved = () => {
    setOdpoved("Blesková odpověď: Jasně, zítra v 8:00 jsem u vás na ten kapající kohoutek. Cenu odhaduji na 800-1200 Kč. Platba kartou možná.");
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#007bff', padding: '20px', borderRadius: '15px', color: 'white', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0 }}>⚡ Blesk.ai</h1>
        <p style={{ margin: '5px 0 0' }}>AI asistent pro profi řemeslníky</p>
      </header>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h3>Co vám píše zákazník?</h3>
        <textarea 
          style={{ width: '100%', height: '100px', borderRadius: '10px', border: '1px solid #ccc', padding: '10px', fontSize: '16px' }}
          placeholder="Např.: Potřebuji vymalovat chodbu..."
          value={zprava}
          onChange={(e) => setZprava(e.target.value)}
        />
        
        <button 
          onClick={vygenerujOdpoved}
          style={{ width: '100%', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '15px', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}
        >
          Bleskově odpovědět 🚀
        </button>

        {odpoved && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '10px', textAlign: 'left', borderLeft: '5px solid #28a745' }}>
            <strong>Návrh odpovědi:</strong>
            <p>{odpoved}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
