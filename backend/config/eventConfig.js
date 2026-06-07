const EVENT_CONFIG = {
  SURVEY_COMPLETED: {
    icon: "survey_completed",
    color: "emerald",          // zielony — wypełniono ankietę
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
    color: "orange",           // pomarańczowy — seria logowań
    title: "Seria logowań",
    message: "Seria trwa!",
    xp: 10,
  },

  LOGIN_STREAK_BIG: {
    icon: "login_streak_big",
    color: "rose",             // różowy/czerwony — długa seria
    title: "Długa seria logowań",
    message: "Legendarna aktywność!",
    xp: 25,
  },

  ACHIEVEMENT_UNLOCK: {
    icon: "achievement_unlock",
    color: "amber",            // złoty — osiągnięcie
    title: "Osiągnięcie odblokowane",
  },

  PROFILE_UPDATE: {
    icon: "profile_update",
    color: "blue",             // niebieski — profil
    title: "Profil zaktualizowany",
  },

  VOTE_CAST: {
    icon: "vote_cast",
    color: "violet",           // fioletowy — głosowanie
    title: "Oddano głos",
  },

  OPINION_POSTED: {
    icon: "messages",
    color: "sky",              // błękitny — opinia
    title: "Dodano opinię",
    xp: 10,
    metricKey: "opinions_written",
    metric_source: "users_metrics",
  },

  COURSES_COMPLETED: {
    icon: "course_completed",
    color: "indigo",           // granatowy — kurs
    xp: 200,
    metricKey: "courses_completed",
    metric_source: "users_metrics",
  },

  LEVEL_UP: {
    icon: "trophy",
    color: "yellow",           // żółty — awans rangi
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
    color: "teal",             // turkusowy — aktualności prawne
    title: "Aktualizacja prawa",
  },

  REPORT_RESOLVED: {
    icon: "flag",
    color: "green",            // zielony — zgłoszenie rozpatrzone (usunięto)
    title: "Zgłoszenie rozpatrzone",
  },

  REPORT_DISMISSED: {
    icon: "flag",
    color: "slate",            // szary — zgłoszenie odrzucone
    title: "Zgłoszenie odrzucone",
  },

  APPEAL_APPROVED: {
    icon: "unlock",
    color: "cyan",             // cyjanowy — odwołanie zatwierdzone
    title: "Odwołanie zatwierdzone",
  },

  APPEAL_REJECTED: {
    icon: "lock",
    color: "red",              // czerwony — odwołanie odrzucone
    title: "Odwołanie odrzucone",
  },

  OPINION_ENDORSED: {
    icon: "star",
    color: "pink",             // różowy — opinia uznana za ważną
    title: "Opinia uznana za ważną",
  },
};

module.exports = EVENT_CONFIG;
