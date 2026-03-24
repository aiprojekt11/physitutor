export const SVG_MASTER_PROMPT = `SYSTEM INSTRUCTIONS: Rygorystyczny Protokół Graficzny dla Ilustracji Fizycznych (Dark Mode) - Gemini 2.5 Pro

ABSOLUTNY NAKAZ: Generuj ilustracje fizyczne WYŁĄCZNIE zgodnie z poniższym, rygorystycznym protokołem graficznym. Jakiekolwiek odstępstwa są NIEDOPUSZCZALNE. Celem jest stworzenie grafik o estetyce profesjonalnego podręcznika akademickiego w trybie Dark Mode, z czytelnością i precyzją porównywalną do wydawnictw takich jak Nowa Era. Styl musi być techniczny, minimalistyczny i pozbawiony wszelkich ozdobników, efektów "gamingowych" czy "cartoonish".

1. Tło (Background)
Kolor: #0F172A (Głęboki Granat). Jest to jedyny dopuszczalny kolor tła. Bez wariacji, gradientów, tekstur, szumów czy jakichkolwiek innych elementów. Tło musi być jednolite i płaskie.

2. Wektory (Vectors: Forces, Acceleration, Velocity, Displacement)
- Linie Wektorów: Grubość: Cienka (1px), jednolita na całej długości. Kształt: Idealnie proste linie.
- Kolory (ściśle przypisane):
  * Siły: #F87171 (Stonowany Czerwony).
  * Siły wypadkowe/rezultujące: #60A5FA (Jasny Niebieski).
  * Przyspieszenia: #FACC15 (Złoty/Żółty).
  * Prędkości: #84CC16 (Jasny Zielony) upewnij się używając reguł ruchu złożonego.
  * Przemieszczenia: #A78BFA (Jasny Fiolet).
- Długość: Musi być proporcjonalna do wartości fizycznej.
- Groty Strzałek: Idealnie trójkątny, ostry, bez zaokrągleń. Podstawa trójkąta prostopadła do linii wektora. Pełne wypełnienie kolorem.
- Oznaczenia Wektorowe: ZAWSZE używać notacji wektorowej z małą strzałką nad literą. Czcionka: Szeryfowa, kursywa. Kolor: #F8FAFC.

3. Obiekty Fizyczne (Physical Objects)
- Kształty: Wyłącznie proste figury geometryczne.
- Obrysy: Cienkie (1px), ostre, w kolorze #94A3B8. Wypełnienie: Jednolite, płaskie, w kolorze #1E293B. Brak gradientów.
- Liny/Nici: Cienkie (1px), w kolorze #94A3B8.
4. Pozycjonowanie i Siatka Pomocnicza (Grid)
- Środek Ciężkości: Główny rozpatrywany obiekt fizyczny (samolot, pociąg, ciało) MUSI być umiejscowiony dokładnie w geometrycznym środku wszystkich działających na niego wektorów (często w punkcie (0,0) widocznego układu współrzędnych). Nigdy nie rysuj obiektu w oderwaniu od wychodzących wektorów.
- Kolor siatki: #1E293B. Linie: Bardzo cienkie (0.5px), subtelne, kwadratowa siatka.

5. Ogólna Estetyka i Zakazy
- Profesjonalizm: Ilustracja musi wyglądać jak z oprogramowania CAD lub LaTeX. Brak ozdobników.
- Brak stylów rysunkowych ("cartoonish").


TWOJE ZADANIE: ILUSTRACJA KINEMATYCZNA (Ruch złożony, pociągi, wózki, rzuty)
Stwórz profesjonalną ilustrację fizyczną przedstawiającą bieżące zadanie z kinematyki, ściśle przestrzegając powyższych SYSTEM INSTRUCTIONS. Ilustracja musi w sposób klarowny i techniczny wizualizować wektory i obiekty występujące w treści (np. dwa pociągi). UWAGA: Bądź elastyczny. Jeśli to prosty ruch pociągów, narysuj prostokąty z wektorami bez reguły równoległoboku. MUSISZ wygenerować kod SVG dla każdego zadania obliczeniowego!

Kluczowe wymagania dla ilustracji ruchu (jeśli dotyczy wektorów na płaszczyźnie):
1. Wektory Prędkości: Reprezentuj wszystkie istotne prędkości. W przypadku ruchu prostoliniowego złożonego (np. pociągi), narysuj je wzdłuż jednej osi, zachowując proporcje:
 - Prędkość względem własnego układu odniesienia: Oznacz jako \\vec{v}_{1} (lub \\vec{v}_{wzgl}) w kolorze #84CC16 (Jasny Zielony).
 - Prędkość drugiego obiektu (lub unoszenia): Oznacz jako \\vec{v}_{2} (lub \\vec{v}_{unos}) w kolorze #A78BFA (Jasny Fiolet).
 - Prędkość względna wypadkowa: Oznacz jako \\vec{v}_{wyp} w kolorze #60A5FA (Jasny Niebieski).

2. Metoda Składania Wektorów: W 2D zawsze stosuj regułę równoległoboku lub trójkąta (wspólny początek). W 1D pociągi na równoległych torach narysuj jako bloki jadące po osi i narysuj odpowiednio zorientowane wektory prędkości względem podłoża lub siebie wyrysowując je z ich środków.
3. Środowisko/Kontekst: Przedstaw realistyczne, ale minimalistyczne środowisko dopasowane do zadania. Np. łódka na rzece (cienkie linie brzegów #94A3B8, łódka jako prostokąt #1E293B) lub dwa pociągi na równoległych torach (tory jako linie przerywane #94A3B8, pociągi jako prostokąty o zróżnicowanej długości).
4. Kąty i Odległości: Jeśli istotne, oznacz kąty między wektorami. Pociągi narysuj proporcjonalne do podanych długości.
5. Dodatkowe Linie Pomocnicze: W przypadku reguły równoległoboku, narysuj przerywane linie pomocnicze (#94A3B8, 0.5px) dopełniające równoległobok.

Przykład użycia (do wklejenia po SYSTEM INSTRUCTIONS):
"Stwórz ilustrację przedstawiającą łódkę płynącą prostopadle do nurtu rzeki. Prędkość łódki względem wody wynosi \\vec{v}_{wzgl}. Prędkość nurtu rzeki wynosi \\vec{v}_{unos}. Pokaż wektor prędkości wypadkowej \\vec{v}_{wyp} łódki względem brzegu. Zastosuj regułę równoległoboku. Rzeka powinna być przedstawiona jako dwie równoległe linie, a łódka jako prosty prostokąt. Wszystkie wektory prędkości powinny być oznaczone zgodnie z protokołem. Dodaj delikatną siatkę pomocniczą."

ODPOWIEDŹ Z WYGENEROWANYM SCHEMATEM:
\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
  <defs>
    <marker id="arrow-wyp" markerUnits="userSpaceOnUse" viewBox="0 0 12 8" refX="12" refY="4" markerWidth="12" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 12 4 L 0 8 z" fill="#60A5FA"/></marker>
    <marker id="arrow-wzgl" markerUnits="userSpaceOnUse" viewBox="0 0 12 8" refX="12" refY="4" markerWidth="12" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 12 4 L 0 8 z" fill="#84CC16"/></marker>
    <marker id="arrow-unos" markerUnits="userSpaceOnUse" viewBox="0 0 12 8" refX="12" refY="4" markerWidth="12" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 12 4 L 0 8 z" fill="#A78BFA"/></marker>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" stroke-width="0.5"/></pattern>
  </defs>

  <rect width="100%" height="100%" fill="#0F172A"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Brzegi rzeki -->
  <line x1="20" y1="80" x2="580" y2="80" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="10 5"/>
  <line x1="20" y1="390" x2="580" y2="390" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="10 5"/>
  <text x="30" y="70" font-family="Times New Roman, serif" font-size="14" fill="#94A3B8" font-style="italic">Brzeg docelowy</text>
  <text x="30" y="415" font-family="Times New Roman, serif" font-size="14" fill="#94A3B8" font-style="italic">Brzeg startowy</text>

  <!-- Łódka płynąca prostopadle (prosty prostokąt na brzegu startowym) -->
  <rect x="180" y="310" width="40" height="80" fill="#1E293B" stroke="#94A3B8" stroke-width="1"/>

  <!-- Równoległobok prędkości (przerywane linie) -->
  <line x1="360" y1="350" x2="360" y2="230" stroke="#94A3B8" stroke-width="0.5" stroke-dasharray="5 5"/>
  <line x1="200" y1="230" x2="360" y2="230" stroke="#94A3B8" stroke-width="0.5" stroke-dasharray="5 5"/>

  <!-- Trajektoria rzeczywista (przedłużenie v_wyp) -->
  <line x1="360" y1="230" x2="560" y2="80" stroke="#60A5FA" stroke-width="0.5" stroke-dasharray="8 4"/>

  <!-- Wektory prędkości (Wspólny początek w środku łódki: 200, 350) -->
  <line x1="200" y1="350" x2="200" y2="230" stroke="#84CC16" stroke-width="1" marker-end="url(#arrow-wzgl)"/>
  <line x1="200" y1="350" x2="360" y2="350" stroke="#A78BFA" stroke-width="1" marker-end="url(#arrow-unos)"/>
  <line x1="200" y1="350" x2="360" y2="230" stroke="#60A5FA" stroke-width="1.5" marker-end="url(#arrow-wyp)"/>

  <!-- Podpisy Wektorów zgodne z notacją strzałkową -->
  <g font-family="Times New Roman, serif" font-size="16" fill="#F8FAFC">
    <text x="270" y="342" font-style="italic">v<tspan dy="3" font-size="12" font-style="normal">unos</tspan></text><path d="M 270 328 L 276 328" stroke="#F8FAFC" stroke-width="1"/><polygon points="276,326 279,328 276,330" fill="#F8FAFC"/>
    <text x="160" y="290" font-style="italic">v<tspan dy="3" font-size="12" font-style="normal">wzgl</tspan></text><path d="M 160 276 L 166 276" stroke="#F8FAFC" stroke-width="1"/><polygon points="166,274 169,276 166,278" fill="#F8FAFC"/>
    <text x="315" y="270" font-style="italic">v<tspan dy="3" font-size="12" font-style="normal">wyp</tspan></text><path d="M 315 256 L 321 256" stroke="#F8FAFC" stroke-width="1"/><polygon points="321,254 324,256 321,258" fill="#F8FAFC"/>
  </g>
</svg>
\`\`\`
`;
