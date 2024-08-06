import { deleteDataByMany } from "@/services/serviceOperations";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "DELETE") {
    try {
      const { category } = req.query;
      let where = { completed: true };
      if (category != "All") {
        where = { completed: true, todoCategoryId: category };
      }
      await deleteDataByMany("todo", where);

      return res
        .status(200)
        .json({ message: "Tamamlanan Todo'lar başarıyla silindi." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
