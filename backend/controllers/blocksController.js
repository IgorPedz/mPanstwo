const pool = require("../db");

const tryParseJson = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

exports.getBlocks = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("GET BLOCKS FOR COURSE ID:", id);
    const [blocks] = await pool.query(
      `
      SELECT *
      FROM blocks
      WHERE course_id = ?
      `,
      [id],
    );

    const formatted = blocks.map((b) => {
      const {
        id: blockId,
        type,
        course_id,
        order_index,
        title,
        description,
        content: rawContent,
        ...extraFields
      } = b;

      const contentFromRow = {
        ...(tryParseJson(rawContent) || {}),
        title,
        description,
        ...extraFields,
      };

      return {
        id: blockId,
        type,
        course_id,
        order_index,
        title,
        description,
        content: contentFromRow,
        ...extraFields,
      };
    });

    res.json({
      courseId: id,
      blocks: formatted,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
