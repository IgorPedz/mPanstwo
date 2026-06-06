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
      leadership: (() => {
        const lt = t("staticData.judicial.sn.leadership", { returnObjects: true });
        return [
          { name: "Zbigniew Kapiński",     title: lt[0], role: "prezes"     },
          { name: "Krzysztof Wiak",         title: lt[1], role: "wiceprezes" },
          { name: "Ewa Stryczyńska",        title: lt[2], role: "wiceprezes" },
          { name: "Piotr Mirk",             title: lt[3], role: "wiceprezes" },
          { name: "Joanna Misztal-Konecka", title: lt[4], role: "wiceprezes" },
          { name: "WAKAT",                  title: lt[5], role: "wiceprezes" },
        ];
      })(),
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
      leadership: (() => {
        const lt = t("staticData.judicial.constitutional_tribunal.leadership", { returnObjects: true });
        return [
          { name: "Bogdan Święczkowski",  title: lt[0], role: "prezes"     },
          { name: "Bartłomiej Sochański", title: lt[1], role: "wiceprezes" },
        ];
      })(),
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
      leadership: (() => {
        const lt = t("staticData.judicial.supreme_administrative_court.leadership", { returnObjects: true });
        return [
          { name: "Jacek Chlebny",           title: lt[0], role: "prezes"     },
          { name: "Jerzy Siegień",            title: lt[1], role: "wiceprezes" },
          { name: "Jan Rudowski",             title: lt[2], role: "wiceprezes" },
          { name: "Małgorzata Korycińska",    title: lt[3], role: "wiceprezes" },
        ];
      })(),
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
      leadership: (() => {
        const lt = t("staticData.judicial.national_council_of_the_judiciary.leadership", { returnObjects: true });
        return [
          { name: "WAKAT", title: lt[0], role: "prezes"     },
          { name: "WAKAT", title: lt[1], role: "wiceprezes" },
        ];
      })(),
    },
  };
}

export default getJudicialData;
