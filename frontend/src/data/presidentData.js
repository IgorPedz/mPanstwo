export function getPresidentData(t) {
  return {
    accent: "red",
    icon: "flag",
    website: "https://www.prezydent.pl",
    type: t("staticData.president.type"),
    leadershipLabel: t("staticData.president.leadershipLabel"),
    leaderLabel: t("staticData.president.leaderLabel"),
    description: t("staticData.president.description"),
    responsibilities: t("staticData.president.responsibilities", { returnObjects: true }),
    leadership: [
      {
        name: "Karol Nawrocki",
        title: "Prezydent Rzeczypospolitej Polskiej",
        role: "minister",
        photo: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Karol_Nawrocki_%282025%29_%28cropped%29.jpg",
        profileUrl: "https://www.prezydent.pl/prezydent/biografia",
      },
    ],
    infoFields: t("staticData.president.infoFields", { returnObjects: true }),
  };
}

export default getPresidentData;
