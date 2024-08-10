import { updateDataByAny } from "@/services/serviceOperations";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "PUT") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const data = req.body;

      data.userId = session.user.id;
      if (!data.userId) {
        throw new Error(
          "Bir hatayla karşılaştık. Lütfen daha sonra tekrar deneyiniz."
        );
      }

      const { id, ...dataToSend } = data;
      const userPreferences = await updateDataByAny(
        "userPreferences",
        { id: data.id },
        dataToSend
      );

      return res.status(200).json({
        success: true,
        message: "Kullanıcı Tercihleri güncelleme işlemi başarılı",
        userPreferences: userPreferences,
      });
    } catch (error) {
      return res.status(500).json({
        status: error.status,
        error: error.message,
      });
    }
  } else {
    return res.status(500).json({ error: "Yanlış istek." });
  }
};
export default handler;
