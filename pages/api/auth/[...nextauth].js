import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { postAPI } from "@/services/fetchAPI";

const authOptions = {
  providers: [
    // CredentialsProvider ile email ve şifreyi kullanıcıdan alarak normal giriş yapmasını sağlarız.
    // farklı giriş yöntemleri ile (google - github - facebook) giriş için hazır "provider" ları kullanabiliriz.
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // kontrol edilecek (email ve password) bilgilerini credentials değişkeninden alıyoruz.
        const { email, password } = credentials;
        // giriş yapılacak sayfayı role değişkeninden alıyoruz.

        if (email) {
          // yukarıda aldığımız giriş bilgilerini => [email eşleşmesi, password doğrulaması] için fonksiyonumuza gönderiyoruz.
          const data = await postAPI(`/auth/login`, { email, password });
          if (!data || data.error || data == null) {
            if (data) {
              throw new Error(data.error);
            } else {
              throw new Error(
                "Giriş işleminde bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
              );
            }
          }

          const { userFromDB, success, error, status } = data;
          if (
            userFromDB === null ||
            !success ||
            userFromDB === undefined ||
            error ||
            !userFromDB
          ) {
            let error2 = new Error();
            error2.message = error;
            error2.status = status;
            throw error2;
          }
          if (!userFromDB.name || !userFromDB.email || !userFromDB.id) {
            throw new Error("Giriş işleminde bir hata oluştu.");
          }
          const user = {
            id: userFromDB.id,
            name: userFromDB.name,
            email: userFromDB.email,
          };

          if (user) {
            return user;
          }
        } else {
          throw new Error("Giriş işleminde bir hata oluştu.");
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },

  // kullanıcı giriş yaptıktan sonra giriş yapan kullanıcının bilgilerini token değişkenine atıyoruz.
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, //1 * 24 * 60 * 60 1 days * 24 hours * 60 minutes * 60 seconds
  },

  callbacks: {
    // jwt fonksiyonu ile kullanıcı giriş yaptıktan sonra giriş yapan kullanıcının bilgilerini token değişkenine atıyoruz.
    // bu bilgileri session fonksiyonunda kullanacağız.
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    // session fonksiyonu ile kullanıcı giriş yaptıktan sonra giriş yapan kullanıcının bilgilerini session değişkenine atıyoruz.
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },

  pages: {
    // signIn fonksiyonu çalıştığında kulanıcıyı yönlendireceğimiz sayfayı belirtiyoruz.
    signIn: `/auth/login`,
    encryption: true,
  },
};
export { authOptions };
export default NextAuth(authOptions);
