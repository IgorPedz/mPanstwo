const judicialData = {
  sn: {
    accent: "indigo",
    icon: "scale",
    website: "https://www.sn.pl",
    type: "Sąd Najwyższy",
    powerType: "Sądownicza",
    leadershipLabel: "Kierownictwo Sądu Najwyższego",
    leaderLabel: "Pierwszy Prezes",
    leaderRole: "prezes",
    subordinateTo: "Konstytucji RP",
    description:
      "Sąd Najwyższy jest organem władzy sądowniczej powołanym do sprawowania wymiaru sprawiedliwości przez zapewnienie zgodności z prawem oraz jednolitości orzecznictwa sądów powszechnych i wojskowych. Sprawuje nadzór judykacyjny nad działalnością wszystkich sądów powszechnych i wojskowych.",
    responsibilities: [
      "Sprawowanie nadzoru judykacyjnego nad sądami powszechnymi i wojskowymi",
      "Rozpoznawanie kasacji i skarg nadzwyczajnych",
      "Podejmowanie uchwał mających na celu wyjaśnienie przepisów prawnych",
      "Stwierdzanie ważności wyborów parlamentarnych, prezydenckich i referendów",
      "Rozpoznawanie protestów wyborczych",
      "Orzekanie w sprawach dyscyplinarnych sędziów",
      "Rozpoznawanie środków odwoławczych od orzeczeń wojskowych sądów okręgowych",
    ],
    infoFields: [
      ["Siedziba", "Warszawa, pl. Krasińskich 2/4/6"],
      ["Struktura", "4 Izby + Izba Odpowiedzialności Zawodowej"],
      ["Kadencja PP", "6 lat"],
      ["Podlega", "Konstytucji RP"],
    ],
    leadership: [
      {
        name: "Zbigniew Kapiński",
        title: "Pierwszy Prezes Sądu Najwyższego",
        role: "prezes",
      },
      {
        name: "Krzysztof Wiak ",
        title: "Prezes Izby Kontroli Nadzwyczajnej i Spraw Publicznych",
        role: "wiceprezes",
      },
      {
        name: "Ewa Stryczyńską",
        title: "p.o. Prezesa Izby Pracy i Ubezpieczeń Społecznych",
        role: "wiceprezes",
      },
      {
        name: "Piotr Mirk",
        title: "p.o. Prezesa  Izby Karnej",
        role: "wiceprezes",
      },
      {
        name: "Joanna Misztal-Konecka",
        title: "Prezes Izby Cywilnej",
        role: "wiceprezes",
      },
      {
        name: "WAKAT",
        title: "Prezes Izby Odpowiedzialności Zawodowej",
        role: "wiceprezes",
      }
    ],
  },

  constitutional_tribunal: {
    accent: "purple",
    icon: "scale",
    website: "https://trybunal.gov.pl",
    type: "Trybunał Konstytucyjny",
    powerType: "Sądownicza",
    leadershipLabel: "Kierownictwo Trybunału Konstytucyjnego",
    leaderLabel: "Prezes",
    leaderRole: "prezes",
    subordinateTo: "Konstytucji RP",
    description:
      "Trybunał Konstytucyjny jest organem władzy sądowniczej powołanym do badania zgodności aktów normatywnych z Konstytucją RP. Jego orzeczenia mają moc powszechnie obowiązującą i są ostateczne. Trybunał stoi na straży zasady nadrzędności Konstytucji w porządku prawnym.",
    responsibilities: [
      "Orzekanie o zgodności ustaw i umów międzynarodowych z Konstytucją",
      "Orzekanie o zgodności ustaw z ratyfikowanymi umowami międzynarodowymi",
      "Orzekanie w sprawach skarg konstytucyjnych obywateli",
      "Rozstrzyganie sporów kompetencyjnych między centralnymi organami państwa",
      "Orzekanie o zgodności z Konstytucją celów i działalności partii politycznych",
      "Stwierdzanie przeszkody w sprawowaniu urzędu przez Prezydenta RP",
    ],
    infoFields: [
      ["Siedziba", "Warszawa, al. Jana Christiana Szucha 12a"],
      ["Skład", "15 sędziów"],
      ["Kadencja sędziego", "9 lat"],
      ["Podlega", "Konstytucji RP"],
    ],
    leadership: [
      {
        name: "Bogdan Święczkowski",
        title: "Prezes Trybunału Konstytucyjnego",
        role: "prezes",
      },
      {
        name: "Bartłomiej Sochański",
        title: "Wiceprezes Trybunału Konstytucyjnego",
        role: "wiceprezes",
      },
    ],
  },

  supreme_administrative_court: {
    accent: "teal",
    icon: "scale",
    website: "https://www.nsa.gov.pl",
    type: "Naczelny Sąd Administracyjny",
    powerType: "Sądownicza",
    leadershipLabel: "Kierownictwo NSA",
    leaderLabel: "Prezes",
    leaderRole: "prezes",
    subordinateTo: "Konstytucji RP",
    description:
      "Naczelny Sąd Administracyjny sprawuje nadzór nad działalnością wojewódzkich sądów administracyjnych w zakresie orzekania. Kontroluje legalność działania organów administracji publicznej i chroni prawa obywateli przed bezprawnymi decyzjami władzy. Rozstrzyga spory kompetencyjne między organami administracji a sądami.",
    responsibilities: [
      "Sprawowanie nadzoru orzeczniczego nad WSA",
      "Rozpoznawanie środków odwoławczych od orzeczeń WSA",
      "Podejmowanie uchwał wyjaśniających przepisy prawa administracyjnego",
      "Rozstrzyganie sporów kompetencyjnych w administracji",
      "Kontrola legalności działań organów administracji publicznej",
      "Orzekanie w sprawach dyscyplinarnych sędziów sądów administracyjnych",
      "Rozpoznawanie skarg na bezczynność organów administracji",
    ],
    infoFields: [
      ["Siedziba", "Warszawa, ul. Gabriela Piotra Boduena 3/5"],
      [
        "Struktura",
        "Izba Finansowa, Izba Gospodarcza, Izba Ogólnoadministracyjna",
      ],
      ["Kadencja", "bezterminowa (do osiągnięcia wieku)"],
      ["Podlega", "Konstytucji RP"],
    ],
    leadership: [
      {
        name: "Jacek Chlebny",
        title: "Prezes Naczelnego Sądu Administracyjnego",
        role: "prezes",
      },
      {
        name: "Jerzy Siegień",
        title: "Wiceprezes NSA ds. Izby Ogólnoadministracyjnej",
        role: "wiceprezes",
      },
      {
        name: "Jan Rudowski",
        title: "Wiceprezes NSA ds. Izby Finansowej",
        role: "wiceprezes",
      },
      {
        name: "Małgorzata Korycińska",
        title: "Wiceprezes NSA ds. Izby Gospodarczej",
        role: "wiceprezes",
      },
    ],
  },

  national_council_of_the_judiciary: {
    accent: "orange",
    icon: "scale",
    website: "https://www.krs.pl",
    type: "Krajowa Rada Sądownictwa",
    powerType: "Sądownicza",
    leadershipLabel: "Skład Krajowej Rady Sądownictwa",
    leaderLabel: "Przewodniczący",
    leaderRole: "prezes",
    subordinateTo: "Konstytucji RP",
    description:
      "Krajowa Rada Sądownictwa stoi na straży niezależności sądów i niezawisłości sędziów. Wnioskuje do Prezydenta RP o powołanie sędziów wszystkich szczebli. Opiniuje akty normatywne dotyczące sądownictwa oraz czuwa nad przestrzeganiem etyki zawodowej sędziów.",
    responsibilities: [
      "Wnioskowanie do Prezydenta RP o powołanie sędziów",
      "Stanie na straży niezależności sądów i niezawisłości sędziów",
      "Opiniowanie projektów aktów normatywnych dotyczących sądownictwa",
      "Podejmowanie uchwał w sprawach wyróżnień i odznaczeń sędziów",
      "Uchwalanie zbioru zasad etyki zawodowej sędziów",
      "Wyrażanie stanowisk w sprawach dotyczących sądownictwa",
      "Rozpatrywanie i ocenianie kandydatów do pełnienia urzędu sędziego",
    ],
    infoFields: [
      ["Siedziba", "Warszawa, ul. Rakowiecka 30"],
      ["Skład", "25 członków"],
      ["Kadencja", "4 lata"],
      ["Podlega", "Konstytucji RP (art. 186–187)"],
    ],
    leadership: [
      { name: "WAKAT", title: "Przewodnicząca KRS", role: "prezes" },
      {
        name: "WAKAT",
        title: "Zastępca Przewodniczącego KRS",
        role: "wiceprezes",
      },
    ],
  },
};

export default judicialData;
