export function getPresidentData(t) {
  const lt = t("staticData.president.leadership", { returnObjects: true });
  return {
    accent: "red",
    icon: "flag",
    website: "https://www.prezydent.pl",
    type: t("staticData.president.type"),
    leadershipLabel: t("staticData.president.leadershipLabel"),
    leaderLabel: t("staticData.president.leaderLabel"),
    description: t("staticData.president.description"),
    biography: t("staticData.president.biography"),
    biographyLabel: t("staticData.president.biographyLabel"),
    responsibilities: t("staticData.president.responsibilities", { returnObjects: true }),
    infoFields: t("staticData.president.infoFields", { returnObjects: true }),
    leadership: [
      {
        name: "Karol Nawrocki",
        title: lt[0],
        role: "minister",
        photo: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Karol_Nawrocki_%282025%29_%28cropped%29.jpg",
        profileUrl: "https://www.prezydent.pl/prezydent/biografia",
      },
    ],
  };
}

export default getPresidentData;
