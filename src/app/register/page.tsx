"use client";

// import { AuthPage } from "@components/auth-page";
// import { authProviderServer } from "@providers/auth-provider";
import { useLogin, useRegister } from "@refinedev/core";
// import { redirect } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: registerMutation } = useRegister();
  const { mutate: loginMutation } = useLogin();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add your sign-up logic here
    console.log("Email:", email);
    console.log("Password:", password);
    // registerMutation({ email, password });

    // registerMutation({
    //   email: "snmmaurya1@gmail.com",
    //   password: "Pass#147$!",
    //   name: "Snm Maurya",
    //   mobile_number: "7317715518",
    //   description: "just a test",
    // });

    // loginMutation({ email: "snmmaurya1@gmail.com", password: "Pass#147$!" });
    loginMutation({ email: "snmmaurya1@gmail.com", password: "Pass#147$vv!" });
  };

  // const data = await getData();

  // if (data.authenticated) {
  //   redirect(data?.redirectTo || "/");
  // }
  // return <AuthPage type="register" />;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

// async function getData() {
//   const { authenticated, redirectTo, error } = await authProviderServer.check();

//   return {
//     authenticated,
//     redirectTo,
//     error,
//   };
// }
