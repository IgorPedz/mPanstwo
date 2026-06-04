export function getClubsData(t) {
  return {
    KO: {
      description: t("staticData.clubs.KO.description"),
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
      description: t("staticData.clubs.PiS.description"),
      parties: [
        {
          name: "Prawo i Sprawiedliwość",
          website: "https://pis.org.pl",
          color: "#1E3A8A",
        },
      ],
    },

    "PSL-TD": {
      description: t("staticData.clubs.PSL-TD.description"),
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
      description: t("staticData.clubs.Lewica.description"),
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
      description: t("staticData.clubs.Polska2050.description"),
      parties: [
        {
          name: "Polska 2050",
          website: "https://polska2050.pl",
          color: "#d3e90e",
        },
      ],
    },

    Konfederacja: {
      description: t("staticData.clubs.Konfederacja.description"),
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
      description: t("staticData.clubs.Konfederacja_KP.description"),
      parties: [
        {
          name: "Konfederacja Korony Polskiej",
          website: "https://konfederacjakoronypol.pl",
          color: "#7F1D1D",
        },
      ],
    },

    Centrum: {
      description: t("staticData.clubs.Centrum.description"),
      parties: [{ name: "Centrum", website: "#", color: "#7C3AED" }],
    },

    Demokracja: {
      description: t("staticData.clubs.Demokracja.description"),
      parties: [
        { name: "Kukiz'15 ", website: "https://kukiz15.org/", color: "#D97706" },
      ],
    },

    Razem: {
      description: t("staticData.clubs.Razem.description"),
      parties: [
        { name: "Razem", website: "https://partiarazem.pl", color: "#BE185D" },
      ],
    },

    "niez.": {
      description: t("staticData.clubs.niez_independent.description"),
      parties: [],
    },
  };
}

export default getClubsData;
