"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaSearch } from "react-icons/fa";
import { searchSchema } from "@/validations/jobSearch";
import FormInput from "@/components/formInput/FormInput";

export default function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
  });

  function submitHandler(data) {
    console.log("Search Data:", data);
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex gap-[70px] w-full"
    >
      <div className="relative flex-grow">
        <FormInput
          name="jobTitle"
          register={register}
          error={errors.jobTitle?.message}
          placeholder="المسمى الوظيفي (كلمات مفتاحية)"
          icon={<FaSearch className="w-[30px] h-[30px] " />}
          inpClassName="text-[22px] ps-[50px]"
          spaceBlock={false}
        />
      </div>
      <div className="relative flex-grow">
        <FormInput
          name="location"
          register={register}
          error={errors.location?.message}
          placeholder="الموقع الجغرافي"
          icon={<FaSearch className="w-[30px] h-[30px] " />}
          inpClassName="text-[22px] ps-[50px] placeholder-[#C7C7C7]"
          spaceBlock={false}
        />
      </div>
      <button type="submit" className="btn-secondary w-[300px] rounded-[6px] ">
        بحث
      </button>
    </form>
  );
}
