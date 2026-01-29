import React, { useState } from 'react';

function App() {
  const [zprava, setZprava] = useState('');
  const [odpoved, setOdpoved] = useState('');
  const [loading, setLoading] = useState(false);

  const vygenerujOdpoved = async () => {
    if (!zprava) return alert("Nejdřív něco napiš!");
    setLoading(true);
    setOdpoved("Blesk přemýšlí...");
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "user", 
            content: `Jsi profi řemeslník. Odpověz bleskově a stručně na tuhle poptávku: ${zprava}. Navrhni termín a cenu.`
          }]
        })
      });

      const data = await response.json();
      if (data.choices) {
        setOdpoved(data.choices[0].message.content);
      } else {
        setOdpoved("Chyba: Zkontroluj, zda máš na OpenAI nahraný kredit.");
      }
    } catch (error) {
      setOdpoved("Chyba spojení s AI.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#007bff', padding: '20px', borderRadius: '15px', color: 'white', marginBottom: '20px' }}>
        <h1>⚡ Blesk.ai</h1>
        <p>AI asistent pro řemeslníky</p>
      </header>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <textarea 
          style={{ width: '100%', height: '100px', borderRadius: '10px', padding: '10px', fontSize: '16px' }}
          placeholder="Co píše zákazník?"
          value={zprava}
          onChange={(e) => setZprava(e.target.value)}
        />
        
        <button 
          onClick={vygenerujOdpoved}
          disabled={loading}
          style={{ width: '100%', backgroundColor: '#28a745', color: 'white', padding: '15px', borderRadius: '10px', fontSize: '18px', marginTop: '10px' }}
        >
          {loading ? "Pracuji..." : "Bleskově odpovědět 🚀"}
        </button>

        {odpoved && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '10px', textAlign: 'left' }}>
            <strong>Blesková odpověď:</strong>
            <p>{odpoved}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
