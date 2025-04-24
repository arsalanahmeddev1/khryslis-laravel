import React, { useEffect, useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import { logo } from "../../assets/images";
import { useForm } from "react-hook-form";
import Layout from '../../components/Layouts/Auth';
import { toast } from 'react-toastify';
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

  useEffect(() => {
    {errors.name && toast.error(errors.name?.message)}
    {errors.email && toast.error(errors.email?.message)}
    {errors.password && toast.error(errors.password?.message)}
    {errors.confirm_password && toast.error(errors.confirm_password?.message)}
  },[errors])

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
            <div className="" key={index}>
              <input
                type={field.type}
                className="input-field !rounded-[60px]"
                placeholder={field.placeholder}
                {...register(field.name, {
                  required: `${field.placeholder} is required`,
                })}
              />
              {errors[field.name] && (
                <p className="text-sm text-red-600 mt-2">{errors[field.name]?.message}</p>
              )
              }
              {serverErrors[field.name] && (
                <p className="text-sm text-red-600 mt-2">{errors[field.name]}</p>
              )}
            </div>
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
