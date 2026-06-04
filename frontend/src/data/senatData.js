export function getSenatData(t) {
  return {
    accent: "red",
    icon: "parliament",
    website: "https://www.senat.gov.pl",
    type: t("staticData.senat.type"),
    leadershipLabel: t("staticData.senat.leadershipLabel"),
    leaderLabel: t("staticData.senat.leaderLabel"),
    description: t("staticData.senat.description"),
    responsibilities: t("staticData.senat.responsibilities", { returnObjects: true }),
    infoFields: t("staticData.senat.infoFields", { returnObjects: true }),
  };
}

export default getSenatData;
