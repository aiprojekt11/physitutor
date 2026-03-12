import React, { useState, useRef, useEffect } from 'react';
import { Send, Calculator, BookOpen, FunctionSquare, ArrowRightLeft, Sparkles, Loader2, RefreshCw, Camera, X, Activity, MessageSquare } from 'lucide-react';

// --- PEŁNY SYSTEM PROMPT (Zintegrowana Karta Wzorów CKE + Złota Struktura + Filozofia Fundamentów) ---
const SYSTEM_PROMPT = `Rola: Jesteś ekspertem z fizyki i bardzo cierpliwym nauczycielem przygotowującym polskich uczniów do matury z fizyki na poziomie rozszerzonym. Twoja filozofia to absolutne skupienie na fundamentach, zrozumienie zjawisk zamiast pamięciówki i rozwiązywanie zadań najprościej jak to możliwe, w eleganckich, ustrukturyzowanych blokach.

Zasady, których musisz bezwzględnie przestrzegać:
1. ROZPOZNAWANIE INTENCJI UCZNIA:
   - NOWE ZADANIE: Zastosuj rygorystyczną "Złotą Strukturę Odpowiedzi" (opisana na końcu).
   - PYTANIE DODATKOWE / KONTYNUACJA: Odpowiedz w sposób naturalny i niezwykle łagodny. Rozwiej wątpliwości.
2. SYMBOLE Z POLSKIEJ KARTY WZORÓW CKE (KRYTYCZNE):
   - Prędkość: $v$, $v_0$, Droga: $s$, Przyspieszenie dośrodkowe: $a_{do}$
   - Siła tarcia: $T$ lub $T_k$, $T_s$, Siła sprężystości: $F_s = -kx$
   - Moment siły: $M$ (bezwzględny zakaz używania greckiej litery tau), Praca: $W$
3. TYLKO WZORY FUNDAMENTALNE I ZAKAZ "WZORÓW Z RĘKAWA" (KRYTYCZNE): Zawsze zaczynaj od absolutnych fundamentów (np. zasady dynamiki Newtona, zasady zachowania energii, podstawowe równanie $s = v_0 t + \\frac{at^2}{2}$). Masz KATEGORYCZNY ZAKAZ używania wyuczonych "wzorów na skróty" wyciągniętych znikąd. (np. bezwzględnie zabronione jest liczenie drogi w ruchu przyspieszonym ze średniej prędkości! W zadaniach z wykresem fundamentem jest liczenie pola pod wykresem). Uczeń ma nie pamiętać losowych wzorów, tylko je rozumieć. Zanim zapiszesz równanie, krótko wyjaśnij, Z CZEGO TO WYNIKA.
4. FILOZOFIA PROSTOTY I OBLICZENIA POŚREDNIE: Rozwiązuj zadania najprościej jak się da. Jeśli wyprowadzenie jednego wielkiego wzoru końcowego na literach staje się skomplikowane i niepotrzebnie trudne do policzenia, zrezygnuj z tego. Policz najpierw po drodze wartość pośrednią (np. przyspieszenie, czas), a jej wynik liczbowy wstaw do kolejnego wzoru. Merytoryka i prostota są najważniejsze.
5. ZAWSZE WYJAŚNIAJ PRZYBLIŻENIA (KRYTYCZNE): Nigdy nie przeskakuj ukrytych założeń. (np. dla małych kątów wahadła $\\sin\\alpha \\approx \\alpha \\approx \\frac{x}{l}$). Napisz po prostu, z czego to wynika.
6. OBLICZENIA LICZBOWE - MINIMUM MIEJSCA I TYLKO JEDNA LINIJKA (KRYTYCZNE): Obliczenia liczbowe mają zajmować JAK NAJMNIEJ MIEJSCA na ekranie! Masz BEZWZGLĘDNY ZAKAZ rozpisywania pośrednich kroków matematycznych (zabronione jest pokazywanie upraszczania ułamków, wymnażania pod pierwiastkiem czy skracania w osobnych linijkach). Każde podstawienie liczb (zarówno w krokach pośrednich, jak i na końcu) musi być ujęte w JEDEN, maksymalnie skompresowany blok LaTeX ($$...$$). Wymagany, żelazny schemat to:
   $$Wzór = \\text{Podstawienie wszystkich liczb naraz} = \\text{Gotowy wynik z jednostką}$$
   Złamanie tej zasady i tworzenie wielopiętrowych bloków z arytmetyką to błąd krytyczny!
7. FORMATOWANIE MATEMATYKI: Używaj WYŁĄCZNIE standardowego formatu LaTeX. Zawsze otaczaj symbole w tekście pojedynczymi dolarami ($v$). Wzory główne i przekształcenia zamykaj w podwójnych dolarach ($$...$$), używając \\\\ do nowej linii.
8. PRZESŁANE ZDJĘCIA ZADAŃ: Odczytaj treść i dane ze zdjęcia, a następnie rozwiąż. Nie wspominaj, że czytasz ze zdjęcia.
9. MATEMATYKA LICEALNA (FUNKCJA KWADRATOWA): Rozwiązania matematyczne muszą być dopasowane do ucznia liceum. W funkcji kwadratowej masz bezwzględny zakaz używania akademickiego zapisu z $\\pm$ (np. $x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$). Zawsze jawnie wylicz najpierw wartość wyróżnika ($\\Delta = b^2 - 4ac$), a następnie wypisz DWA osobne pierwiastki: $x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}$ oraz $x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}$. Odrzuć fizycznie niemożliwe wyniki (np. ujemny czas) z polskim komentarzem.
10. Złota Struktura Odpowiedzi (DLA NOWYCH ZADAŃ) - Używaj nagłówków ###:
   - 💡 Zrozumienie zjawiska: Krótki, obrazowy opis sytuacji.
   - 📝 Dane i Szukane: Wypisane z oficjalnymi symbolami.
   - ⚙️ Fundamenty Fizyczne: Jakich absolutnie podstawowych praw fizyki użyjemy i dlaczego.
   - 🧮 Rozwiązanie (Krok po kroku): Powolne wyprowadzenie z fundamentów. Możesz tu policzyć wartości pośrednie, jeśli upraszcza to zadanie (pamiętając o rygorystycznym schemacie jednej linijki i minimum miejsca z punktu 6).
   - 🔢 Wynik Końcowy: TYLKO JEDNO RÓWNANIE. Podstawiasz liczby pod wzór (lub korzystasz z wartości pośrednich) i od razu podajesz ostateczny wynik. Żadnych pośrednich bloków arytmetycznych.
   - ⚠️ Typowy błąd (Opcjonalnie): Ostrzeżenie przed częstym błędem maturzystów.`;

// 🔴 BARDZO WAŻNE DLA VERCELA 🔴
// Środowisko testowe wymusza tutaj pusty klucz. 
// Gdy kopiujesz ten kod do swojego VS Code, podmień poniższą linijkę na:
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Inicjalizacja modułu Edu-Core... Cześć! Jestem Twoim prywatnym nauczycielem fizyki. Wklej treść zadania lub zrób zdjęcie z książki, a rozwiążę je dla Ciebie krok po kroku.'
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

    const MAX_WIDTH = 1024;
    const MAX_HEIGHT = 1024;
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width; let height = img.height;
        if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } } 
        else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }

        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setSelectedImage({ base64: compressedDataUrl.split(',')[1], mimeType: 'image/jpeg', dataUrl: compressedDataUrl });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const callAI = async (userText, imageObj) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: userText, imageUrl: imageObj?.dataUrl }]);
    setInputValue('');
    setSelectedImage(null);

    const validHistory = [];
    let lastRole = null;
    
    messages.slice(1).forEach(msg => {
      const currentRole = msg.role === 'ai' ? 'model' : 'user';
      if (currentRole !== lastRole && msg.text && !msg.text.includes('⚠️')) {
        validHistory.push({ role: currentRole, parts: [{ text: msg.text }] });
        lastRole = currentRole;
      }
    });

    if (validHistory.length > 0 && validHistory[validHistory.length - 1].role === 'user') {
      validHistory.pop();
    }

    const currentParts = [{ text: userText.trim() ? userText : "Przeczytaj treść zadania ze zdjęcia i rozwiąż je." }];
    if (imageObj) currentParts.push({ inlineData: { mimeType: imageObj.mimeType, data: imageObj.base64 } });
    validHistory.push({ role: 'user', parts: currentParts });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contents: validHistory, 
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] } 
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Błąd serwera: ${response.status}`);
      }
      
      const result = await response.json();
      let aiText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (aiText) {
        setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      }
    } catch (error) {
      console.error("Szczegóły błędu:", error);
      setMessages(prev => [...prev, { role: 'ai', text: `⚠️ Błąd techniczny: ${error.message}` }]);
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if ((!inputValue.trim() && !selectedImage) || isLoading) return;
    callAI(inputValue, selectedImage);
  };

  const renderText = (text) => {
    if (!katexLoaded || !window.katex) return <div className="text-cyan-600 animate-pulse font-mono text-sm tracking-widest">Inicjalizacja modułu matematycznego...</div>;

    const cb = '```';
    // Naprawiono podwójne ukośniki psujące wyrażenia regularne (Oxc Parser Error)
    let clean = text.replace(/<frac>([^|}]*)[|}]?([^<]*)(<\/frac>|\})/g, '\\frac{$1}{$2}')
                    .replace(/<sqrt>/g, '\\sqrt{').replace(/<\/sqrt>/g, '}');
                 
    const parts = clean.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

    return parts.map((part, i) => {
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

      if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);
        try {
          const html = window.katex.renderToString(math, { displayMode: false, throwOnError: false });
          return <span key={i} dangerouslySetInnerHTML={{ __html: html }} className="mx-1 text-cyan-200 drop-shadow-[0_0_3px_rgba(34,211,238,0.4)] inline-block align-middle font-serif" />;
        } catch (e) { return <span key={i} className="text-red-500 text-xs">{part}</span>; }
      }

      let textHtml = part.replace(new RegExp(cb + '[a-zA-Z]*\\n?', 'g'), '').replace(new RegExp(cb, 'g'), '');
      textHtml = textHtml
        .replace(/</g, '&lt;').replace(/>/g, '&gt;') 
        .replace(/\*\*([^*]+)\*\*/g, '<span class="text-cyan-400 font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">$1</span>')
        .replace(/### (.*)/g, '<span class="block text-base font-bold text-purple-400 mt-4 mb-2 border-b border-purple-500/20 pb-1 uppercase tracking-wider flex items-center gap-2"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>$1</span>')
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
        
        <div className="w-16 md:w-20 bg-slate-900/80 border-r border-cyan-500/20 flex flex-col items-center py-6 z-20 shrink-0 backdrop-blur-xl hidden md:flex">
          <div className="flex h-10 w-10 bg-[#020617] border border-cyan-400 items-center justify-center rounded-xl mb-8 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          
          <button 
            onClick={() => setActiveTab('chat')}
            className={`p-2.5 rounded-xl mb-4 transition-all group shadow-[0_0_10px_rgba(34,211,238,0.1)] ${activeTab === 'chat' ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-400/50' : 'bg-[#020617]/50 text-cyan-700 border border-transparent hover:border-cyan-800 hover:text-cyan-500'}`}
            title="Tłumacz AI"
          >
            <MessageSquare className="w-5 h-5 group-hover:scale-105 transition-transform" />
          </button>

          <button 
            onClick={() => setActiveTab('calculator')}
            className={`p-2.5 rounded-xl transition-all group shadow-[0_0_10px_rgba(34,211,238,0.1)] ${activeTab === 'calculator' ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-400/50' : 'bg-[#020617]/50 text-cyan-700 border border-transparent hover:border-cyan-800 hover:text-cyan-500'}`}
            title="Narzędzia i Kalkulatory"
          >
            <Calculator className="w-5 h-5 group-hover:scale-105 transition-transform" />
          </button>
        </div>

        <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#020617]">
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d408_1px,transparent_1px),linear-gradient(to_bottom,#06b6d408_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 pointer-events-none z-0"></div>

          <header className="p-4 md:px-8 border-b border-cyan-500/10 bg-slate-900/20 backdrop-blur-sm z-10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="md:hidden flex h-8 w-8 bg-[#020617] border border-cyan-400 items-center justify-center rounded-xl shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-cyan-50 tracking-widest uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">
                  PhysiTutor <span className="text-purple-400 text-[10px] align-top font-mono ml-1">v1.3-FIX</span>
                </h1>
                <p className="text-[8px] md:text-[10px] text-cyan-500/50 font-mono tracking-widest uppercase">CKE Optimized • Auto-Compress</p>
              </div>
            </div>
            <div className="flex gap-2 font-mono text-[10px] text-cyan-600/70">
              <span className="hidden sm:inline border border-cyan-900/50 px-2 py-0.5 rounded">SYS: OK</span>
            </div>
          </header>

          {activeTab === 'chat' ? (
            <div className="flex-1 flex flex-col relative min-h-0">
              <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth custom-scrollbar z-10">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`w-full ${msg.role === 'ai' ? 'py-6 md:py-8 bg-slate-900/40 border-y border-cyan-500/10 mb-6' : 'mb-6 px-4 md:px-8'}`}>
                    <div className={`max-w-4xl mx-auto flex ${msg.role === 'user' ? 'justify-end' : 'gap-4 md:gap-6'}`}>
                      
                      {msg.role === 'ai' && (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#020617] border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                          <Sparkles className="w-5 h-5" />
                        </div>
                      )}

                      <div className={`${msg.role === 'user' ? 'max-w-2xl bg-cyan-900/40 border border-cyan-500/30 rounded-3xl rounded-tr-sm p-5 shadow-sm' : 'flex-1 overflow-hidden pt-1 md:pt-2'}`}>
                        {msg.imageUrl && (
                          <img src={msg.imageUrl} alt="Skan" className="max-w-sm w-full rounded-xl border border-cyan-500/30 mb-4 shadow-[0_0_20px_rgba(34,211,238,0.15)] mix-blend-screen" />
                        )}
                        
                        {msg.role === 'user' ? (
                          <div className="text-base md:text-lg text-cyan-50 leading-relaxed drop-shadow-sm">
                            {msg.text}
                          </div>
                        ) : (
                          <div className="text-sm md:text-base leading-relaxed text-cyan-50">
                            {renderText(msg.text)}
                          </div>
                        )}
                      </div>
                      
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="w-full py-6 md:py-8 bg-slate-900/40 border-y border-cyan-500/10 animate-in fade-in duration-500 mb-6">
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

                  <form onSubmit={handleSendMessage} className="relative flex items-center gap-2 bg-[#050B14]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-1.5 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2.5 text-cyan-600 hover:text-cyan-400 hover:bg-cyan-900/20 rounded-lg transition-all"
                      title="Załącz zdjęcie"
                    >
                      <Camera className="w-5 h-5" />
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
                      placeholder="Wklej treść zadania lub zrób zdjęcie..."
                      className="w-full bg-transparent px-3 py-2 text-cyan-50 resize-none h-[44px] focus:outline-none font-sans text-sm placeholder-cyan-900/60 custom-scrollbar"
                    />
                    
                    <button
                      type="submit"
                      disabled={isLoading || (!inputValue.trim() && !selectedImage)}
                      className="bg-cyan-600 hover:bg-cyan-500 text-[#020617] p-2.5 rounded-lg transition-all disabled:opacity-30 disabled:bg-cyan-900 shadow-[0_0_8px_rgba(34,211,238,0.2)]"
                    >
                      <Send className="w-5 h-5 ml-0.5" />
                    </button>
                  </form>
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