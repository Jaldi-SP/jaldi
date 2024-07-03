"use client";
import React, { useState } from "react";
// import { useRouter } from "next/router";

export default function SigninWithPassword() {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  // const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6464/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed!");
      }

      const result = await response.json();
      console.log(result);

      // Update your reducer with the received user data here

      // Clear the password field
      setData((prevData) => ({
        ...prevData,
        password: "",
      }));

      // Redirect to the dashboard
      // router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Invalid username or password.");
      setData((prevData) => ({
        ...prevData,
        password: "",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Username
        </label>
        <div className="relative">
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            value={data.username}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="password"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            value={data.password}
            onChange={handleChange}
          />
        </div>
      </div>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
