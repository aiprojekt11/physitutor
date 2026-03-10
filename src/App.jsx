import React, { useState, useRef, useEffect } from 'react';
import { Send, Calculator, BookOpen, FunctionSquare, ArrowRightLeft, Sparkles, Loader2, RefreshCw, Camera, X, Activity, MessageSquare, User } from 'lucide-react';

// --- SYSTEM PROMPT (Zintegrowana Karta Wzorów CKE + Złota Struktura bez rysunków) ---
const SYSTEM_PROMPT = `Rola: Jesteś ekspertem z fizyki i bardzo cierpliwym nauczycielem przygotowującym polskich uczniów do matury z fizyki na poziomie rozszerzonym. Twoja filozofia to absolutne skupienie na fundamentach i rozwiązywanie zadań krok po kroku w eleganckich, ustrukturyzowanych blokach.

Zasady, których musisz bezwzględnie przestrzegać:
1. ROZPOZNAWANIE INTENCJI UCZNIA:
   - NOWE ZADANIE: Zastosuj rygorystyczną "Złotą Strukturę Odpowiedzi" (opisana na końcu).
   - PYTANIE DODATKOWE / KONTYNUACJA: Odpowiedz w sposób naturalny i niezwykle łagodny. Rozwiej wątpliwości.
2. SYMBOLE Z POLSKIEJ KARTY WZORÓW CKE (KRYTYCZNE):
   - Prędkość: $v$, $v_0$, Droga: $s$, Przyspieszenie dośrodkowe: $a_{do}$
   - Siła tarcia: $T$ lub $T_k$, $T_s$, Siła sprężystości: $F_s = -kx$
   - Moment siły: $M$ (bezwzględny zakaz używania greckiej litery tau), Praca: $W$
3. TYLKO WZORY FUNDAMENTALNE: Zawsze zaczynaj od absolutnych fundamentów. Zanim zapiszesz równanie, krótko wyjaśnij, Z CZEGO TO WYNIKA.
4. ZAWSZE WYJAŚNIAJ PRZYBLIŻENIA (KRYTYCZNE): Nigdy nie przeskakuj ukrytych założeń. (np. dla małych kątów wahadła $\\sin\\alpha \\approx \\alpha \\approx \\frac{x}{l}$). Napisz po prostu, z czego to wynika.
5. KOMPAKTOWE OBLICZENIA LICZBOWE: Kiedy podstawiasz liczby do wzoru, rób to w JEDNEJ ciągłej linii, stosując łańcuch znaków równości (zmienna = liczby = kroki = wynik z jednostką). Nie rozbijaj tego na wiele pionowych bloków!
6. FORMATOWANIE MATEMATYKI: Używaj WYŁĄCZNIE standardowego formatu LaTeX. Zawsze otaczaj symbole w tekście pojedynczymi dolarami ($v$). Wzory główne i przekształcenia zamykaj w podwójnych dolarach ($$ ... $$), używając \\\\ do nowej linii.
7. PRZESŁANE ZDJĘCIA ZADAŃ: Odczytaj treść i dane ze zdjęcia, a następnie rozwiąż. Nie wspominaj, że czytasz ze zdjęcia.
8. Złota Struktura Odpowiedzi (DLA NOWYCH ZADAŃ) - Używaj nagłówków ###:
   - 💡 Zrozumienie zjawiska: Krótki, obrazowy opis sytuacji.
   - 📝 Dane i Szukane: Wypisane z oficjalnymi symbolami.
   - ⚙️ Wzory i Prawa: Jakich praw fizyki użyjemy.
   - 🧮 Przekształcenia (Krok po kroku): Powolne wyprowadzenie wzoru końcowego (na literach).
   - 🔢 Obliczenia i Wynik: Zwięzłe podstawienie liczb w JEDNEJ LINII i odpowiedź końcowa.
   - ⚠️ Typowy błąd (Opcjonalnie): Ostrzeżenie przed częstym błędem maturzystów.`;

const apiKey = ""; // Pusty klucz - w środowisku testowym jest wstrzykiwany automatycznie

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Inicjalizacja modułu Edu-Core... Cześć! Jestem Twoim prywatnym nauczycielem fizyki. Wklej treść zadania lub zrób zdjęcie z książki, a rozwiążę je dla Ciebie krok po kroku w czytelnych blokach.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [katexLoaded, setKatexLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth"
        });
      }
    }, 150);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, katexLoaded, selectedImage]);

  useEffect(() => {
    if (document.getElementById('katex-css')) {
      if (window.katex) setKatexLoaded(true);
      return;
    }
    const link = document.createElement('link');
    link.id = 'katex-css'; link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.id = 'katex-js';
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    script.onload = () => setKatexLoaded(true);
    document.head.appendChild(script);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      const base64 = result.split(',')[1];
      setSelectedImage({ base64, mimeType: file.type, dataUrl: result });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const callAI = async (userText, imageObj) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: userText, imageUrl: imageObj?.dataUrl }]);
    setInputValue('');
    setSelectedImage(null);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const historyContents = messages.filter((_, idx) => idx !== 0).map(msg => {
      const parts = [];
      if (msg.text) parts.push({ text: msg.text });
      if (msg.imageUrl) {
        const [prefix, base64] = msg.imageUrl.split(',');
        const mimeType = prefix.match(/:(.*?);/)[1];
        parts.push({ inlineData: { mimeType, data: base64 } });
      }
      return { role: msg.role === 'ai' ? 'model' : 'user', parts };
    });
      
    const currentParts = [{ text: userText.trim() ? userText : "Przeczytaj treść zadania ze zdjęcia i rozwiąż je zgodnie ze swoimi instrukcjami." }];
    if (imageObj) currentParts.push({ inlineData: { mimeType: imageObj.mimeType, data: imageObj.base64 } });
    historyContents.push({ role: 'user', parts: currentParts });

    try {
      const fetchWithRetry = async (retries = 5, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
          try {
            const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ contents: historyContents, systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] } })
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
          } catch (e) {
            if (i === retries - 1) throw e;
            await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));
          }
        }
      };

      const result = await fetchWithRetry();
      let aiText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (aiText) {
        setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      }
    } catch (error) {
      console.error("API Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: '⚠️ Problem z połączeniem. Odśwież stronę (F5) i spróbuj ponownie.' }]);
    } finally { setIsLoading(false); }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if ((!inputValue.trim() && !selectedImage) || isLoading) return;
    callAI(inputValue, selectedImage);
  };

  const renderText = (text) => {
    if (!katexLoaded || !window.katex) return <div className="text-cyan-600 animate-pulse font-mono text-sm tracking-widest">Inicjalizacja modułu matematycznego...</div>;

    const cb = '```';
    let clean = text.replace(/<frac>([^|}]*)[|}]?([^<]*)(<\/frac>|\})/g, '\\frac{$1}{$2}')
                    .replace(/<sqrt>/g, '\\sqrt{').replace(/<\/sqrt>/g, '}');
                 
    const parts = clean.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

    return parts.map((part, i) => {
      // 1. BLOKI MATEMATYKI ($$)
      if (part.startsWith('$$') && part.endsWith('$$')) {
        let math = part.slice(2, -2).trim();
        if (math.includes('\\\\') && !math.includes('\\begin{')) {
          math = `\\begin{aligned} ${math} \\end{aligned}`;
        }
        try {
          const html = window.katex.renderToString(math, { displayMode: true, throwOnError: false });
          return <div key={i} dangerouslySetInnerHTML={{ __html: html }} className="my-3 overflow-x-auto overflow-y-visible py-3 px-4 bg-[#050B14] text-cyan-300 rounded-xl border border-cyan-500/20 text-center font-serif drop-shadow-[0_0_5px_rgba(34,211,238,0.2)] custom-scrollbar" />;
        } catch (e) { return <div key={i} className="text-red-500 font-mono text-xs">{part}</div>; }
      }

      // 2. WZORY INLINE ($)
      if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);
        try {
          const html = window.katex.renderToString(math, { displayMode: false, throwOnError: false });
          return <span key={i} dangerouslySetInnerHTML={{ __html: html }} className="mx-1 text-cyan-200 drop-shadow-[0_0_3px_rgba(34,211,238,0.4)] inline-block align-middle font-serif" />;
        } catch (e) { return <span key={i} className="text-red-500 text-xs">{part}</span>; }
      }

      // 3. ZWYKŁY TEKST I ZNACZNIKI SCI-FI
      let textHtml = part.replace(new RegExp(cb + '[a-zA-Z]*\\n?', 'g'), '').replace(new RegExp(cb, 'g'), '');
      textHtml = textHtml
        .replace(/</g, '&lt;').replace(/>/g, '&gt;') 
        .replace(/\*\*([^*]+)\*\*/g, '<span class="text-cyan-400 font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">$1</span>')
        .replace(/### (.*)/g, '<span class="block text-base font-bold text-purple-400 mt-6 mb-3 border-b border-purple-500/20 pb-1 uppercase tracking-wider flex items-center gap-2"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>$1</span>')
        .replace(/## (.*)/g, '<span class="block text-lg font-bold text-cyan-400 mt-6 mb-2 uppercase tracking-widest">$1</span>')
        .replace(/\n/g, '<br />'); 

      return <span key={i} dangerouslySetInnerHTML={{ __html: textHtml }} className="text-cyan-50/80 leading-relaxed font-sans text-sm md:text-base" />;
    });
  };

  const [calcSpeed, setCalcSpeed] = useState({ kmh: '', ms: '' });
  const handleSpeedConvert = (type, value) => {
    if (value === '') { setCalcSpeed({ kmh: '', ms: '' }); return; }
    const num = parseFloat(value);
    if (isNaN(num)) return;
    if (type === 'kmh') setCalcSpeed({ kmh: value, ms: (num / 3.6).toFixed(2) });
    else setCalcSpeed({ kmh: (num * 3.6).toFixed(2), ms: value });
  };

  const [calcForce, setCalcForce] = useState({ m: '', a: '', f: '' });
  const handleForceCalc = () => {
    const m = parseFloat(calcForce.m);
    const a = parseFloat(calcForce.a);
    if (!isNaN(m) && !isNaN(a)) setCalcForce({ ...calcForce, f: (m * a).toFixed(2) });
  };

  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6, 182, 212, 0.3); border-radius: 10px; }
      `}</style>

      <div className="flex h-screen w-full bg-[#020617] text-cyan-50 font-sans overflow-hidden selection:bg-cyan-900 selection:text-cyan-50">
        
        {/* LEWY PASEK NAWIGACJI */}
        <div className="w-16 md:w-20 bg-slate-900/80 border-r border-cyan-500/20 flex flex-col items-center py-6 z-20 shrink-0 backdrop-blur-xl hidden md:flex">
          {/* Logo / System Icon */}
          <div className="flex h-10 w-10 bg-[#020617] border border-cyan-400 items-center justify-center rounded-xl mb-8 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          
          {/* Chat Icon */}
          <button 
            onClick={() => setActiveTab('chat')}
            className={`p-2.5 rounded-xl mb-4 transition-all group shadow-[0_0_10px_rgba(34,211,238,0.1)] ${activeTab === 'chat' ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-400/50' : 'bg-[#020617]/50 text-cyan-700 border border-transparent hover:border-cyan-800 hover:text-cyan-500'}`}
            title="Tłumacz AI"
          >
            <MessageSquare className="w-5 h-5 group-hover:scale-105 transition-transform" />
          </button>

          {/* Calculator Icon */}
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`p-2.5 rounded-xl transition-all group shadow-[0_0_10px_rgba(34,211,238,0.1)] ${activeTab === 'calculator' ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-400/50' : 'bg-[#020617]/50 text-cyan-700 border border-transparent hover:border-cyan-800 hover:text-cyan-500'}`}
            title="Narzędzia i Kalkulatory"
          >
            <Calculator className="w-5 h-5 group-hover:scale-105 transition-transform" />
          </button>
        </div>

        {/* GŁÓWNY PANEL */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#020617]">
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d408_1px,transparent_1px),linear-gradient(to_bottom,#06b6d408_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 pointer-events-none z-0"></div>

          <header className="p-4 md:px-8 border-b border-cyan-500/10 bg-slate-900/20 backdrop-blur-sm z-10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="md:hidden flex h-8 w-8 bg-[#020617] border border-cyan-400 items-center justify-center rounded-xl shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-cyan-50 tracking-widest uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">
                  PhysiTutor <span className="text-purple-400 text-[10px] align-top font-mono ml-1">v3.1</span>
                </h1>
                <p className="text-[8px] md:text-[10px] text-cyan-500/50 font-mono tracking-widest uppercase">CKE Optimized • Core-Node Ready</p>
              </div>
            </div>
            <div className="flex gap-2 font-mono text-[10px] text-cyan-600/70">
              <span className="hidden sm:inline border border-cyan-900/50 px-2 py-0.5 rounded">SYS: OK</span>
            </div>
          </header>

          {activeTab === 'chat' ? (
            <div className="flex-1 flex flex-col relative min-h-0">
              
              {/* Obszar Wiadomości - Zmieniony na styl Gemini (pełna szerokość) */}
              <div ref={messagesContainerRef} className="flex-1 overflow-y-auto pt-4 scroll-smooth custom-scrollbar z-10">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`w-full py-6 md:py-8 ${msg.role === 'ai' ? 'bg-slate-900/40 border-y border-cyan-500/10' : ''}`}
                  >
                    <div className="max-w-4xl mx-auto px-4 md:px-8 flex gap-4 md:gap-6">
                      
                      {/* Awatar */}
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-cyan-900/40 border border-cyan-500/30 text-cyan-400' 
                          : 'bg-[#020617] border border-purple-500/40 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                      }`}>
                        {msg.role === 'user' ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                      </div>

                      {/* Treść Wiadomości */}
                      <div className="flex-1 space-y-4 overflow-hidden pt-1 md:pt-2">
                        {msg.role === 'user' ? (
                          <div className="text-lg md:text-xl text-cyan-50 font-medium leading-relaxed drop-shadow-sm">
                            {msg.text}
                            {msg.imageUrl && (
                              <img src={msg.imageUrl} alt="Skan" className="max-w-sm w-full mt-6 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.15)] mix-blend-screen" />
                            )}
                          </div>
                        ) : (
                          <div className="text-sm md:text-base leading-relaxed">
                            {renderText(msg.text)}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="w-full py-6 md:py-8 bg-slate-900/40 border-y border-cyan-500/10 animate-in fade-in duration-500">
                    <div className="max-w-4xl mx-auto px-4 md:px-8 flex gap-4 md:gap-6">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#020617] border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="flex-1 flex items-center gap-3 pt-1 md:pt-2">
                        <Loader2 className="w-5 h-5 text-cyan-500 animate-spin" />
                        <span className="text-sm font-mono text-cyan-500/80 tracking-widest uppercase animate-pulse">Analiza równań fizycznych...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="h-40 md:h-48 w-full shrink-0"></div>
              </div>

              {/* Panel Inputu */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent pt-32 pointer-events-none">
                <div className="max-w-4xl mx-auto relative pointer-events-auto">
                  
                  {selectedImage && (
                    <div className="absolute -top-24 left-4 bg-slate-900/90 p-1.5 rounded-lg border border-cyan-500/40 z-30 animate-in slide-in-from-bottom-2">
                      <div className="relative group">
                        <img src={selectedImage.dataUrl} alt="Podgląd" className="h-16 w-auto rounded mix-blend-screen" />
                        <button 
                          type="button" 
                          onClick={() => setSelectedImage(null)}
                          className="absolute -top-2 -right-2 bg-red-500/80 text-white rounded p-0.5 hover:bg-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSendMessage} className="relative flex items-center gap-2 bg-[#050B14]/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-2 shadow-[0_0_25px_rgba(6,182,212,0.1)]">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3 text-cyan-600 hover:text-cyan-300 hover:bg-cyan-900/30 rounded-xl transition-all"
                      title="Załącz zdjęcie"
                    >
                      <Camera className="w-6 h-6" />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />

                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                      placeholder="Napisz do PhysiTutor..."
                      className="w-full bg-transparent px-3 py-3 text-cyan-50 resize-none h-[52px] focus:outline-none font-sans text-base placeholder-cyan-900/60 custom-scrollbar"
                    />
                    
                    <button
                      type="submit"
                      disabled={isLoading || (!inputValue.trim() && !selectedImage)}
                      className="bg-cyan-600 hover:bg-cyan-500 text-[#020617] p-3 rounded-xl transition-all disabled:opacity-30 disabled:bg-cyan-900 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                    >
                      <Send className="w-6 h-6 ml-0.5" />
                    </button>
                  </form>
                  <div className="text-center mt-3">
                    <span className="text-[10px] text-cyan-800/60 font-mono tracking-widest uppercase">PhysiTutor AI może popełniać błędy. Weryfikuj wyniki z kartą wzorów.</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-8 bg-transparent relative z-10 custom-scrollbar">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  <Calculator className="text-cyan-400" /> Narzędzia Systemowe
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="bg-slate-900/40 p-6 rounded-2xl shadow-sm border border-cyan-500/20 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
                      <ArrowRightLeft className="w-5 h-5 text-purple-400" /> Przelicznik Prędkości
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-cyan-600 mb-1">Kilometry na godzinę [km/h]</label>
                        <input 
                          type="number" 
                          value={calcSpeed.kmh}
                          onChange={(e) => handleSpeedConvert('kmh', e.target.value)}
                          className="w-full p-3 bg-[#020617]/50 text-cyan-50 border border-cyan-500/30 rounded-xl focus:ring-1 focus:ring-cyan-400 focus:outline-none font-mono"
                          placeholder="np. 72"
                        />
                      </div>
                      <div className="flex justify-center text-purple-500/50">
                        <RefreshCw className="w-5 h-5" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-cyan-600 mb-1">Metry na sekundę [m/s]</label>
                        <input 
                          type="number" 
                          value={calcSpeed.ms}
                          onChange={(e) => handleSpeedConvert('ms', e.target.value)}
                          className="w-full p-3 bg-[#020617]/50 text-cyan-50 border border-cyan-500/30 rounded-xl focus:ring-1 focus:ring-cyan-400 focus:outline-none font-mono"
                          placeholder="np. 20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/40 p-6 rounded-2xl shadow-sm border border-cyan-500/20 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
                      <FunctionSquare className="w-5 h-5 text-purple-400" /> II Zasada Dynamiki
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-cyan-600 mb-1">Masa (m) [kg]</label>
                        <input 
                          type="number" 
                          value={calcForce.m}
                          onChange={(e) => setCalcForce({...calcForce, m: e.target.value})}
                          className="w-full p-3 bg-[#020617]/50 text-cyan-50 border border-cyan-500/30 rounded-xl focus:ring-1 focus:ring-cyan-400 focus:outline-none font-mono"
                          placeholder="np. 10"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-cyan-600 mb-1">Przyspieszenie (a) [m/s²]</label>
                        <input 
                          type="number" 
                          value={calcForce.a}
                          onChange={(e) => setCalcForce({...calcForce, a: e.target.value})}
                          className="w-full p-3 bg-[#020617]/50 text-cyan-50 border border-cyan-500/30 rounded-xl focus:ring-1 focus:ring-cyan-400 focus:outline-none font-mono"
                          placeholder="np. 9.81"
                        />
                      </div>
                      <button 
                        onClick={handleForceCalc}
                        className="w-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/50 font-bold py-3 rounded-xl hover:bg-cyan-600/40 transition-colors shadow-sm"
                      >
                        Oblicz Siłę (F)
                      </button>
                      {calcForce.f && (
                        <div className="mt-4 p-4 bg-[#050B14] border border-cyan-500/30 rounded-xl text-center shadow-inner">
                          <span className="text-sm text-cyan-600/80">Wynik:</span>
                          <p className="text-2xl font-bold text-cyan-300 font-mono drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">{calcForce.f} <span className="text-lg">N</span></p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}