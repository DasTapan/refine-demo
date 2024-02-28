"use client";

import { AuthBindings } from "@refinedev/core";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

// const registrationUrl = "https://reqres.in/api/register";
// const registrationUrl = "http://localhost:8080/api/v1/";
const registrationUrl =
  "http://localhost:8080/api/v1/brands/authentications/register";
const loginUrl = "http://localhost:8080/api/v1/brands/authentications/login";

const mockUsers = [
  {
    name: "John Doe",
    email: "johndoe@mail.com",
    roles: ["admin"],
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Doe",
    email: "janedoe@mail.com",
    roles: ["editor"],
    avatar: "https://i.pravatar.cc/150?img=1",
  },
];

export const authProvider: AuthBindings = {
  register: async ({ email, password }) => {
    try {
      const response = await fetch(registrationUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ email, password }),
        body: JSON.stringify({
          email: "snmmaurya1@gmail.com",
          password: "Pass#147$!",
          name: "Snm Maurya",
          mobile_number: "7317715518",
          description: "just a test",
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // assuming response is JSON
      console.log("User registered successfully:", data);
    } catch (error) {
      console.error("There was a problem registering the user:", error);
    }

    // localStorage.setItem("token", email);
    // alert("You have successfully registered!");
    return {
      success: true,
      redirectTo: "/",
    };
  },
  login: async ({ email, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    // const user = mockUsers[0];

    const response: any = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      Cookies.set("auth", JSON.stringify(response.authorization), {
        expires: 30, // 30 days
        path: "/",
      });
      return {
        success: true,
        // redirectTo: "/",
        redirectTo: "https://www.wikipedia.org/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    Cookies.remove("auth", { path: "/" });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
