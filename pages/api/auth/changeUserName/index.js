import { updateDataByAny } from "@/services/serviceOperations";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "PUT") {
    try {
      const name = req.body;
      const session = await getServerSession(req, res, authOptions);
      const userId = session.user.id;

      if (!userId) {
        throw new Error(
          "Bir hatayla karşılaştık. Lütfen daha sonra tekrar deneyiniz."
        );
      }

      const user = await updateDataByAny("user", { id: userId }, { name });

      return res.status(200).json({
        success: true,
        message: "Kullanıcı ismi güncelleme işlemi başarılı",
        user: { name: user.name, id: user.id },
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
