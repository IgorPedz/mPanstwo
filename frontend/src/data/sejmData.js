export function getSejmData(t) {
  return {
    accent: "indigo",
    icon: "parliament",
    website: "https://www.sejm.gov.pl",
    type: t("staticData.sejm.type"),
    leadershipLabel: t("staticData.sejm.leadershipLabel"),
    leaderLabel: t("staticData.sejm.leaderLabel"),
    subordinateTo: t("staticData.sejm.subordinateTo"),
    description: t("staticData.sejm.description"),
    responsibilities: t("staticData.sejm.responsibilities", { returnObjects: true }),
    infoFields: t("staticData.sejm.infoFields", { returnObjects: true }),
  };
}

export default getSejmData;
