import React, { useState } from 'react';

function App() {
  const [zprava, setZprava] = useState('');
  const [odpoved, setOdpoved] = useState('');

  const vygenerujOdpoved = () => {
    if (!zprava) return alert("Nejdřív něco napiš!");
    
    const text = zprava.toLowerCase();
    let finalniText = "";

    // Tady je tvůj "mozek" - hledá klíčová slova
    if (text.includes("malovat") || text.includes("výmalba")) {
      finalniText = "Dobrý den, malování není problém. Používám kvalitní barvy, po práci si po sobě uklidím. Termín mám volný příští týden. Orientační cena za metr je 50-80 Kč včetně materiálu. Hodilo by se vám to?";
    } else if (text.includes("voda") || text.includes("odpad") || text.includes("dřez") || text.includes("trubka")) {
      finalniText = "Zdravím, na instalatérské práce jsem k dispozici. Pokud jde o havárii, můžu dorazit zítra ráno. Cenu odhadnu, až to uvidím, ale počítejte cca 800 Kč za výjezd plus materiál.";
    } else if (text.includes("elektro") || text.includes("zásuvka") || text.includes("světlo")) {
      finalniText = "Dobrý den, s elektrikou vám pomůžu. Jsem certifikovaný, revize dělám taky. Na výměnu zásuvek nebo světel můžu přijet tento pátek. Cena cca 500-1000 Kč dle rozsahu.";
    } else {
      // Univerzální odpověď pro všechno ostatní
      finalniText = "Dobrý den, děkuji za poptávku. Váš požadavek jsem přijal. Můžu se u vás zastavit na obhlídku tento čtvrtek kolem 16:00, abychom dohodli detaily a cenu? Dejte mi vědět.";
    }

    setOdpoved(finalniText);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#222', padding: '20px', borderRadius: '15px', color: '#ffcc00', marginBottom: '20px', borderBottom: '4px solid #ffcc00' }}>
        <h1 style={{ margin: 0 }}>⚡ BLESK.ai</h1>
        <p style={{ margin: '5px 0 0', color: 'white' }}>Profi odpovědi zdarma a bleskově</p>
      </header>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <textarea 
          style={{ width: '100%', height: '120px', borderRadius: '10px', border: '2px solid #ddd', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }}
          placeholder="Vložte text od zákazníka (např. z SMS)..."
          value={zprava}
          onChange={(e) => setZprava(e.target.value)}
        />
        
        <button 
          onClick={vygenerujOdpoved}
          style={{ width: '100%', backgroundColor: '#ffcc00', color: 'black', border: 'none', padding: '18px', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', marginTop: '15px', cursor: 'pointer', boxShadow: '0 4px 0 #ccaa00' }}
        >
          VYGENEROVAT ODPOVĚĎ 🚀
        </button>

        {odpoved && (
          <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#fff9e6', borderRadius: '10px', textAlign: 'left', border: '1px solid #ffcc00', position: 'relative' }}>
            <strong style={{ color: '#886600' }}>Hotová zpráva pro zákazníka:</strong>
            <p style={{ fontSize: '17px', lineHeight: '1.5' }}>{odpoved}</p>
            <button 
              onClick={() => {navigator.clipboard.writeText(odpoved); alert("Zkopírováno!")}}
              style={{ width: '100%', padding: '10px', backgroundColor: '#eee', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}
            >
              📋 Kopírovat text
            </button>
          </div>
        )}
      </div>
      <p style={{ marginTop: '20px', color: '#888', fontSize: '12px' }}>Verze FREE - neomezeně zpráv</p>
    </div>
  );
}

export default App;
