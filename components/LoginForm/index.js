"use client";
import mailStringCheck from "@/functions/utils/mailStringCheck";
import { useGlobalStore } from "@/zustand/globalStore";
import { useUserStore } from "@/zustand/userStore";
import { Button, Divider, TextField, Typography } from "@mui/material";
import { signIn, signOut } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const setLoading = useGlobalStore((state) => state.handleLoading);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const setUserPreferences = useUserStore((state) => state.setUserPreferences);
  const openSnackbar = useGlobalStore((state) => state.openSnackbar);
  const checkEmail = async (email) => {
    const isValid = await mailStringCheck(email);
    if (isValid && !isEmailValid) {
      setIsEmailValid(true);
    } else if (!isValid && isEmailValid) {
      setIsEmailValid(false);
    }
  };
  // when visited, log out.
  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: "/",
    })
      .then((res) => {
        if (res.ok) {
          // SNACKBAR Giriş işlemi başarılı, yönlendiriliyorsunuz.
          openSnackbar({
            severity: "success",
            text: "Giriş işlemi başarılı. Yönlendiriliyorsunuz..",
          });
          router.push("/");
        } else {
          // SNACKBAR res.error
          openSnackbar({ severity: "error", text: res.error });
        }
      })
      .catch((er) => console.error(er))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      <Typography variant="h4" className="text-center h1">
        LOG IN
      </Typography>
      <Divider />
      <TextField
        error={!isEmailValid}
        helperText={!isEmailValid && "Email adress is not a valid."}
        label="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
          checkEmail(e.currentTarget.value);
        }}
        sx={{ marginBottom: "1rem", marginTop: "1rem" }}
        required
      />
      <TextField
        error={password.length < 5}
        helperText={
          password.length < 5 && "Password must be at least 3 characters"
        }
        label="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
        required
        sx={{ marginBottom: "1rem" }}
        minLength={3}
        type="password"
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          marginTop: "1rem",

          "&:hover": {},
        }}
      >
        Log in
      </Button>
      <Typography sx={{ textAlign: "center", marginTop: ".5rem" }}>
        Don't have an account?{" "}
        <Link style={{ textDecorationLine: "underline" }} href="/auth/register">
          Sign up.
        </Link>
      </Typography>
    </form>
  );
}
