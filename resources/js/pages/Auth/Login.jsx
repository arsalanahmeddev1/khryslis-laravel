import React, { useState } from 'react';
import { usePage } from "@inertiajs/react";
import { logo } from "../../assets/images";
import { Link } from '@inertiajs/react';
import { useForm } from "react-hook-form";
import { router } from "@inertiajs/react";
import Layout from '../../components/Layouts/Auth';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { errors: serverErrors } = usePage().props;

  const onSubmit = (data) => {
    setIsLoading(true);
    router.post("/login", data, {
      onFinish: () => setIsLoading(false),
      onSuccess: () => {
        toast.success('Login successful! 🎉');
      },
      onError: () => {
        toast.error('Login failed. Please check your credentials.');
      }
    });
  };

  const inputFields = [
    {
      placeholder: "Email",
      // value: 'loginHandle.email',
      // onChange: (e) => handleChange(e),
      type: "email",
      name: "email",
    },
    {
      placeholder: "Password",
      // value: 'loginHandle.password',
      // onChange: (e) => handleChange(e),
      type: "password",
      name: "password",
    },
  ];

  return (
    <Layout>

      <img
        src={logo}
        className="w-[136px] h-[141px] block m-auto"
        alt=""
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-3">
          {inputFields.map((field, index) => (
            <input
              key={index}
              type={field.name === "password" ? "password" : "email"}
              className="input-field !rounded-[60px]"
              placeholder={field.placeholder}
              {...register(field.name, { required: `${field.placeholder} is required` })}
            />

          ))}
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        <br />
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            type="submit"
            className="py-[9px] text-white-false px-[40px] items-start gap-[18px] rounded-[100px] bg-violet-700"
          >
            {(isLoading && "laoding...") || "Login"}
          </button>
        </div>
      </form>
      <div className="text-center">
        <span className="text-[#5E5E5E]">Have'nt registered?</span>{" "}
        <Link href="/register">
          <span className="text-[#48D6DF]">Register</span>
        </Link>
      </div>
    </Layout>
  )
}

export default Login
