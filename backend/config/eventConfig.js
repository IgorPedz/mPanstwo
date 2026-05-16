const EVENT_CONFIG = {
  SURVEY_NEW: {
    icon: "📝",
    color: "blue",
    title: "Nowa ankieta",
    xp: 0
  },

  SURVEY_COMPLETED: {
    icon: "🎉",
    color: "green",
    title: "Ankieta zakończona",
    xp: 50
  },

  SURVEY_RESULT: {
    icon: "📊",
    color: "indigo",
    title: "Nowe wyniki",
    xp: 10
  },

  LAW_UPDATE: {
    icon: "⚖️",
    color: "amber",
    title: "Aktualizacja prawa",
    xp: 25
  },

  LOGIN_STREAK_SMALL: {
    icon: "🚀",
    color: "blue",
    title: "Seria logowań",
    xp: 20
  },

  LOGIN_STREAK_BIG: {
    icon: "🔥",
    color: "red",
    title: "Długa Seria Logowań",
    xp: 100
  }
};

module.exports = EVENT_CONFIG;