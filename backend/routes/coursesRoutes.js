const express = require("express");
const router = express.Router();

const {
  getLesson,
  getFullCourse,
  getAllCourses,
  completeModule,
  getModuleProgress,
  completeLesson,
  completeQuiz,
  getLessonProgress,
  getCourseProgress,
  getLessonQuiz,
  completeCourse,
  getCourseCompletion,
} = require("../controllers/courseController");

router.get("/courses", getAllCourses);
router.get("/course/:id", getFullCourse);
router.get("/courses/lesson/progress", getModuleProgress);
router.get("/courses/lesson/:id", getLesson);
router.get("/course/:courseId/progress", getCourseProgress);
router.get("/courses/lesson-progress", getLessonProgress);
router.get("/courses/lesson/:lessonId/quiz", getLessonQuiz);
router.get("/courses/completion", getCourseCompletion);
router.post("/courses/lesson/module-complete", completeModule);
router.post("/courses/lesson/complete", completeLesson);
router.post("/courses/lesson/quiz-complete", completeQuiz);
router.post("/courses/complete", completeCourse);

module.exports = router;
