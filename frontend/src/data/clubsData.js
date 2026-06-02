const clubsData = {
  KO: {
    description:
      "Klub Parlamentarny Koalicja Obywatelska skupia posłów partii centrolewicowych i liberalnych tworzących koalicję rządzącą. Jest największym klubem lewej strony sceny politycznej, opowiadającym się za integracją europejską, praworządnością i wolnościami obywatelskimi. Klub jest częścią koalicji rządzącej.",
    parties: [
      {
        name: "Koalicja Obywatelska",
        website: "https://koalicjaobywatelska.pl/",
        color: "#0066CC",
      },
      {
        name: "Zieloni",
        website: "https://partiazieloni.pl/",
        color: "#22C55E",
      },
      { name: "AgroUnia", color: "rgb(24, 133, 64)" },
    ],
  },

  PiS: {
    description:
      "Klub Parlamentarny Prawo i Sprawiedliwość to największe ugrupowanie opozycyjne, reprezentujące konserwatywne i narodowo-katolickie wartości. Partia rządziła Polską w latach 2015–2023, realizując m.in. program 500+, reformy sądownictwa i politykę migracyjną.",
    parties: [
      {
        name: "Prawo i Sprawiedliwość",
        website: "https://pis.org.pl",
        color: "#1E3A8A",
      },
    ],
  },

  "PSL-TD": {
    description:
      "Klub Parlamentarny PSL–Trzecia Droga skupia posłów ludowców i ich sojuszników. Reprezentuje interesy rolników, małych przedsiębiorców i społeczności lokalnych. PSL jako najstarsza działająca partia w Polsce stoi na straży wartości chrześcijańskich i idei samorządności. Klub jest częścią koalicji rządzącej.",
    parties: [
      {
        name: "Polskie Stronnictwo Ludowe",
        website: "https://psl.pl",
        color: "#16A34A",
      },
      {
        name: "Centrum dla Polski",
        website: "https://centrumdlapolski.pl/",
        color: "#15803D",
      },
    ],
  },

  Lewica: {
    description:
      "Koalicyjny Klub Parlamentarny Lewicy łączy partie lewicowe postulujące prawa pracownicze, rozbudowę państwa opiekuńczego, prawa kobiet i mniejszości oraz neutralność wyznaniową państwa. Klub jest częścią koalicji rządzącej.",
    parties: [
      {
        name: "Nowa Lewica",
        website: "https://www.lewica.pl",
        color: "#EF4444",
      },
      { name: "PPS", color: "#DC2626" },
      {
        name: "Unia Pracy",
        color: "#B91C1C",
      },
    ],
  },

  Polska2050: {
    description:
      "Klub Parlamentarny Polska 2050 skupia posłów ruchu założonego przez Szymona Hołownię. Ugrupowanie centrodemokratyczne kładzie nacisk na modernizację państwa, dialog społeczny i odpowiedzialne finanse publiczne. Klub jest częścią koalicji rządzącej.",
    parties: [
      {
        name: "Polska 2050",
        website: "https://polska2050.pl",
        color: "#d3e90e",
      },
    ],
  },

  Konfederacja: {
    description:
      "Klub Poselski Konfederacja reprezentuje prawicowo-liberalne i narodowo-konserwatywne środowiska. Sprzeciwia się interwencjonizmowi państwowemu, wysokim podatkom i polityce migracyjnej UE, postulując jednocześnie wzmocnienie suwerenności narodowej.",
    parties: [
      {
        name: "Ruch Narodowy",
        website: "https://ruch-narodowy.pl/",
        color: "#1C1C1E",
      },
      {
        name: "Nowa Nadzieja",
        website: "https://nowanadzieja.pl",
        color: "#374151",
      },
    ],
  },

  Konfederacja_KP: {
    description:
      "Koło Poselskie Konfederacja Korony Polskiej skupia posłów frakcji narodowo-katolickiej, kładąc szczególny nacisk na tożsamość chrześcijańską i suwerenność Polski.",
    parties: [
      {
        name: "Konfederacja Korony Polskiej",
        website: "https://konfederacjakoronypol.pl",
        color: "#7F1D1D",
      },
    ],
  },

  Centrum: {
    description:
      "Klub Parlamentarny Centrum skupia posłów centroprawicowych, którzy odeszli z Polski 2050. Ugrupowanie poszukuje trzeciej drogi pomiędzy rządową koalicją a tradycyjną prawicą, kładąc nacisk na stabilność i pragmatyczne zarządzanie państwem. Klub jest cześcią koalicji rządzącej.",
    parties: [{ name: "Centrum", website: "#", color: "#7C3AED" }],
  },

  Demokracja: {
    description:
      "Koło Poselskie Demokracja Bezpośrednia postuluje reformę systemu politycznego w kierunku większego udziału obywateli w podejmowaniu decyzji — poprzez referenda, inicjatywy ustawodawcze i mechanizmy partycypacji bezpośredniej.",
    parties: [
      { name: "Kukiz'15 ", website: "https://kukiz15.org/", color: "#D97706" },
    ],
  },

  Razem: {
    description:
      "Koło Poselskie Razem reprezentuje lewicę społeczną, postulując radykalne zmiany gospodarcze: wyższe podatki dla bogatych, rozbudowę usług publicznych, prawa pracownicze i walkę z nierównościami społecznymi.",
    parties: [
      { name: "Razem", website: "https://partiarazem.pl", color: "#BE185D" },
    ],
  },

  "niez.": {
    description:
      "Posłowie niezrzeszeni — parlamentarzyści, którzy nie należą do żadnego klubu ani koła poselskiego. Część z nich to byli członkowie partii, którzy opuścili macierzyste ugrupowania lub zostali wykreśleni z ich list.",
    parties: [],
  },
};

export default clubsData;
