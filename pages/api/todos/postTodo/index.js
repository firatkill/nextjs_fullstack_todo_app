import { createNewData } from "@/services/serviceOperations";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const data = req.body;
      data.userId = session.user.id;

      if (!data.todoName || !data.todoDescription || !data.userId) {
        throw new Error(
          "Girdiğiniz bilgilerde hata var. Lütfen kontrol ediniz."
        );
      }

      const todo = await createNewData("todo", { ...data });

      return res.status(200).json({
        success: true,
        message: "Todo ekleme işlemi başarılı",
        todo: { todo },
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
