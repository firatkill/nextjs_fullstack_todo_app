import { deleteDataByMany } from "@/services/serviceOperations";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "DELETE") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const userId = session.user.id;
      if (!userId) {
        throw new Error(
          "Bir Sorun oluştu. Tekrar giriş yapıp yeniden deneyin."
        );
      }
      const deleted = await deleteDataByMany("category", { userId: userId });

      if (deleted.error) {
        throw new Error(deleted.error);
      }

      return res.status(200).json({
        success: true,
        message: "Kullanıcı verileri başarıyla silindi.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
