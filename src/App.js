import React, { useState } from 'react';

const translations = {
  cs: { flag: "🇨🇿", roleQ: "Kdo jste?", client: "HLEDÁM ŘEMESLNÍKA 🏠", pro: "JSEM ŘEMESLNÍK 🛠️", back: "⬅ Zpět", send: "ODESLAT POPTÁVKU 🚀", gen: "GENEROVAT ODPOVĚĎ", payNote: "* Pro zobrazení čísla zákazníka si dobijte kredit.", sections: { painting: "Dobrý den, malování zvládnu příští týden...", water: "Zdravím, na instalatérské práce mám čas zítra...", universal: "Dobrý den, děkuji za poptávku. Můžu se stavit na obhlídku?" } },
  en: { flag: "🇬🇧", roleQ: "Who are you?", client: "I NEED A PRO 🏠", pro: "I AM A PRO 🛠️", back: "⬅ Back", send: "SEND REQUEST 🚀", gen: "GENERATE RESPONSE", payNote: "* To see the customer's phone, top up your credit.", sections: { painting: "Hello, I can do the painting next week...", water: "Hi, I'm available for plumbing tomorrow...", universal: "Hello, thank you for your inquiry. Can I come for a visit?" } },
  de: { flag: "🇩🇪", roleQ: "Wer sind Sie?", client: "PROFI SUCHEN 🏠", pro: "ICH BIN PROFI 🛠️", back: "⬅ Zurück", send: "ANFRAGE SENDEN 🚀", gen: "ANTWORT GENERIEREN", payNote: "* Um die Telefonnummer zu sehen, laden Sie Ihr Guthaben auf.", sections: { painting: "Guten Tag, Malen ist nächste Woche möglich...", water: "Hallo, ich bin morgen für Klempnerarbeiten frei...", universal: "Guten Tag, danke für die Anfrage. Kann ich zur Besichtigung kommen?" } },
  es: { flag: "🇪🇸", roleQ: "¿Quién eres?", client: "BUSCO PROFESIONAL 🏠", pro: "SOY PROFESIONAL 🛠️", back: "⬅ Volver", send: "ENVIAR SOLICITUD 🚀", gen: "GENERAR RESPUESTA", payNote: "* Para ver el teléfono del cliente, recarga tu saldo.", sections: { painting: "Hola, puedo pintar la próxima semana...", water: "Hola, estoy disponible para fontanería mañana...", universal: "Hola, gracias por su consulta. ¿Puedo pasar a ver el trabajo?" } },
  it: { flag: "🇮🇹", roleQ: "Chi sei?", client: "CERCO UN PRO 🏠", pro: "SONO UN PRO 🛠️", back: "⬅ Indietro", send: "INVIA RICHIESTA 🚀", gen: "GENERA RISPOSTA", payNote: "* Per vedere il telefono, ricarica il tuo credito.", sections: { painting: "Buongiorno, posso tinteggiare la prossima settimana...", water: "Ciao, sono disponibile per lavori idraulici domani...", universal: "Buongiorno, grazie per la richiesta. Posso venire per un sopralluogo?" } }
};

function App() {
  const [lang, setLang] = useState('cs');
  const [role, setRole] = useState(null);
  const [zprava, setZprava] = useState('');
  const [odpoved, setOdpoved] = useState('');
  const t = translations[lang];

  const vygenerujOdpoved = () => {
    const txt = zprava.toLowerCase();
    if (txt.match(/malov|paint|malen|pintar|tintegg/)) setOdpoved(t.sections.painting);
    else if (txt.match(/voda|water|wasser|agua|acqua/)) setOdpoved(t.sections.water);
    else setOdpoved(t.sections.universal);
  };

  if (!role) {
    return (
      <div style={{ padding: '30px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
        <div style={{ marginBottom: '20px' }}>
          {Object.keys(translations).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ fontSize: '20px', margin: '5px', cursor: 'pointer', border: lang === l ? '2px solid #000' : '1px solid #ccc', borderRadius: '5px', padding: '5px 10px' }}>{translations[l].flag}</button>
          ))}
        </div>
        <h1 style={{ fontSize: '2.5rem' }}>⚡ BLESK.ai</h1>
        <p style={{ color: '#666' }}>{t.roleQ}</p>
        <button onClick={() => setRole('zakaznik')} style={{ width: '100%', maxWidth: '300px', padding: '20px', margin: '10px', backgroundColor: '#222', color: '#ffcc00', border: 'none', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 'bold' }}>{t.client}</button>
        <button onClick={() => setRole('remeslnik')} style={{ width: '100%', maxWidth: '300px', padding: '20px', margin: '10px', backgroundColor: '#ffcc00', color: '#222', border: 'none', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 'bold' }}>{t.pro}</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <button onClick={() => {setRole(null); setOdpoved(''); setZprava('');}} style={{ float: 'left', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>{t.back}</button>
      <div style={{ clear: 'both', paddingTop: '20px' }}>
        <h2>{role === 'zakaznik' ? t.client : t.pro}</h2>
        <textarea style={{ width: '100%', height: '120px', padding: '10px', borderRadius: '10px', boxSizing: 'border-box' }} placeholder={t.placeholder} value={zprava} onChange={(e) => setZprava(e.target.value)} />
        
        {role === 'zakaznik' ? (
          <button onClick={() => alert("Odesláno!")} style={{ width: '100%', padding: '15px', backgroundColor: '#222', color: 'white', marginTop: '10px', borderRadius: '10px', fontWeight: 'bold' }}>{t.send}</button>
        ) : (
          <div style={{ marginTop: '10px' }}>
            <button onClick={vygenerujOdpoved} style={{ width: '100%', padding: '15px', backgroundColor: '#ffcc00', color: 'black', borderRadius: '10px', fontWeight: 'bold', border: 'none' }}>{t.gen}</button>
            {odpoved && (
              <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'white', borderRadius: '10px', border: '1px solid #ffcc00', textAlign: 'left' }}>
                <p>{odpoved}</p>
                <p style={{ fontSize: '0.8rem', color: 'red', fontWeight: 'bold' }}>{t.payNote}</p>
                <button style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>💳 DOBÍT KREDIT (50 Kč)</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
          
