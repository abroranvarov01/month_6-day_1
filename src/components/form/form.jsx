import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Некорректный email"),
});

function Form({ onAddUser, currentUser, updateUser }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (currentUser) {
      setValue("name", currentUser.name);
      setValue("email", currentUser.email);
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data) => {
    if (currentUser) {
      updateUser({ ...currentUser, ...data });
      reset();
    } else {
      try {
        const response = await axios.post("http://localhost:3600/todos", data);
        onAddUser(response.data);
        reset();
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  return (
    <form className="mb-[50px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-[20px]">
        <label className="text-[20px] text-violet-950">Имя</label>
        <input
          className="p-[16px] border-[2px] border-violet-700 rounded-[30px] outline-none opacity-[0.5]"
          {...register("name")}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className="mb-[20px]">
        <label className="text-[20px] text-violet-950">Email</label>
        <input
          className="p-[16px] border-[2px] border-violet-700 rounded-[30px] outline-none opacity-[0.5]"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <button
        className="border-[2px] border-violet-700 rounded-[5px] p-[10px] text-[20px] text-violet-950"
        type="submit"
      >
        {currentUser ? "Обновить" : "Отправить"}
      </button>
    </form>
  );
}

export default Form;
