import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import useMovieById from "../hooks/useMovieById";
import useUserStore from "../hooks/useUserStore";

const BookingPage = () => {
  const { isAuthenticated, user } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { movieId } = useParams();
  const movie = useMovieById(movieId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    // Mimic submit request to API with a timeout
    try {
      const result = toast.promise(
        new Promise((resolve, reject) => {
          // Use the correct comparison operator (===) in the condition
          if (
            movie.show.schedule.day === "" ||
            movie.show.schedule.time === ""
          ) {
            reject(new Error("No Shows Available in your city"));
          } else {
            // Resolve after 1000ms
            setTimeout(() => resolve({ name: values.name }), 1000);
          }
        }),
        {
          loading: "Please wait...",
          success: (data) => {
            return `Your ticket has been booked ${data.name}`;
          },
          error: (error) => {
            return `Error: ${error.message}`;
          },
          duration: 1500,
        }
      );
      console.log(values);
      reset();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!movie)
    return <main className="container mx-auto p-4">Movie not found</main>;

  if (!isAuthenticated) return navigate("/signup");
  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md space-y-2 p-4 mx-auto border rounded-lg"
      >
        {/* Movie Title */}
        <div>
          <label
            htmlFor="movieTitle"
            className="block text-sm font-medium ml-1 mb-2"
          >
            Movie Name
          </label>
          <input
            readOnly
            type="text"
            placeholder="Movie Name"
            {...register("movieTitle", {
              required: true,
              value: movie.show.name,
            })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* First Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium ml-1 mb-2">
            First Name
          </label>
          <input
            readOnly
            type="text"
            placeholder="Name"
            {...register("name", {
              required: true,
              value: user.name,
            })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.name && (
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
            Mobile Number
          </label>
          <input
            readOnly
            type="tel"
            placeholder="Mobile number"
            {...register("mobile", {
              required: true,
              value: user.mobile,
            })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.mobile && (
            <span className="text-red-500 text-sm ml-1">
              This field is Required
            </span>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium ml-1 mb-2">
            Enter your city
          </label>
          <input
            readOnly
            type="text"
            placeholder="City"
            {...register("city", { required: true, value: user.city })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.city && (
            <span className="text-red-500 text-sm ml-1">
              This field is Required
            </span>
          )}
        </div>

        {/* Number of tickets */}
        <div>
          <label
            htmlFor="ticketCount"
            className="block text-sm font-medium ml-1 mb-2"
          >
            Number of tickets
          </label>
          <input
            type="numer"
            placeholder="Number of Tickets"
            {...register("ticketCount", { required: true, min: 1, max: 10 })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.city && (
            <span className="text-red-500 text-sm ml-1">
              This field is Required
            </span>
          )}
        </div>

        {/* Show Day */}
        <div>
          <label
            htmlFor="showDay"
            className="block text-sm font-medium ml-1 mb-2"
          >
            Show Day
          </label>
          <input
            readOnly
            type="text"
            {...register("showDay", {
              required: true,
              value: movie.show.schedule.days[0]
                ? movie.show.schedule.days[0]
                : "No Shows Available",
            })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.showDay && (
            <span className="text-red-500 text-sm ml-1">
              This field is Required
            </span>
          )}
        </div>

        {/* Show Time */}
        <div>
          <label
            htmlFor="showTime"
            className="block text-sm font-medium ml-1 mb-2"
          >
            Show Time
          </label>
          <input
            readOnly
            type="text"
            {...register("showTime", {
              required: true,
              value: movie.show.schedule.time
                ? movie.show.schedule.time
                : "No Time Slot Available",
            })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.showDay && (
            <span className="text-red-500 text-sm ml-1">
              This field is Required
            </span>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="px-3 py-2 border rounded-md bg-primary/80 hover:bg-primary"
        >
          Book Ticket
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
