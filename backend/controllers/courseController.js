const db = require("../db");

exports.getAllCourses = async (req, res) => {
  const { userId } = req.query;

  try {
    // 1. kursy
    const [courses] = await db.query("SELECT * FROM courses");

    // 2. lekcje
    const [lessons] = await db.query("SELECT id, course_id FROM lessons");

    // 3. progress usera
    const [progress] = await db.query(
      `
      SELECT lesson_id, completed
      FROM user_lesson_progress
      WHERE user_id = ?
        AND completed = 1
      `,
      [userId],
    );

    const completedSet = new Set(progress.map((p) => p.lesson_id));

    // 4. mapowanie kursów
    const result = courses.map((course) => {
      const courseLessons = lessons.filter((l) => l.course_id === course.id);

      const totalLessons = courseLessons.length;

      const completedLessonsCount = courseLessons.filter((l) =>
        completedSet.has(l.id),
      ).length;

      return {
        ...course,
        totalLessons,
        completedLessonsCount,
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getFullCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.query.userId || req.user?.id;

    const [courseRows] = await db.query("SELECT * FROM courses WHERE id = ?", [
      courseId,
    ]);

    if (courseRows.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    const course = courseRows[0];

    const [lessons] = await db.query(
      "SELECT * FROM lessons WHERE course_id = ? ORDER BY order_index",
      [courseId],
    );

    for (let lesson of lessons) {
      const [modules] = await db.query(
        "SELECT * FROM modules WHERE lesson_id = ? ORDER BY order_index",
        [lesson.id],
      );

      const [quizzes] = await db.query(
        "SELECT * FROM lesson_quizzes WHERE lesson_id = ? ORDER BY order_index",
        [lesson.id],
      );

      let doneMap = {};
      let lessonProgress = { completed: false, quiz_completed: false };

      if (userId) {
        const [progressRows] = await db.query(
          "SELECT module_index FROM user_module_progress WHERE user_id = ? AND lesson_id = ? AND completed = 1",
          [userId, lesson.id],
        );

        progressRows.forEach((row) => {
          doneMap[row.module_index] = true;
        });

        const [lessonProgressRows] = await db.query(
          "SELECT completed, quiz_completed FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?",
          [userId, lesson.id],
        );

        if (lessonProgressRows.length > 0) {
          lessonProgress.completed = lessonProgressRows[0].completed === 1;
          lessonProgress.quiz_completed =
            lessonProgressRows[0].quiz_completed === 1;
        }
      }

      lesson.modules = modules;
      lesson.finalQuiz = quizzes;
      lesson.progress = doneMap;
      lesson.completed = lessonProgress.completed;
      lesson.quizCompleted = lessonProgress.quiz_completed;
    }

    res.json({
      ...course,
      lessons,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const userId = req.query.userId || req.user?.id;

    const [lessonRows] = await db.query("SELECT * FROM lessons WHERE id = ?", [
      lessonId,
    ]);

    if (lessonRows.length === 0) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const [modules] = await db.query(
      "SELECT * FROM modules WHERE lesson_id = ? ORDER BY order_index",
      [lessonId],
    );

    let doneMap = {};
    if (userId) {
      const [progressRows] = await db.query(
        "SELECT module_index FROM user_module_progress WHERE user_id = ? AND lesson_id = ? AND completed = 1",
        [userId, lessonId],
      );

      progressRows.forEach((p) => {
        doneMap[p.module_index] = true;
      });
    }

    res.json({
      ...lessonRows[0],
      modules,
      progress: doneMap,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeModule = async (req, res) => {
  const { userId, lessonId, moduleIndex } = req.body;

  if (!userId || !lessonId || moduleIndex === undefined) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    await db.query(
      `
      INSERT INTO user_module_progress (user_id, lesson_id, module_index, completed)
      VALUES (?, ?, ?, TRUE)
      ON DUPLICATE KEY UPDATE completed = TRUE
      `,
      [userId, lessonId, moduleIndex],
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getModuleProgress = async (req, res) => {
  const { userId, lessonId } = req.query;
  console.log(userId, lessonId);
  if (!userId || !lessonId) {
    return res.status(400).json({ error: "Missing userId or lessonId" });
  }

  try {
    const [rows] = await db.query(
      `
      SELECT module_index
      FROM user_module_progress
      WHERE user_id = ? AND lesson_id = ? AND completed = 1
      `,
      [userId, lessonId],
    );

    const progress = {};

    rows.forEach((r) => {
      progress[r.module_index] = true;
    });

    return res.json({ progress });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.completeLesson = async (req, res) => {
  const { userId, lessonId } = req.body;

  if (!userId || !lessonId) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    await db.query(
      `
      INSERT INTO user_lesson_progress (user_id, lesson_id, completed)
      VALUES (?, ?, TRUE)
      ON DUPLICATE KEY UPDATE completed = TRUE
      `,
      [userId, lessonId],
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeQuiz = async (req, res) => {
  const { userId, lessonId } = req.body;

  await db.query(
    `
    INSERT INTO user_lesson_progress
    (
      user_id,
      lesson_id,
      completed,
      quiz_completed
    )
    VALUES (?, ?, TRUE, TRUE)
    ON DUPLICATE KEY UPDATE
      completed = TRUE,
      quiz_completed = TRUE
    `,
    [userId, lessonId],
  );

  res.json({ success: true });
};

exports.getLessonProgress = async (req, res) => {
  try {
    const { userId, lessonId } = req.query;

    const [rows] = await db.query(
      `
      SELECT completed, quiz_completed
      FROM user_lesson_progress
      WHERE user_id = ? AND lesson_id = ?
      `,
      [userId, lessonId],
    );

    if (!rows.length) {
      return res.json({
        completed: false,
        quizCompleted: false,
      });
    }

    res.json({
      completed: rows[0].completed === 1,
      quizCompleted: rows[0].quiz_completed === 1,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getCourseProgress = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.query.userId;

    if (!courseId || !userId) {
      return res.status(400).json({ error: "Missing data" });
    }

    const [rows] = await db.query(
      `
      SELECT ulp.lesson_id
      FROM user_lesson_progress ulp
      JOIN lessons l ON l.id = ulp.lesson_id
      WHERE ulp.user_id = ?
        AND ulp.completed = 1
        AND l.course_id = ?
      `,
      [userId, courseId],
    );

    const completedLessons = rows.map((r) => r.lesson_id);

    res.json({ completedLessons });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
