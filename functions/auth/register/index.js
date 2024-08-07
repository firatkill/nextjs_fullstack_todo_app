// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import { getDataByUnique, createNewData } from "@/services/serviceOperations";

const createNewUser = async (user) => {
  try {
    // kullanıcı kontrolü

    const allUserCheck = await getDataByUnique("user", {
      email: user.email,
    });

    // eğer doğrulanmamış bir hesaba bağlı bir kayıt varsa yen iveriyi üzerine yaz
    if (allUserCheck != null && !allUserCheck.error) {
      return {
        error:
          "Bu e-mail adresine kayıtlı başka bir hesap bulunmaktadır. Şifremi unuttum bölümünden şifrenizi sıfırlayabilirsiniz.",
      };
    } else {
      // Kullanıcıyı veritabanına kayıt eder.
      const userFromDB = await createNewData("user", user);
      if (userFromDB.error || !userFromDB) {
        return { error: "Kayıt oluşturulamadı. REGXR" };
      }

      //Kayıt olan her kullanıcıyı tek tabloda birleştiririz.

      // E-mail doğrulama işlemi için veritabanına kayıt oluşturur.

      return {
        success: "Kayıt başarılı. E-mail ve şifrenizle giriş yapabilirsiniz.",
      };
    }
  } catch (error) {
    return { error: error.message };
  }
};

export default createNewUser;

// TELEFON KONTROL İSTEĞİ (DURDURULDU ŞİMDİLİK!)
// const phoneCheck = await prisma.user.findUnique({
//   where: {
//     phone: user.phone
//   },
// })

// TELEFON KONTROL KOŞULU (DURDURULDU ŞİMDİLİK!)
// // Eğer öğrenci ile eşleşen bir kayıt varsa hata döndür
// else if (phoneCheck != null && phoneCheck.phone == user.phone) {
//   return { error: "Girdiğiniz telefon numarası ile daha önce kayıt yapılmış." };
// }
