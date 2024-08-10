import DecryptPassword from "@/functions/utils/DecryptPassword";
import mailStringCheck from "@/functions/utils/mailStringCheck";
import prisma from "@/lib/prisma";
import { getDataByUnique } from "@/services/serviceOperations";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "POST") {
    try {
      const data = req.body;

      if (
        !data.email ||
        !data.password ||
        !data ||
        !mailStringCheck(data.email)
      ) {
        throw new Error(
          "Girdiğiniz bilgilerde hata var. Lütfen kontrol ediniz."
        );
      }

      // kullanıcı verilerini sorgula / şifreleri karşılaştır.
      await prisma.$connect();
      const userFromDB = await getDataByUnique("user", { email: data.email });

      if (
        !userFromDB ||
        userFromDB.error ||
        userFromDB == null ||
        userFromDB == undefined
      ) {
        throw new Error("Mail adresi veya şifre hatalı.");
      }

      const PasswordFromDB = userFromDB.password;

      const passwordCheck = await DecryptPassword(
        data.password,
        PasswordFromDB
      );

      if (
        !passwordCheck ||
        passwordCheck == null ||
        passwordCheck == undefined
      ) {
        throw new Error("Mail adresi veya şifre hatalı.");
      }

      return res.status(200).json({
        success: true,
        userFromDB: userFromDB,
        message: "Giriş işlemi başarılı",
      });
    } catch (error) {
      return res.status(500).json({
        status: error.status,
        error: error.message,
      });
    }
  } else {
    return res.status(500).json({ error: "Giriş metodunda hata oluştu." });
  }
};

export default handler;
