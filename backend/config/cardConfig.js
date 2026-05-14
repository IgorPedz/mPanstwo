const cardRegistry = {
  loginStreak: {
    title: "Streak logowania",
    icon: "fire", // fallback -> zamienimy niżej
    color: "orange",
  },

  activeDays: {
    title: "Dni aktywności",
    icon: "calendar",
    color: "red",
  },

  votes: {
    title: "Wypełnione ankiety",
    icon: "check",
    color: "emerald",
  },

  trackedLaws: {
    title: "Śledzone ustawy",
    icon: "documentcheck",
    color: "indigo",
  },

  opinions: {
    title: "Napisane opinie",
    icon: "messages",
    color: "blue",
  },

  courses: {
    title: "Ukończone kursy",
    icon: "courses",
    color: "purple",
  },

  reputation: {
    title: "Punkty reputacji",
    icon: "star",
    color: "yellow",
  },

  role: {
    title: "Rola",
    icon: "shield",
    color: "violet",
  },

  lastActivity: {
    title: "Ostatnia aktywność",
    icon: "clock",
    color: "zinc",
  },
};

module.exports = cardRegistry;