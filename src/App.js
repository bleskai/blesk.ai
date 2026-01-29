import React, { useState } from 'react';

const translations = {
  cs: { flag: "🇨🇿", title: "⚡ BLESK.ai", subtitle: "Profi odpovědi bleskově", placeholder: "Vložte text od zákazníka...", button: "VYGENEROVAT ODPOVĚĎ 🚀", copy: "📋 Kopírovat", whatsapp: "💬 WhatsApp", copied: "Zkopírováno!", sections: {
      painting: "Dobrý den, malování není problém. Termín mám volný příští týden. Cena 50-80 Kč/m2.",
      water: "Zdravím, na instalatérské práce jsem k dispozici. Můžu dorazit zítra ráno.",
      universal: "Dobrý den, děkuji za poptávku. Můžu se u vás zastavit na obhlídku tento čtvrtek v 16:00?"
    }
  },
  de: { flag: "🇩🇪", title: "⚡ BLITZ.ai", subtitle: "Profi-Antworten sofort", placeholder: "Text od Kunden einfügen...", button: "ANTWORT GENERIEREN 🚀", copy: "📋 Kopieren", whatsapp: "💬 WhatsApp", copied: "Kopiert!", sections: {
      painting: "Guten Tag, Malen ist kein Problem. Ich habe nächste Woche Zeit. Preis ca. 5-8 €/m2.",
      water: "Hallo, ich bin für Klempnerarbeiten verfügbar. Ich kann morgen früh kommen.",
      universal: "Guten Tag, danke für die Anfrage. Kann ich diesen Donnerstag um 16:00 Uhr zur Besichtigung kommen?"
    }
  },
  en: { flag: "🇬🇧", title: "⚡ FLASH.ai", subtitle: "Pro answers instantly", placeholder: "Paste customer message...", button: "GENERATE RESPONSE 🚀", copy: "📋 Copy", whatsapp: "💬 WhatsApp", copied: "Copied!", sections: {
      painting: "Hello, I can do the painting. I'm available next week. Price approx. 5-8 EUR/m2.",
      water: "Hi, I'm available for plumbing. I can come tomorrow morning.",
      universal: "Hello, thanks for your inquiry. Can I come for a site visit this Thursday at 4 PM?"
    }
  },
  es: { flag: "🇪🇸", title: "⚡ RAYO.ai", subtitle: "Respuestas profesionales", placeholder: "Pegar mensaje del cliente...", button: "GENERAR RESPUESTA 🚀", copy: "📋 Copiar", whatsapp: "💬 WhatsApp", copied: "¡Copiado!", sections: {
      painting: "Hola, puedo pintar sin problema. Tengo tiempo la próxima semana. Precio 5-8 €/m2.",
      water: "Hola, estoy disponible para fontanería. Puedo ir mañana por la mañana.",
      universal: "Hola, gracias por su consulta. ¿Puedo pasar a ver el trabajo este jueves a las 16:00?"
    }
  },
  it: { flag: "🇮🇹", title: "⚡ LAMPO.ai", subtitle: "Risposte professionali", placeholder: "Incolla il messaggio...", button: "GENERA RISPOSTA 🚀", copy: "📋 Copia", whatsapp: "💬 WhatsApp", copied: "Copiato!", sections: {
      painting: "Buongiorno, posso tinteggiare senza problemi. Sono libero la prossima settimana.",
      water: "Ciao, sono disponibile per lavori idraulici. Posso venire domani mattina.",
      universal: "Buongiorno, grazie per la richiesta. Posso venire per un sopralluogo questo giovedì alle 16:00?"
    }
  }
};

function App() {
  const [lang, setLang] = useState('cs');
  const [zprava, setZprava] = useState('');
  const [odpoved, setOdpoved] = useState('');
  const t = translations[lang];

  const vygenerujOdpoved = () => {
    if (!zprava) return;
    const txt = zprava.toLowerCase();
    // Detekce klíčových slov napříč jazyky
    if (txt.match(/malov|paint|malen|pintar|tintegg/)) setOdpoved(t.sections.painting);
    else if (txt.match(/voda|water|wasser|agua|acqua|trubk|pipe|rohr|tubo/)) setOdpoved(t.sections.water);
    else setOdpoved(t.sections.universal);
  };

  return (
    <div style={{ padding: '15px', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '5px', marginBottom: '15px' }}>
        {Object.keys(translations).map((l) => (
          <button key={l} onClick={() => setLang(l)} style={{ padding: '8px 12px', borderRadius: '8px', border: lang === l ? '2px solid #000' : '1px solid #ccc', backgroundColor: 'white', cursor: 'pointer', fontSize: '18px' }}>
            {translations[l].flag}
          </button>
        ))}
      </div>

      <header style={{ backgroundColor: '#222', padding: '20px', borderRadius: '15px', color: '#ffcc00', marginBottom: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
        <h1 style={{ margin: 0 }}>{t.title}</h1>
        <p style={{ margin: '5px 0 0', opacity: 0.9 }}>{t.subtitle}</p>
      </header>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <textarea style={{ width: '100%', height: '100px', borderRadius: '10px', border: '2px solid #ddd', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }} placeholder={t.placeholder} value={zprava} onChange={(e) => setZprava(e.target.value)} />
        <button onClick={vygenerujOdpoved} style={{ width: '100%', backgroundColor: '#ffcc00', color: 'black', border: 'none', padding: '15px', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}>{t.button}</button>

        {odpoved && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff9e6', borderRadius: '10px', border: '1px solid #ffcc00', textAlign: 'left' }}>
            <p style={{ fontSize: '17px', marginBottom: '15px' }}>{odpoved}</p>
            <button onClick={() => {navigator.clipboard.writeText(odpoved); alert(t.copied)}} style={{ width: '100%', padding: '10px', marginBottom: '10px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>{t.copy}</button>
            <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(odpoved)}`, '_blank')} style={{ width: '100%', padding: '12px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>{t.whatsapp}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
