import { getDataByMany } from "@/services/serviceOperations";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const data = await getDataByMany("category", {
        userId: session.user.id,
      });
      return res.status(200).json({
        success: true,
        categories: data,
        message: "Kategoriler başarıyla getirildi.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
