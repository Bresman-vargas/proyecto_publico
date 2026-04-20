import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginSchema } from "@proyecto_publico/schemas";
import InputForm from "../components/InputForm";
export default function Prueba() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="center">
      <section className="w-fit bg-bg-sec border border-border p-3">
        <h1 className="font-bold text-2xl flex items-center gap-3">
          {" "}
          <Link to="/forums">
            {" "}
            <ArrowLeft />
          </Link>{" "}
          Crea un Foro
        </h1>
        <p className="text-txt-sec">
          {" "}
          Ingresa los siguientes datos para crear un foro
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            placeholder="Ingresa nombre de Foro"
            label="email"
            name="email"
            register={register}
            errors={errors}
          />
          <InputForm
            placeholder="Ingresa nombre de Foro"
            label="password"
            name="password"
            type="password"
            register={register}
            errors={errors}
          />

            <button> semen </button>
        </form>
      </section>
    </div>
  );
}
