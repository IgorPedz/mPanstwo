const EVENT_CONFIG = {
  SURVEY_NEW: {
    icon: "survey_new",
    title: "Nowa ankieta",
  },

  SURVEY_COMPLETED: {
    icon: "survey_completed",
    color:  "emerald",
    title: "Ankieta zakończona",
    message: "Wypełniono ankiete",
    xp: 50,
    metricKey: "survey_completed",
    metric_source: "users_metrics"
  },

  SURVEY_RESULT: {
    icon: "survey_result",
    title: "Nowe wyniki",
  },

  LAW_UPDATE: {
    icon: "law_update",
    title: "Aktualizacja prawa",
  },

  LOGIN_STREAK_SMALL: {
    icon: "login_streak_small",
    color: "red",
    title: "Seria logowań",
    message: "Seria trwa!",
    xp: 10,
  },

  LOGIN_STREAK_BIG: {
    icon: "login_streak_big",
    color: "orange",
    title: "Długa seria logowań",
    message: "Legendarna aktywność!",
    xp: 25,
  },

  ACHIEVEMENT_UNLOCK: {
    icon: "achievement_unlock",
    title: "Osiągnięcie odblokowane",
  },

  XP_GAIN: {
    icon: "xp_gain",
    title: "Zdobyto XP",
  },

  PROFILE_UPDATE: {
    icon: "profile_update",
    title: "Profil zaktualizowany",
  },

  VOTE_CAST: {
    icon: "vote_cast",
    title: "Oddano głos",
  },

  OPINION_POSTED: {
    icon: "opinion_posted",
    title: "Dodano opinię",
  },

  COURSE_COMPLETED: {
    icon: "course_completed",
    title: "Ukończono kurs",
  },

  LEVEL_UP: {
    icon: "trophy",
    color: "amber",
    title: "Awans rangi",
    message: "Awansowałeś na rangę {{rankName}}",
  },
};

module.exports = EVENT_CONFIG;