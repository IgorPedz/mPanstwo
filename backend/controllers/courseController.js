const db = require("../db");
const { handleEvent } = require("../services/event.service");

exports.getAllCourses = async (req, res) => {
  const { userId } = req.query;

  try {
    // 1. kursy
    const [courses] = await db.query("SELECT * FROM courses");

    // 2. lekcje
    const [lessons] = await db.query("SELECT id, course_id FROM lessons");

    // 3. progress lekcji usera
    const [progress] = await db.query(
      `SELECT lesson_id, completed
       FROM user_lesson_progress
       WHERE user_id = ? AND completed = 1`,
      [userId],
    );

    // 4. ukończone kursy (egzamin końcowy)
    const [courseCompletions] = await db.query(
      `SELECT course_id, exam_score, completed_at
       FROM user_courses WHERE user_id = ? AND completed = 1`,
      [userId],
    );

    const completedSet = new Set(progress.map((p) => p.lesson_id));
    const completionMap = new Map(
      courseCompletions.map((c) => [c.course_id, { examScore: c.exam_score, completedAt: c.completed_at }])
    );

    // 5. mapowanie kursów
    const result = courses.map((course) => {
      const courseLessons = lessons.filter((l) => l.course_id === course.id);
      const totalLessons = courseLessons.length;
      const completedLessonsCount = courseLessons.filter((l) =>
        completedSet.has(l.id),
      ).length;

      const completion = completionMap.get(course.id);

      return {
        ...course,
        totalLessons,
        completedLessonsCount,
        courseCompleted: !!completion,
        examScore: completion?.examScore ?? null,
        completedAt: completion?.completedAt ?? null,
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
      "SELECT lessons.*, courses.slug AS course_slug FROM lessons LEFT JOIN courses ON lessons.course_id = courses.id WHERE lessons.course_id = ?",
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
    const courseId = req.query.courseId;
    console.log(lessonId, userId, courseId);
    const [lessonRows] = await db.query(
      "SELECT lessons.*, courses.slug AS course_slug FROM lessons LEFT JOIN courses ON lessons.course_id = courses.id WHERE lessons.course_id = ? AND lessons.id = ?",
      [courseId, lessonId],
    );

    if (lessonRows.length === 0) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const [modules] = await db.query(
      "SELECT m.* FROM modules m LEFT JOIN lessons l ON m.lesson_id = l.id WHERE l.id = ? AND l.course_id = ? ORDER BY m.order_index;",
      [lessonId, courseId],
    );

    let doneMap = {};
    if (userId) {
      const [progressRows] = await db.query(
        `SELECT ump.module_index
FROM user_module_progress ump
JOIN lessons l ON l.id = ump.lesson_id
WHERE ump.user_id = ?
  AND ump.lesson_id = ?
  AND l.course_id = ?
  AND ump.completed = 1`,
        [userId, lessonId, courseId],
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
  console.log("id", userId, lessonId, moduleIndex);
  if (!userId || !lessonId || moduleIndex === undefined) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    await db.query(
      `
      INSERT INTO user_module_progress
      (user_id, lesson_id, module_index, completed)
      VALUES (?, ?, ?, 1)
      ON DUPLICATE KEY UPDATE completed = 1
      `,
      [userId, lessonId, moduleIndex],
    );

    await handleEvent(userId, "MODULES_COMPLETED");

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getModuleProgress = async (req, res) => {
  const { userId, lessonId, courseId } = req.query;
  console.log(userId, lessonId, courseId);
  if (!userId || !lessonId || !courseId) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const [rows] = await db.query(
      `
SELECT ump.module_index
FROM user_module_progress ump
JOIN lessons l ON l.id = ump.lesson_id
WHERE ump.user_id = ?
  AND ump.lesson_id = ?
  AND l.course_id = ?
  AND ump.completed = 1;
      `,
      [userId, lessonId, courseId],
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
      VALUES (?, ?, 1)
      ON DUPLICATE KEY UPDATE completed = 1
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

  if (!userId || !lessonId) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    await db.query(
      `
      INSERT INTO user_lesson_progress (user_id, lesson_id, completed, quiz_completed)
      VALUES (?, ?, 1, 1)
      ON DUPLICATE KEY UPDATE quiz_completed = 1
      `,
      [userId, lessonId],
    );

    await handleEvent(userId, "LESSONS_COMPLETED");

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLessonProgress = async (req, res) => {
  try {
    const { userId, lessonId, courseId } = req.query;

    const [rows] = await db.query(
      `
SELECT ulp.completed, ulp.quiz_completed
FROM user_lesson_progress ulp
LEFT JOIN lessons l ON l.id = ulp.lesson_id
WHERE ulp.user_id = ?
  AND ulp.lesson_id = ?
  AND l.course_id = ?;
      `,
      [userId, lessonId, courseId],
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

exports.getLessonQuiz = async (req, res) => {
  const { lessonId } = req.params;
  console.log(lessonId);
  try {
    const [rows] = await db.query(
      `
      SELECT *
      FROM lesson_quizzes
      WHERE lesson_id = ?
      ORDER BY order_index
      `,
      [lessonId],
    );

    const quiz = rows.map((q) => ({
      question: q.question,
      answers:
        typeof q.answers === "string" ? JSON.parse(q.answers) : q.answers,
      correct: q.correct_index,
    }));

    res.json({ quiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeCourse = async (req, res) => {
  const { userId, courseId, score } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    await db.query(
      `INSERT INTO user_courses (user_id, course_id, completed, exam_score, completed_at)
       VALUES (?, ?, 1, ?, NOW())
       ON DUPLICATE KEY UPDATE completed = 1, exam_score = ?, completed_at = NOW()`,
      [userId, courseId, score ?? null, score ?? null]
    );

    await handleEvent(userId, "COURSES_COMPLETED");

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseCompletion = async (req, res) => {
  const { userId, courseId } = req.query;

  if (!userId || !courseId) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const [rows] = await db.query(
      `SELECT completed, exam_score, completed_at
       FROM user_courses
       WHERE user_id = ? AND course_id = ?`,
      [userId, courseId]
    );

    if (!rows.length) {
      return res.json({ completed: false, examScore: null, completedAt: null });
    }

    res.json({
      completed: rows[0].completed === 1,
      examScore: rows[0].exam_score,
      completedAt: rows[0].completed_at,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
