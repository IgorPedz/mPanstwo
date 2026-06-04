export function getJudicialData(t) {
  return {
    sn: {
      accent: "indigo",
      icon: "scale",
      website: "https://www.sn.pl",
      type: t("staticData.judicial.sn.type"),
      powerType: t("staticData.judicial.sn.powerType"),
      leadershipLabel: t("staticData.judicial.sn.leadershipLabel"),
      leaderLabel: t("staticData.judicial.sn.leaderLabel"),
      leaderRole: "prezes",
      subordinateTo: t("staticData.judicial.sn.subordinateTo"),
      description: t("staticData.judicial.sn.description"),
      responsibilities: t("staticData.judicial.sn.responsibilities", { returnObjects: true }),
      infoFields: t("staticData.judicial.sn.infoFields", { returnObjects: true }),
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
        },
      ],
    },

    constitutional_tribunal: {
      accent: "purple",
      icon: "scale",
      website: "https://trybunal.gov.pl",
      type: t("staticData.judicial.constitutional_tribunal.type"),
      powerType: t("staticData.judicial.constitutional_tribunal.powerType"),
      leadershipLabel: t("staticData.judicial.constitutional_tribunal.leadershipLabel"),
      leaderLabel: t("staticData.judicial.constitutional_tribunal.leaderLabel"),
      leaderRole: "prezes",
      subordinateTo: t("staticData.judicial.constitutional_tribunal.subordinateTo"),
      description: t("staticData.judicial.constitutional_tribunal.description"),
      responsibilities: t("staticData.judicial.constitutional_tribunal.responsibilities", { returnObjects: true }),
      infoFields: t("staticData.judicial.constitutional_tribunal.infoFields", { returnObjects: true }),
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
      type: t("staticData.judicial.supreme_administrative_court.type"),
      powerType: t("staticData.judicial.supreme_administrative_court.powerType"),
      leadershipLabel: t("staticData.judicial.supreme_administrative_court.leadershipLabel"),
      leaderLabel: t("staticData.judicial.supreme_administrative_court.leaderLabel"),
      leaderRole: "prezes",
      subordinateTo: t("staticData.judicial.supreme_administrative_court.subordinateTo"),
      description: t("staticData.judicial.supreme_administrative_court.description"),
      responsibilities: t("staticData.judicial.supreme_administrative_court.responsibilities", { returnObjects: true }),
      infoFields: t("staticData.judicial.supreme_administrative_court.infoFields", { returnObjects: true }),
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
      type: t("staticData.judicial.national_council_of_the_judiciary.type"),
      powerType: t("staticData.judicial.national_council_of_the_judiciary.powerType"),
      leadershipLabel: t("staticData.judicial.national_council_of_the_judiciary.leadershipLabel"),
      leaderLabel: t("staticData.judicial.national_council_of_the_judiciary.leaderLabel"),
      leaderRole: "prezes",
      subordinateTo: t("staticData.judicial.national_council_of_the_judiciary.subordinateTo"),
      description: t("staticData.judicial.national_council_of_the_judiciary.description"),
      responsibilities: t("staticData.judicial.national_council_of_the_judiciary.responsibilities", { returnObjects: true }),
      infoFields: t("staticData.judicial.national_council_of_the_judiciary.infoFields", { returnObjects: true }),
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
}

export default getJudicialData;
