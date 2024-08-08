"use client";
import mailStringCheck from "@/functions/other/mailStringCheck";
import { postAPI } from "@/services/fetchAPI";
import { Button, Divider, TextField, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

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
  const submitHandler = (e) => {
    e.preventDefault();
    postAPI("/auth/register", { name, email, password }).then(
      (res) => res.status == "success" && redirect("/")
    );
  };

  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      <Typography sx={{ textAlign: "center" }} variant="h4">
        Sign Up
      </Typography>
      <Divider />
      <TextField
        error={name.length < 3}
        helperText={name.length < 3 && "Email adress is not a valid."}
        label="User Name"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        sx={{ marginBottom: "1rem", marginTop: "1rem" }}
        required
      />
      <TextField
        error={!isEmailValid}
        helperText={!isEmailValid && "Email adress is not a valid."}
        label="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
          checkEmail(e.currentTarget.value);
        }}
        sx={{ marginBottom: "1rem" }}
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
        Sign Up
      </Button>
      <Typography sx={{ textAlign: "center", marginTop: ".5rem" }}>
        Already have an account?{" "}
        <Link
          style={{ color: "blue", textDecorationLine: "underline" }}
          href="/auth/login"
        >
          Log in.
        </Link>
      </Typography>
    </form>
  );
}
