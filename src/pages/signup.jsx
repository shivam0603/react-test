import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useUserStore from "../hooks/useUserStore";

const SignUpPage = () => {
  const { login, setIsAuthenticated } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(() => resolve(), 1000);
        })
          .then(() => {
            login(values);
            setIsAuthenticated(true);
          })
          .then(() => navigate("/")),
        {
          loading: "Please Wait...",
          success: "Welcome to Movie Booking",
          error: (error) => {
            return `Error: ${error.message}`;
          },
          duration: 1500,
        }
      );
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md space-y-2 p-4 mx-auto border rounded-lg"
      >
        <h3 className="text-xl font-bold text-center">Sign Up Here</h3>
        {/* Name */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium ml-1 mb-2">
            Enter your name
          </label>
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: true, maxLength: 20 })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.name && (
            <span className="text-red-500 text-sm ml-1">
              This field is Required
            </span>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium ml-1 mb-2">
            Enter your name
          </label>
          <input
            type="text"
            placeholder="city"
            {...register("city", { required: true, maxLength: 20 })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.city && (
            <span className="text-red-500 text-sm ml-1">
              This field is Required
            </span>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium ml-1 mb-2"
          >
            Enter your number
          </label>
          <input
            type="tel"
            placeholder="Mobile number"
            {...register("mobile", {
              required: true,
              minLength: {
                value: 10,
                message: "Invalid Phone Number",
              },
              maxLength: {
                value: 10,
                message: "Invalid Phone Number",
              },
            })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.mobile && (
            <span className="text-red-500 text-sm ml-1">
              This field is Required
            </span>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="px-3 py-2 border rounded-md bg-primary/80 hover:bg-primary"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
