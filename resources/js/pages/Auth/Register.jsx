import React, { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import { logo } from "../../assets/images";
import { useForm } from "react-hook-form";
import Layout from '../../components/Layouts/Auth';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { errors: serverErrors = {} } = usePage().props;

  const onSubmit = (data) => {
    setIsLoading(true);
    router.post("/register", data, {
      onFinish: () => setIsLoading(false),
    });
  };

  const inputFields = [
    {
      placeholder: "Name",
      type: "text",
      name: "name",
    },
    {
      placeholder: "Email",
      type: "email",
      name: "email",
    },
    {
      placeholder: "Password",
      type: "password",
      name: "password",
    },
    {
      placeholder: "Confirm Password",
      type: "password",
      name: "password_confirmation",
    },
  ];

  return (
    <Layout>
      <img
        src={logo}
        className="w-[136px] h-[141px] block m-auto"
        alt="Logo"
      />
      <form method='POST' onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-3">
          {inputFields.map((field, index) => (
            <input
              key={index}
              type={field.type}
              className="input-field !rounded-[60px]"
              placeholder={field.placeholder}
              {...register(field.name, {
                required: `${field.placeholder} is required`,
              })}
            />
          ))}

          {/* Client-side validation messages */}
          {Object.keys(errors).map((key) => (
            <p key={key} className="text-sm text-red-600">{errors[key]?.message}</p>
          ))}

          {/* Server-side validation messages */}
          {Object.keys(serverErrors).map((key) => (
            <p key={key} className="text-sm text-red-600">{serverErrors[key]}</p>
          ))}
        </div>

        <br />
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            type="submit"
            className="py-[9px] text-white px-[40px] items-start gap-[18px] rounded-[100px] bg-violet-700"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>

      <div className="text-center mt-2">
        <span className="text-[#5E5E5E]">Already have an account?</span>{" "}
        <Link href="/login">
          <span className="text-[#48D6DF]">Login</span>
        </Link>
      </div>
    </Layout>
  );
};

export default Register;
