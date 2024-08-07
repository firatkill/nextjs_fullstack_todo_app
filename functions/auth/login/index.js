// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import { getDataByUnique } from "@/services/serviceOperations";
import DecryptPassword from "../utils/decryptPassword";

// POST
const loginFunction = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw new Error("Girdiğiniz bilgilerde hata var. Lütfen kontrol ediniz.");
    }

    const userFromDB = await getDataByUnique("user", { email: email });

    if (
      !userFromDB ||
      userFromDB.error ||
      userFromDB == null ||
      userFromDB == undefined
    ) {
      throw new Error("Mail adresi veya şifre hatalı.");
    }

    const PasswordFromDB = userFromDB.password;

    const passwordCheck = await DecryptPassword(password, PasswordFromDB);

    if (!passwordCheck || passwordCheck == null || passwordCheck == undefined) {
      throw new Error("Mail adresi veya şifre hatalı.");
    }

    return { success: true, userFromDB: userFromDB, status: "success" };
  } catch (error) {
    return {
      success: false,
      error: error,
      status: "error",
    };
  }
};

export default loginFunction;
