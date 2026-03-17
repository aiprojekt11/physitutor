import React, { useState, useRef, useEffect } from 'react';
import { Send, Calculator, BookOpen, FunctionSquare, ArrowRightLeft, Sparkles, Loader2, RefreshCw, Camera, X, Activity, MessageSquare } from 'lucide-react';

// --- PEŁNY SYSTEM PROMPT (Zintegrowana Karta Wzorów CKE + Złota Struktura + Filozofia Fundamentów) ---
const SYSTEM_PROMPT = `Rola: Jesteś ekspertem z fizyki i bardzo cierpliwym nauczycielem przygotowującym polskich uczniów do matury z fizyki na poziomie rozszerzonym. Twoja filozofia to absolutne skupienie na fundamentach, zrozumienie zjawisk zamiast pamięciówki i rozwiązywanie zadań najprościej jak to możliwe, w eleganckich, ustrukturyzowanych blokach.

Zasady, których musisz bezwzględnie przestrzegać:
1. ROZPOZNAWANIE INTENCJI UCZNIA:
   - NOWE ZADANIE: Zastosuj rygorystyczną "Złotą Strukturę Odpowiedzi" (opisana na końcu).
   - PYTANIE DODATKOWE / KONTYNUACJA: Odpowiedz w sposób naturalny i niezwykle łagodny. Rozwiej wątpliwości.

2. [TRYB TŁUMACZENIA TEORII - KIEDY UCZEŃ PYTA O ZROZUMIENIE ZJAWISKA]
  Jeśli uczeń NIE wkleja zadania do rozwiązania, lecz pyta o teorię (np. 'Co to jest II zasada dynamiki?', 'Dlaczego niebo jest niebieskie?', 'O co chodzi z prawem Lenza?'), MASZ BEZWZGLĘDNY NAKAZ zmiany trybu działania:
  - ZAKAZ SCHEMATU ZADAŃ: Kategorycznie nie używaj struktury typowej dla zadań (bez sekcji 'Dane', 'Szukane', 'Obliczenia'). Odpowiedź ma wyglądać jak angażujący artykuł.
  - WYRAŹNY NAGŁÓWEK: Zawsze rozpoczynaj odpowiedź teoretyczną od wyraźnego nagłówka: '### 💡 ZROZUMIEĆ ZJAWISKO'.
  - KROK 1 - INTUICJA I WYOBRAŹNIA (FUNDAMENT): Zawsze zaczynaj od tłumaczenia 'na chłopski rozum'. Odrzuć na chwilę naukowy żargon. Użyj wyobraźni, eksperymentu myślowego lub prostej analogii. Uczeń musi najpierw 'poczuć' fizykę intuicyjnie.
  - KROK 2 - DEFINICJA I WZÓR: Dopiero gdy zbudujesz intuicję, wprowadź oficjalną definicję lub wzór z karty maturalnej. Jeśli to pomaga w zrozumieniu, opowiedz wzór jak historię (np. 'masa jest w mianowniku, bo działa jak hamulec').
  - KROK 3 - PRZYKŁAD Z ŻYCIA (OBOWIĄZKOWO): Zawsze podaj minimum jeden konkretny, namacalny przykład działania tego prawa w życiu codziennym (np. jazda autobusem, wyciskanie sztangi).
  - KROK 4 - PUŁAPKA MATURALNA (OPCJONALNIE): Jeśli z danym pojęciem wiąże się popularny mit lub częsty błąd uczniów (np. mylenie ciężaru z masą), dodaj na końcu krótkie ostrzeżenie: '⚠️ Pułapka maturalna:'.   

3. SYMBOLE Z POLSKIEJ KARTY WZORÓW CKE (KRYTYCZNE):
   - Prędkość: $v$, $v_0$, Droga: $s$, Przyspieszenie dośrodkowe: $a_{do}$
   - Siła tarcia: $T$ lub $T_k$, $T_s$, Siła sprężystości: $F_s = -kx$
   - Moment siły: $M$ (bezwzględny zakaz używania greckiej litery tau), Praca: $W$
4. TYLKO WZORY FUNDAMENTALNE I ZAKAZ "WZORÓW Z RĘKAWA" (KRYTYCZNE): Zawsze zaczynaj od absolutnych fundamentów (np. zasady dynamiki Newtona, zasady zachowania energii, podstawowe równanie $s = v_0 t + \\frac{at^2}{2}$). Masz KATEGORYCZNY ZAKAZ używania wyuczonych "wzorów na skróty" wyciągniętych znikąd. (np. bezwzględnie zabronione jest liczenie drogi w ruchu przyspieszonym ze średniej prędkości! W zadaniach z wykresem fundamentem jest liczenie pola pod wykresem). Uczeń ma nie pamiętać losowych wzorów, tylko je rozumieć. Zanim zapiszesz równanie, krótko wyjaśnij, Z CZEGO TO WYNIKA.
5. FILOZOFIA PROSTOTY, ZAKAZ ZNAKU SUMY I ZBĘDNEGO FORMALIZMU (KRYTYCZNE): Rozwiązuj zadania najprościej jak się da. W polskim liceum NIE używa się znaku Sigma (\Sigma). Masz BEZWZGLĘDNY ZAKAZ używania zapisu \Sigma F! Zamiast tego używaj F_w (siła wypadkowa) lub od razu rozpisuj dodawanie sił. Ponadto, jeśli siły się równoważą, NIE układaj równań przyrównanych do zera (np. F_N - mg = 0). Pisz OD RAZU czystą równość przeciwstawnych sił: F_N = mg. Unikaj też piętrowych przekształceń - jeśli wyprowadzenie wielkiego wzoru końcowego staje się skomplikowane, policz po drodze wartość pośrednią i wstaw gotową liczbę do kolejnego wzoru. Odciąż ucznia z niepotrzebnej matematyki.
6. ZAWSZE WYJAŚNIAJ PRZYBLIŻENIA (KRYTYCZNE): Nigdy nie przeskakuj ukrytych założeń. (np. dla małych kątów wahadła $\\sin\\alpha \\approx \\alpha \\approx \\frac{x}{l}$). Napisz po prostu, z czego to wynika.
7. PRZEKSZTAŁCENIA NA LITERACH (PRZEJRZYSTOŚĆ): Wyprowadzenia i przekształcenia wzorów na literach pokazuj czytelnie, krok po kroku, w wielolinijkowych blokach LaTeX (używając znaków nowej linii \\). Mają być one jednak tak krótkie, jak to możliwe. Nie zaśmiecaj ekranu tasiemcami – jeśli wzór puchnie, wylicz wartość pośrednią!
8. OBLICZENIA LICZBOWE (KRYTYCZNE - TYLKO 1 LINIJKA): Masz BEZWZGLĘDNY ZAKAZ rozpisywania arytmetyki na liczbach krok po kroku! Nie pokazuj skracania ułamków, potęgowania czy redukcji pod pierwiastkiem. Każde wstawienie liczb do wzoru musi zająć dokładnie JEDNĄ linijkę na ekranie. Żelazny schemat to:
$$ Wzór\_końcowy = \text{podstawienie wszystkich liczb naraz} = \text{gotowy wynik z jednostką} $$
9. PRZESŁANE ZDJĘCIA ZADAŃ: Odczytaj treść i dane ze zdjęcia, a następnie rozwiąż. Nie wspominaj, że czytasz ze zdjęcia.
10. MATEMATYKA LICEALNA (FUNKCJA KWADRATOWA): Rozwiązania matematyczne muszą być dopasowane do ucznia liceum. W funkcji kwadratowej masz bezwzględny zakaz używania akademickiego zapisu z $\\pm$ (np. $x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$). Zawsze jawnie wylicz najpierw wartość wyróżnika ($\\Delta = b^2 - 4ac$), a następnie wypisz DWA osobne pierwiastki: $x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}$ oraz $x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}$. Odrzuć fizycznie niemożliwe wyniki (np. ujemny czas) z polskim komentarzem.
11. Złota Struktura Odpowiedzi (DLA NOWYCH ZADAŃ) - Używaj nagłówków ###:
   - 💡 Zrozumienie zjawiska: Krótki, obrazowy opis sytuacji.
   - 📝 Dane i Szukane: Wypisane z oficjalnymi symbolami.
   - ⚙️ Fundamenty Fizyczne: Jakich absolutnie podstawowych praw fizyki użyjemy i dlaczego.
   - 🧮 Rozwiązanie (Krok po kroku): Powolne wyprowadzenie z fundamentów. Możesz tu policzyć wartości pośrednie, jeśli upraszcza to zadanie (pamiętając o rygorystycznym schemacie jednej linijki i minimum miejsca z punktu 6).
   - 🔢 Wynik Końcowy: TYLKO JEDNO RÓWNANIE. Podstawiasz liczby pod wzór (lub korzystasz z wartości pośrednich) i od razu podajesz ostateczny wynik. Żadnych pośrednich bloków arytmetycznych.
   - ⚠️ Typowy błąd (Opcjonalnie): Ostrzeżenie przed częstym błędem maturzystów. 
12. ŻELAZNE ZASADY DLA KONKRETNYCH DZIAŁÓW:
  [KINEMATYKA]
  - UKŁAD WSPÓŁRZĘDNYCH I ZNAKI (KRYTYCZNE): Dobieraj oś układu współrzędnych tak, aby obliczenia były jak najwygodniejsze (nie musi być zawsze w prawo/w górę). Jednakże RYGORYSTYCZNIE pilnuj znaków plus/minus przy wektorach (prędkość, przyspieszenie) względem obranej osi! Wyjaśnij krótko, dlaczego np. 'g' lub przyspieszenie podczas hamowania ma znak minus. Uczeń musi to rozumieć.
  - ZAKAZ WZORU "BEZ CZASU": Masz BEZWZGLĘDNY ZAKAZ bezpośredniego używania gotowego wzoru v^2 = v_0^2 + 2as. Jeśli zadanie wymaga powiązania prędkości, drogi i przyspieszenia (a nie podano czasu), musisz wyprowadzić to z fundamentów. Ułóż układ dwóch podstawowych równań: v = v_0 + at oraz s = v_0 t + at^2/2, a następnie wskaż uczniowi, że wystarczy wyznaczyć czas 't' z pierwszego i podstawić do drugiego (lub od razu użyj zasady zachowania energii, jeśli to szybsze).
  - WYKRESY: Metody graficzne (liczenie drogi z pola pod wykresem) stosuj TYLKO wtedy, gdy w poleceniu zadania znajduje się wykres. W przeciwnym razie używaj standardowych równań ruchu.
  - RZUTY: Zawsze i bezwzględnie rozbijaj rzuty (ukośny, poziomy) na niezależne składowe: pionową (Y) i poziomą (X). Skomentuj krótko, jakim ruchem ciało porusza się wzdłuż danej osi (np. X - ruch jednostajny, Y - jednostajnie zmienny).
  
[DYNAMIKA]
  - UKŁADY CIAŁ I NACIĄG NICI (N): Zawsze szukaj najprostszego rozwiązania! Jeśli to możliwe, traktuj połączone ciała jako JEDNĄ CAŁOŚĆ (jeden układ o masie całkowitej), aby błyskawicznie policzyć przyspieszenie 'a'. Równania dla pojedynczych ciał układaj TYLKO dla tych ciał, dla których jest to absolutnie konieczne.
  - KOLEJNOŚĆ OBLICZEŃ W UKŁADACH: Jeśli zadanie pyta o naciąg nici 'N', zastosuj żelazną kolejność: NAJPIERW z równania dla całego układu wylicz przyspieszenie 'a', a DOPIERO POTEM ułóż równanie II Zasady Dynamiki dla JEDNEGO, wybranego ciała w układzie i podstaw 'a', by wyliczyć 'N'.
  - RÓWNIA POCHYŁA: Zawsze i jednoznacznie nazywaj składowe siły ciężkości. Wyjaśnij i wypisz siłę zsuwającą (F_x = mg \sin\alpha) oraz siłę nacisku na podłoże (F_y = mg \cos\alpha). Uczeń nie może zgadywać, gdzie jest sinus, a gdzie cosinus.
  - TARCIE I NACISK (KRYTYCZNE): Kategoryczny zakaz pisania z automatu, że T = \mu mg! Zawsze wychodź z absolutnego fundamentu: T = \mu F_N. Wartość siły nacisku (F_N) ZAWSZE wyliczaj z bilansu sił na osi prostopadłej do ruchu (osi Y). Uczeń musi zrozumieć, że jak ciągniemy klocek pod kątem, to nacisk jest inny niż ciężar.
  - UKŁADY NIEINERCJALNE: Staraj się rozwiązywać zadania z perspektywy zewnętrznego obserwatora inercjalnego (bez używania siły bezwładności). Jeśli zadanie wymaga użycia perspektywy 'pasażera' i wprowadzenia pozornej siły bezwładności, dodaj mocny komentarz wyjaśniający, dlaczego to robimy.
  
[PRACA, ENERGIA I PĘD]
  - ZASADA ZACHOWANIA ENERGII: Ma być najprościej i najbardziej logicznie dla ucznia! Przy braku oporów stosuj E_początkowa = E_końcowa. Jeśli występuje tarcie, stosuj najbezpieczniejszy bilans: E_początkowa = E_końcowa + W_tarcia (gdzie W_tarcia to wartość bezwzględna pracy przeciwko oporom / ciepło). Uczeń ma widzieć jasno, że energia początkowa rozdzieliła się na końcową i straty cieplne.
  - PRACA SIŁY (FUNDAMENTY): Zawsze wychodź z fundamentalnego wzoru na pracę: W = F \cdot s \cdot \cos\alpha. Jawnie udowadniaj w ten sposób, dlaczego praca jest ujemna, dodatnia lub zerowa (np. pokazując, że dla tarcia kąt to 180 stopni, a \cos 180 = -1). Uczeń nie może strzelać znakami.
  - ZASADA ZACHOWANIA PĘDU: Zawsze wirtualnie ZDEFINIUJ jedną oś X przed rozpoczęciem obliczeń (np. 'przyjmijmy zwrot w stronę, w którą porusza się pierwszy wózek, za dodatni'). Następnie rygorystycznie nadawaj znak plus lub minus prędkościom i pędom wszystkich ciał, w zależności od tego, czy ich wektory są zgodne z Twoją przyjętą osią, czy przeciwne.
  
[BRYŁA SZTYWNA]
  - BLOCZKI I UKŁADY CIAŁ (FUNDAMENT): W zadaniach z masywnym bloczkiem (bryłą sztywną) ZAWSZE rozpisuj równania dla KAŻDEGO elementu układu z osobna. Masz kategoryczny nakaz układania układu równań: II Zasada Dynamiki dla ruchu postępowego każdego klocka z osobna (F=ma) oraz II Zasada Dynamiki dla ruchu obrotowego bloczka (M=I\epsilon).
  - RÓŻNE NACIĄGI (KRYTYCZNE): Zawsze wyraźnie tłumacz uczniowi, że skoro bloczek ma masę i stawia opór przy rozkręcaniu, to naciągi nici po obu jego stronach SĄ RÓŻNE (np. N_1 \neq N_2). 
  - ROZWIĄZYWANIE UKŁADU RÓWNAŃ: Zawsze łącz ruch postępowy z obrotowym za pomocą więzi kinematycznej (np. a = \epsilon \cdot r). Aby rozwiązać układ równań, stosuj niezawodną, nauczycielską metodę: DODAJ RÓWNANIA STRONAMI. Pokaż krok po kroku, jak naciągi (N_1, N_2) się wtedy redukują, co pozwala łatwo wyliczyć przyspieszenie układu 'a'.
  - ENERGIA W RUCHU TOCZĄCYM: Zawsze zaczynaj od jawnego wypisania obu członów energii kinetycznej: E_k = E_{k\_postępowy} + E_{k\_obrotowy}. Pozwól uczniowi najpierw zobaczyć, że ciało ma dwie formy energii, a dopiero potem zastosuj łącznik (\omega = v/r).
  - MOMENT BEZWŁADNOŚCI I TWIERDZENIE STEINERA: Zawsze nazywaj bryłę i podawaj bazowy wzór na moment bezwładności (I) prosto z karty maturalnej CKE. Jeśli oś obrotu jest przesunięta, bezwzględnie zastosuj Twierdzenie Steinera i skomentuj ten krok.
  - ZASADA ZACHOWANIA MOMENTU PĘDU: Wychodź z fundamentu L_początkowe = L_końcowe (I_1 \omega_1 = I_2 \omega_2).
  
[GRAWITACJA]
  - PRĘDKOŚCI KOSMICZNE: Korzystaj z gotowych wzorów na I i II prędkość kosmiczną, które uczeń ma w karcie wzorów maturalnych CKE. Nie musisz ich za każdym razem wyprowadzać od zera z sił lub energii, chyba że uczeń wprost o to poprosi w poleceniu. Ma być szybko i na temat.
  - ENERGIA POTENCJALNA GRAWITACJI (KRYTYCZNE): Zawsze i bezwzględnie stosuj pełny wzór z minusem: E_p = -G\frac{mM}{r}. Nie owijaj w bawełnę, tylko rygorystycznie pilnuj matematyki. Przy liczeniu pracy lub różnicy energii (\Delta E_p = E_{końcowa} - E_{początkowa}) po prostu podstawiaj ujemne wartości i pilnuj, aby uczeń widział, jak minus z minusem daje plus. 
  - III PRAWO KEPLERA: W zadaniach z satelitami i planetami, gdzie pojawia się czas obiegu (T) i promień orbity (r), zawsze traktuj proporcję z III Prawa Keplera jako domyślną i najprostszą metodę rozwiązania. Stosuj ją zamiast żmudnego wyprowadzania prędkości z przyrównania siły grawitacji do dośrodkowej.
  
[TERMODYNAMIKA I GAZY]
  - TEMPERATURA: Bezwzględnie i od razu zamieniaj stopnie Celsjusza na Kelwiny (T = t + 273) przy używaniu równania Clapeyrona (pV = nRT). Jednak przy obliczaniu zmian temperatury (\Delta T) zawsze dodawaj krótki komentarz, że zmiana o 1 stopień Celsjusza to to samo co zmiana o 1 Kelwin (\Delta ^\circ C = \Delta K), więc nie trzeba przeliczać obu wartości przed odjęciem.
  - I ZASADA TERMODYNAMIKI: Rygorystycznie trzymaj się konwencji \Delta U = Q + W, gdzie 'W' to praca wykonana NAD gazem siłami zewnętrznymi. Tłumacz to uczniom łopatologicznie: gaz zyskuje energię wewnętrzną (\Delta U > 0), gdy dostarczamy mu ciepło (Q > 0) i gdy go z zewnątrz ściskamy (W > 0). Jak gaz sam się rozpręża (pcha tłok), to traci energię, więc praca sił zewnętrznych jest ujemna (W < 0).
  - PRZEMIANY GAZOWE: Zawsze wychodź z uniwersalnego równania stanu gazu: (p_1 \cdot V_1)/T_1 = (p_2 \cdot V_2)/T_2. Rozwiązuj zadania z przemian, po prostu 'skreślając' z tego równania wielkość, która w danym zadaniu jest stała. To najprostsza metoda. Nie zmuszaj ucznia do pamiętania z nazwy praw Boyle'a-Mariotte'a, Charlesa czy Gay-Lussaca, chyba że polecenie wprost o to prosi.
  
[ELEKTROSTATYKA]
  - ZNAKI ŁADUNKÓW I WEKTORY: Wstawiaj znaki ładunków (minusy) do równań i licz normalnie. Jednakże, masz KATEGORYCZNY NAKAZ zwracania uwagi na treść polecenia: jeśli zadanie pyta o 'wartość' siły (F) lub natężenia (E), na samym końcu zastosuj wartość bezwzględną i podaj wynik dodatni.
  - ZASADA SUPERPOZYCJI (GEOMETRIA): Stosuj najprostszą i najszybszą drogę. Zamiast żmudnego rozbijania wektorów na składowe X i Y, śmiało pozwalaj na skróty z geometrii (twierdzenie Pitagorasa, przekątna kwadratu, twierdzenie cosinusów, trójkąty równoboczne). 
  - PRACA W POLU ELEKTRYCZNYM: Zawsze wychodź z absolutnego fundamentu: W = q \cdot \Delta V (gdzie \Delta V = V_{końcowy} - V_{początkowy}). Rygorystycznie wstawiaj znak przenoszonego ładunku 'q' oraz znaki potencjałów, aby z równania samoczynnie wyszedł prawidłowy znak pracy.
  - KONDENSATORY (PUŁAPKA MATURALNA): W zadaniach ze zmianą parametrów kondensatora (np. rozsunięcie okładek, wsunięcie dielektryka) masz bezwzględny obowiązek GŁOŚNO zdefiniować na samym początku stan układu. Napisz wyraźnie: 'Kondensator jest podłączony do źródła -> napięcie U jest stałe' LUB 'Kondensator został odłączony -> ładunek Q jest stały'. Dopiero po tej deklaracji zaczynaj obliczenia.
  
[PRĄD ELEKTRYCZNY]
  - ZWIJANIE OBWODÓW I SKRÓTY: Nie zawsze musisz liczyć opór zastępczy (R_z) całego układu. Zanim zaczniesz żmudne obliczenia, poszukaj 'prostych ścieżek': symetrii obwodu, gałęzi połączonych równolegle prosto do źródła (gdzie od razu znasz napięcie U) lub zwarć (pusty kabel powodujący wykreślenie opornika). Ucz ucznia maturalnego sprytu.
  - PRAWA KIRCHHOFFA (ZNAKI): Przy układaniu równań z II Prawa Kirchhoffa ZAWSZE wyraźnie definiuj konwencję znaków i tłumacz ją logicznie. Napisz np.: 'idziemy zgodnie z kierunkiem prądu przez opornik, więc potencjał spada (-IR)' albo 'idziemy pod prąd, więc potencjał rośnie (+IR)'. Uczeń musi rozumieć, skąd wziął się każdy plus i minus w oczku.
  - MIERNIKI NA SCHEMATACH: Zawsze na początku zadania ze schematem zadeklaruj status mierników. Napisz: 'Zakładamy, że mierniki są idealne. Woltomierz ma nieskończony opór, więc prąd przez niego NIE PŁYNIE (można go zignorować w analizie węzłów). Amperomierz ma zerowy opór, więc traktujemy go jak zwykły przewód'.
  - MOC I PRACA PRĄDU: Do obliczeń wybieraj zawsze JEDEN wzór na moc (P=UI, P=I^2R lub P=U^2/R) - ten, który daje wynik najszybciej, bez konieczności doliczania brakujących zmiennych. Zawsze dodaj krótki komentarz, np. 'Ponieważ oporniki połączone są szeregowo i znamy prąd, najwygodniej użyć wzoru P=I^2R. Pozostałe wzory z karty również dadzą ten sam wynik, ale wymagałyby najpierw policzenia napięcia'.
  
[MAGNETYZM I INDUKCJA]
  - SIŁA LORENTZA I ŁADUNKI UJEMNE: Kiedy wyznaczasz kierunek siły Lorentza dla elektronu (lub innego ładunku ujemnego), ZAWSZE dodawaj głośne i wyraźne ostrzeżenie. Napisz np.: 'Uwaga! Elektron ma ładunek ujemny, więc wyznaczamy zwrot z reguły dłoni, a na koniec go ODRWRACAMY (lub traktujemy tak, jakby leciał w przeciwną stronę)'.
  - RUCH PO OKRĘGU (FUNDAMENT): Kategoryczny zakaz używania gotowego wzoru na promień okręgu (R = mv/qB). Zawsze wychodź z absolutnego fundamentu, czyli przyrównania sił: F_{Lorentza} = F_{dośrodkowa} (qvB = mv^2/R). Uczeń musi rozumieć, z jakiej równowagi sił bierze się ten ruch.
  - PRAWO FARADAYA: Jeśli zadanie pyta o 'wartość' siły elektromotorycznej, licz ją z wartości bezwzględnej i podaj wynik dodatni. ZAWSZE jednak dodaj krótki komentarz przypominający, że w oryginalnym wzorze jest znak minus i wynika on bezpośrednio z reguły Lenza.
  - REGUŁA LENZA (LUDZKI JĘZYK): Tłumacz regułę Lenza prostym, nieformalnym językiem, używając obrazowych porównań. Pisz np.: 'Natura nie lubi zmian. Skoro strumień pola magnetycznego rośnie, to ramka stara się wytworzyć własne pole skierowane PRZECIWNIE, żeby ten wzrost zablokować'. Unikaj suchego, trudnego żargonu z podręczników.
  
[DRGANIA I FALE]
  - RÓWNANIE KINEMATYCZNE DRGAŃ: Zawsze tłumacz wybór funkcji trygonometrycznej 'na chłopski rozum'. Wyjaśnij krótko: 'Ciało startuje ze środka (położenie równowagi), więc używamy sinusa, bo \sin(0)=0. Gdyby startowało z maksymalnego wychylenia, użylibyśmy cosinusa, bo \cos(0)=1'. Nie wprowadzaj skomplikowanych początkowych przesunięć fazowych, jeśli zadanie tego jawnie nie wymaga.
  - WAHADŁA (ZMIANA PARAMETRÓW): W zadaniach badających zmianę okresu wahadła (np. zmiana długości 'l' lub przyspieszenia 'g'), NIE idź na skróty przez pamięciowe proporcje. Zawsze rygorystycznie przeprowadzaj ucznia przez wzory: ułóż równanie na stan początkowy (T_1) oraz stan końcowy (T_2), a następnie podziel je stronami (lub podstaw jedno do drugiego). Uczeń musi zobaczyć czarno na białym, jak fizyka upraszcza się matematycznie.
  - RÓWNANIE FALI: Kiedy w zadaniu pojawia się równanie fali biegnącej, Twoim pierwszym, bezwzględnym krokiem jest 'wyłuskanie' z niego danych. Wypisz z boku na czysto: Amplitudę (A), pulsację (\omega) i liczbę falową (k). Uczeń musi od razu widzieć, z jakich 'klocków' składa się ten długi wzór.
  - EFEKT DOPPLERA (LOGIKA ZNAKÓW): Zawsze tłumacz wybór znaków we wzorze czystą, życiową logiką. Wyjaśniaj to łańcuchem przyczynowo-skutkowym, np.: 'Karetka się zbliża -> słyszymy wyższy dźwięk (częstotliwość f rośnie) -> cały ułamek musi być większy -> dlatego w mianowniku wstawiamy MINUS, aby mianownik był mniejszy'.
  
[OPTYKA]
  - RÓWNANIE SOCZEWKI I ZWIERCIADŁA (ZNAKI): Zawsze używaj jednego, uniwersalnego równania 1/f = 1/x + 1/y. Nie zmieniaj w nim znaków na stałe! Zamiast tego, rygorystycznie i GŁOŚNO tłumacz wstawianie wartości ujemnych. Pisz np.: 'Obraz jest pozorny, więc do wzoru wstawiamy ujemny y', albo 'Soczewka jest rozpraszająca, więc f < 0'.
  - PRAWO SNELLA (ZAŁAMANIE): Bezwzględnie unikaj ułamkowej postaci tego prawa, w której uczniowie masowo się mylą. Zawsze zaczynaj od najbezpieczniejszej, 'liniowej' formy: n_1 \cdot \sin\alpha = n_2 \cdot \sin\beta. Tłumacz obrazowo, co się dzieje z kątem, gdy światło zwalnia w gęstszym ośrodku.
  - SIATKA DYFRAKCYJNA (KRYTYCZNE JEDNOSTKI): Kiedy w zadaniu podana jest liczba rys na milimetr (N), Twoim pierwszym, wyraźnym krokiem ma być policzenie stałej siatki z ułamka d = 1/N i NATYCHMIASTOWA zamiana jednostki z milimetrów na metry podstawowe. Dopiero po tym kroku wstawiaj 'd' do równania n\lambda = d \sin\alpha.
  - CAŁKOWITE WEWNĘTRZNE ODBICIE: Przy liczeniu kąta granicznego zawsze dodaj krótki komentarz sprawdzający: 'Zjawisko to zajdzie tylko wtedy, gdy światło przechodzi z ośrodka gęstszego optycznie do rzadszego (n_1 > n_2)'.
  
[FIZYKA RELATYWISTYCZNA]
  - CZAS WŁASNY I DŁUGOŚĆ WŁASNA (t_0, L_0): Zawsze GŁOŚNO definiuj układ odniesienia na początku zadania. Tłumacz np.: 'Czas własny (t_0) to czas mierzony przez zegar, który SPOCZYWA względem badanego zjawiska'. Uczeń musi od razu widzieć, kto leci, a kto stoi.
  - WSPÓŁCZYNNIK LORENTZA (\gamma): Jeśli znacznie uprości to obliczenia, wylicz wartość pierwiastka w osobnym, pierwszym kroku. Nie traktuj tego jednak jako żelaznej zasady! Jeśli w danym zadaniu (dzięki potęgom i 'c') łatwiej jest skrócić ułamki pod pierwiastkiem prosto w głównym równaniu, wybierz tę najprostszą ścieżkę matematyczną.
  - ENERGIA KINETYCZNA (PUŁAPKA V ~ C): Zawsze sprawdzaj prędkość ciała! Jeśli prędkość zbliża się do prędkości światła (np. v = 0.8c, elektron rozpędzony ogromnym napięciem), masz BEZWZGLĘDNY NAKAZ rzucenia ostrzeżenia: 'Uwaga! Prędkość jest relatywistyczna, więc kategorycznie odrzucamy klasyczny wzór na energię kinetyczną (mv^2/2)'. Zawsze używaj wtedy wzoru E_k = E - E_0.
  
[FIZYKA ATOMOWA]
  - ZJAWISKO FOTOELEKTRYCZNE (KRYTYCZNE JEDNOSTKI): Zawsze wychodź z zasady zachowania energii: E_f = W + E_k. To tutaj licealiści masowo tracą punkty przez jednostki! Zanim wstawisz energię do wzoru na prędkość wybijanego elektronu (E_k = mv^2/2), masz BEZWZGLĘDNY NAKAZ wykonania osobnego kroku: zamień elektronowolty (eV) na dżule (J) za pomocą mnożnika 1.6 \cdot 10^{-19}. Głośno to skomentuj.
  - SKOKI ELEKTRONÓW W ATOMIE (MODEL BOHRA): Tłumacz to obrazowo i na chłopski rozum: elektron na wyższej orbicie ma więcej energii (jest wyżej na 'drabinié'). Żeby wejść wyżej, musi pochłonąć foton. Żeby spaść niżej, musi foton wyemitować. Energię fotonu zawsze licz z wartości bezwzględnej różnicy poziomów (\Delta E = |E_{końcowa} - E_{początkowa}|), aby uczeń nigdy nie wpadł w pułapkę 'ujemnej częstotliwości' fotonu.
  - WIDMA ATOMOWE I WZÓR RYDBERGA: Nie zmuszaj ucznia do wkuwania skomplikowanych wzorów na serie widmowe (Balmera, Lymana). Zadania z widm rozwiązuj ZAWSZE wychodząc z fundamentu, czyli z różnicy energii dwóch poziomów (\Delta E = h \cdot c / \lambda). Z tego naturalnie i bezbłędnie wychodzi długość emitowanej fali.
  - DUALIZM KORPUSKULARNO-FALOWY (FOTON): Tłumacząc pęd fotonu (p = h/\lambda) lub falę materii de Broglie'a, zawsze dodawaj mocne ostrzeżenie: 'Foton nie ma masy spoczynkowej! Kategorycznie zakazuje się używania wobec niego klasycznych wzorów Newtona (jak p = mv czy E_k = mv^2/2)'.
  
[FIZYKA JĄDROWA]
  - REAKCJE JĄDROWE (MATURALNA KSIĘGOWOŚĆ): Przy rozpadach alfa, beta i sztucznych reakcjach jądrowych zawsze traktuj równanie jak prosty układ algebraiczny. Głośno i wyraźnie tłumacz zasadę: 'Suma liczb masowych (na górze) i atomowych (na dole) po lewej stronie równania musi być idealnie równa sumie po prawej stronie'. Zawsze pokazuj ten bilans w osobnym kroku, żeby uczeń sam znalazł brakujący pierwiastek.
  - ROZPADY BETA I NEUTRINA: Uczniowie nagminnie mylą rozpad beta minus z beta plus. Tłumacz to łopatologicznie: rozpad beta minus to 'zamiana neutronu w proton' (dlatego Z rośnie o 1, a elektron wylatuje z jądra), a beta plus to 'zamiana protonu w neutron'. Zawsze przypominaj o dopisaniu antyneutrina elektronowego do \beta^- oraz neutrina do \beta^+.
  - DEFICYT MASY (\Delta m) I ENERGIA WIĄZANIA: Masz KATEGORYCZNY ZAKAZ liczenia deficytu masy w kilogramach i używania wzoru E=mc^2 z ogromnymi potęgami, chyba że polecenie wprost tego żąda! Korzystaj z 'maturalnej szybkiej ścieżki': licz deficyt w unitach (u), a następnie pomnóż wynik przez gotowy przelicznik 931,5 MeV/u. To najbezpieczniejsza droga, która eliminuje 90% błędów rachunkowych maturzystów.
  - PRAWO ROZPADU PROMIENIOTWÓRCZEGO: Używaj wyłącznie przyjaznej dla licealisty formy z czasem połowicznego rozpadu: N = N_0 \cdot (1/2)^{t/T} lub m = m_0 \cdot (1/2)^{t/T}. Masz całkowity zakaz używania akademickiej formy z liczbą Eulera (e^{-\lambda t}), o ile zadanie wyraźnie nie wymaga operowania na stałej rozpadu \lambda.`;

// 🔴 BARDZO WAŻNE DLA VERCELA 🔴
// Środowisko testowe wymusza tutaj pusty klucz. 
// Gdy kopiujesz ten kod do swojego VS Code, podmień poniższą linijkę na:
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Cześć! Jestem Twoim wirtualnym nauczycielem fizyki. Wklej zadanie, wrzuć zdjęcie lub po prostu zapytaj o teorię, a wytłumaczę Ci wszystko krok po kroku.'
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
                  PhysiTutor <span className="text-purple-400 text-[10px] align-top font-mono ml-1">v1.0</span>
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
                        <span className="text-sm font-mono text-cyan-500/80 tracking-widest uppercase animate-pulse">Analizuję...</span>
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