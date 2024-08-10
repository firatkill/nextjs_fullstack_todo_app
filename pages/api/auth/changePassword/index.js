import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import DecryptPassword from "@/functions/utils/DecryptPassword";
import EncryptPassword from "@/functions/utils/EncryptPassword";
import { getDataByUnique, updateDataByAny } from "@/services/serviceOperations";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "PUT") {
    try {
      const { oldPassword, newPassword } = req.body;
      const session = await getServerSession(req, res, authOptions);
      const userId = session.user.id;

      if (!userId) {
        throw new Error(
          "Bir hatayla karşılaştık. Lütfen daha sonra tekrar deneyiniz."
        );
      }
      if (!oldPassword || !newPassword) {
        throw new Error(
          "Girdiğiniz Bilgilerde bir hata var. Lütfen tekrar deneyiniz."
        );
      }
      const userFromDB = await getDataByUnique("user", {
        id: userId,
      });
      if (
        !userFromDB ||
        userFromDB.error ||
        userFromDB == null ||
        userFromDB == undefined
      ) {
        throw new Error(
          "Bir hatayla karşılaştık. Lütfen tekrar giriş yapınız."
        );
      }
      const passwordCheck = await DecryptPassword(
        oldPassword,
        userFromDB.password
      );
      if (
        !passwordCheck ||
        passwordCheck == null ||
        passwordCheck == undefined
      ) {
        throw new Error("Eski şifre hatalı.");
      }
      const encryptedPassword = await EncryptPassword(newPassword);

      const user = await updateDataByAny(
        "user",
        { id: userId },
        { password: encryptedPassword }
      );

      return res.status(200).json({
        success: true,
        message: "Kullanıcı şifresi güncelleme işlemi başarılı",
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
