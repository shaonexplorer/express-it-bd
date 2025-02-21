"use client";

import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function Form() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const schema = z.object({
    storeName: z
      .string()
      .toLowerCase()
      .min(3, "Store name must be at least 3 characters long"),
    subDomain: z
      .string()
      .min(1, "Sub domain name is required")
      .toLowerCase()
      .refine(async (value) => {
        const response = await fetch(
          `https://interview-task-green.vercel.app/task/domains/check/${value}.expressitbd.com`
        );
        const result = await response.json();
        if (result.data.taken == false) {
          return true;
        } else return false;
      }, "Not available domain, re enter!"),
    storeLocation: z.string(),
    storeCategory: z.string(),
    storeCurrency: z.string(),
    storeEmail: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
  });

  async function onSubmit(data) {
    const {
      storeName,
      subDomain,
      storeLocation,
      storeCategory,
      storeCurrency,
      storeEmail,
    } = data;

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://interview-task-green.vercel.app/task/stores/create",
        {
          method: "POST",
          body: JSON.stringify({
            name: storeName,
            currency: storeCurrency,
            country: storeLocation,
            domain: subDomain,
            category: storeCategory,
            email: storeEmail,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();

      console.log(result);
      setIsLoading(false);

      if (result.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Store succesfully created",
        });
        router.push(`/products`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-screen mx-5 sm:mx-0 sm:w-[480px] bg-white shadow-sm shadow-stone-300 flex flex-col gap-[20px] px-[24px] py-[32px] rounded-[20px]">
      <h1 className="text-center text-[20px] font-bold text-[#1F81B9]">
        Create Store
      </h1>
      <p className="text-center text-[15px] text-[#333333]">
        Add your basic store information and complete the setup
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px]"
      >
        <label className="flex flex-col gap-[8px]">
          <p className="text-[15px] font-semibold text-[#333333]">
            Give your online store a name
          </p>
          <input
            placeholder="How'd you like to call your store?"
            type="text"
            {...register("storeName")}
            className={`${
              errors?.storeName ? "border-red-500" : "border-[#DDDDDD]"
            } w-full px-[15px] py-[8px] border  bg-white rounded-[8px] outline-none text-black`}
          ></input>
          {errors?.storeName && (
            <p className="text-red-500 text-[13px] font-semibold">
              {errors.storeName.message}
            </p>
          )}
        </label>

        <label className="flex flex-col gap-[8px]">
          <p className="text-[15px] font-semibold text-[#333333]">
            Your online store subdomain
          </p>
          <div className="relative">
            <input
              placeholder="Enter domain name"
              type="text"
              {...register("subDomain")}
              className={`${
                errors.subDomain ? "border-red-500" : "border-[#DDDDDD]"
              } w-full px-[15px] py-[8px] border  bg-white rounded-[8px] outline-none text-black`}
            ></input>
            <p className="absolute z-30 top-[25%] right-[15px] text-[#333333]">
              .expressitbd.com
            </p>
          </div>
          {errors?.subDomain && (
            <p className="text-red-500 text-[13px] font-semibold">
              {errors.subDomain.message}
            </p>
          )}
        </label>

        <label className="flex flex-col gap-[8px]">
          <p className="text-[15px] font-semibold text-[#333333]">
            where is your store located
          </p>
          <select
            {...register("storeLocation")}
            className="w-full px-[15px] py-[8px] border border-[#DDDDDD] bg-white rounded-[8px] outline-none text-black"
          >
            <option value="Bangladesh">Bangladesh</option>
            <option value="Pakistan">Pakistan</option>
            <option value="China">China</option>
            <option value="India">India</option>
          </select>
        </label>

        <label className="flex flex-col gap-[8px]">
          <p className="text-[15px] font-semibold text-[#333333]">
            what's your category
          </p>
          <select
            {...register("storeCategory")}
            className="w-full px-[15px] py-[8px] border border-[#DDDDDD] bg-white rounded-[8px] outline-none text-black"
          >
            <option value="fashion">Fashion</option>
            <option value="ecommerce">E-Commerce</option>
            <option value="cosmetics">Cosmetics</option>
            <option value="computer">Computer Products</option>
          </select>
        </label>

        <label className="flex flex-col gap-[8px]">
          <p className="text-[15px] font-semibold text-[#333333]">
            Choose your currency
          </p>
          <select
            {...register("storeCurrency")}
            className="w-full px-[15px] py-[8px] border border-[#DDDDDD] bg-white rounded-[8px] outline-none text-black"
          >
            <option value="BDT">BDT (Taka)</option>
            <option value="USD">US Dollar</option>
            <option value="EURO">Euro</option>
            <option value="SR">Soudi Riyal</option>
          </select>
        </label>

        <label className="flex flex-col gap-[8px]">
          <p className="text-[15px] font-semibold text-[#333333]">
            Store contact email
          </p>
          <input
            placeholder="you@example.com"
            type="text"
            {...register("storeEmail")}
            className={`${
              errors.storeEmail ? "border-red-500" : "border-[#DDDDDD]"
            } w-full px-[15px] py-[8px] border  bg-white rounded-[8px] outline-none text-black`}
          ></input>
          {errors?.storeEmail && (
            <p className="text-red-500 text-[13px] font-semibold">
              {errors.storeEmail.message}
            </p>
          )}
        </label>

        <button
          disabled={isLoading}
          className="w-full bg-[#1F81B9] rounded-[8px] py-[8px] text-white font-semibold text-[15px]"
          type="submit"
        >
          {isLoading ? "Creating Store..." : "Create Store"}
        </button>
      </form>
    </div>
  );
}

export default Form;
