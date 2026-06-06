const EVENT_CONFIG = {
  SURVEY_COMPLETED: {
    icon: "survey_completed",
    color: "emerald",
    title: "Ankieta zakończona",
    message: "Wypełniono ankiete",
    xp: 50,
    metricKey: "survey_completed",
    metric_source: "users_metrics",
  },

  MODULES_COMPLETED: {
    metricKey: "modules_completed",
    metric_source: "users_metrics",
  },

  LESSONS_COMPLETED: {
    metricKey: "lessons_completed",
    metric_source: "users_metrics",
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

  PROFILE_UPDATE: {
    icon: "profile_update",
    title: "Profil zaktualizowany",
  },

  VOTE_CAST: {
    icon: "vote_cast",
    title: "Oddano głos",
  },

  OPINION_POSTED: {
    icon: "messages",
    color: "sky",
    title: "Dodano opinię",
    xp: 10,
    metricKey: "opinions_written",
    metric_source: "users_metrics",
  },

  COURSES_COMPLETED: {
    icon: "course_completed",
    color: "amber",
    xp: 200,
    metricKey: "courses_completed",
    metric_source: "users_metrics",
  },

  LEVEL_UP: {
    icon: "trophy",
    color: "amber",
    title: "Awans rangi",
    message: "Awansowałeś na rangę {{rankName}}",
  },

  MP_RATED: {
    xp: 5,
    metricKey: "mps_rated",
    metric_source: "users_metrics",
    silent: true,
  },

  LAW_UPDATE: {
    icon: "document",
    color: "indigo",
    title: "Aktualizacja prawa",
  },
};

module.exports = EVENT_CONFIG;
