import getTurkeyTime from "@/functions/utils/timeNow";
import mailStringCheck from "@/functions/utils/mailStringCheck";
import EncryptPassword from "@/functions/utils/EncryptPassword";
import { createNewData, getDataByUnique } from "@/services/serviceOperations";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]";

const handler = async (req, res) => {
  if (!req) {
    return res
      .status(500)
      .json({ status: "error", message: "Bir hata oluştu!" });
  }

  //getServerSession:  Kullanıcının oturum açıp açmadığını kontrol eder. Eğer açılmışsa session değişkenine atar.
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    const date = (await getTurkeyTime()).date;
    const time = (await getTurkeyTime()).time;

    if (req.method === "POST" && req.body) {
      try {
        const data = req.body;

        // Eğer kullanıcı gerekli alanları doldurmadan kayıt olmaya çalışırsa hata fırlatır.
        if (
          !mailStringCheck(data.email) ||
          data.name == "" ||
          data.name == undefined ||
          data.name == null ||
          data.name.length < 3 ||
          data.email == "" ||
          data.email == undefined ||
          data.email == null ||
          data.password == "" ||
          data.password == undefined ||
          data.password == null ||
          data.password.length < 5
        ) {
          throw new Error("Lütfen tüm alanları doğru bir şekilde doldurunuz!");
        }
        const isEmailValid = await mailStringCheck(data.email);
        if (!isEmailValid) {
          throw new Error("Email adresi yanlış.");
        }

        data.password = await EncryptPassword(data.password);

        if (!data.password || data.password.error) {
          throw new Error("pass: Kayıt sırasında bir hata oluştu.");
        }

        //aynı emaille başka kullanıcı var mı?
        await prisma.$connect();
        const allUserCheck = await getDataByUnique("user", {
          email: data.email,
        });

        if (allUserCheck != null && !allUserCheck.error) {
          throw new Error("Bu email ile kayıtlı başka bir kullanıcı var.  ");
        }

        const userFromDB = await createNewData("user", data);
        const addedUserPreferences = await createNewData("userPreferences", {
          userId: userFromDB.id,
        });
        if (
          userFromDB.error ||
          !userFromDB ||
          !addedUserPreferences ||
          addedUserPreferences.error
        ) {
          throw new Error(
            "REGXL: Kayıt sırasında bir hata oluştu.: " + userFromDB.error
          );
        }

        return res.status(200).json({
          success: true,
          status: "success",
          message:
            "Kayıt işlemi başarılı. Email ve Şifrenizle giriş yapabilirsiniz..",
        });
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, status: "error", error: error.message });
      }
    } else {
      return res.status(405).json({
        status: "error",
        message: "Bu sayfaya bu şekilde erişim sağlanamaz!",
      });
    }
  } else {
    return res.status(401).json({
      status: "error",
      message: "Oturum açılmış kullanıcılar kayıt olamaz!",
    });
  }
};

export default handler;
