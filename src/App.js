import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('post');
  const [output, setOutput] = useState('');

  const generate = () => {
    const texts = {
      post: "⚡ BLESKOVÝ POST: Práce hotova! Dnes jsme v akci. #bleskai #remeslo",
      review: "Děkujeme za recenzi! Jsme rádi, že jste spokojeni. Tým Blesk.ai"
    };
    setOutput(texts[activeTab]);
  };

  return (
    <div style={{ backgroundColor: '#0F172A', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#FACC15' }}>BLESK.ai ⚡</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('post')} style={{ flex: 1, padding: '10px', background: activeTab === 'post' ? '#FACC15' : '#334155' }}>Post</button>
        <button onClick={() => setActiveTab('review')} style={{ flex: 1, padding: '10px', background: activeTab === 'review' ? '#FACC15' : '#334155' }}>Recenze</button>
      </div>
      <button onClick={generate} style={{ width: '100%', padding: '15px', background: '#FACC15', fontWeight: 'bold', border: 'none', borderRadius: '8px' }}>VYGENEROVAT</button>
      {output && <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #FACC15', borderRadius: '8px' }}>{output}</div>}
    </div>
  );
}
