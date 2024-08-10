import { getDataByMany } from "@/services/serviceOperations";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);

      const { categoryId } = req.body;
      const data = await getDataByMany("todo", {
        todoCategoryId: categoryId,
        userId: session.user.id,
      });
      return res.status(200).json({
        success: true,
        todos: data,
        message: " Todo listesi başarıyla getirildi.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
