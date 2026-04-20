import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { discussion } from "@proyecto_publico/schemas";
import InputForm from "../../components/InputForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SelectForm from "../../components/SelectForm";

export default function DiscussionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(discussion),
    mode: "onChange",
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
      foro: "",
      isActive: "true",
    },
  });

  const onSubmit = (data: any) => {
    const cleanData = { ...data, isActive: data.isActive === "true" };
    console.log(cleanData);
  };

  const categoryOptions = [
    { value: "true", label: "Visble" },
    { value: "false", label: "Oculto" },
  ];

  return (
    <section className="center">
      <div className="bg-bg-sec/50 p-4 rounded-md border border-border">
        <header className="mb-8 col-span-2">
          <div className="flex  items-center gap-4">
            <Link to="/discussions" className="text-txt">
              <ArrowLeft />
            </Link>
            <h1 className="text-2xl my-2">Crear una discusión</h1>
          </div>
          <p className="text-txt-sec text-pretty md:w-8/12">
            En este formulario podrás crear tus propios discussions que la
            comunidad podrá responder o comentar.
          </p>
        </header>
        <form
          className="grid grid-cols-2 gap-x-4 bg-bg border border-border px-4 rounded-md py-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputForm
            className="col-span-2"
            label="Title"
            name="title"
            errors={errors}
            register={register}
            require={true}
          />
          <InputForm
            className="col-span-2"
            label="Subtitulo"
            name="subtitle"
            errors={errors}
            register={register}
            require={true}
          />
          <InputForm
            className="col-span-2"
            label="Detalle"
            name="content"
            errors={errors}
            register={register}
            require={true}
          />
          <InputForm
            label="Foro"
            name="foro"
            errors={errors}
            register={register}
            require={true}
          />

          <SelectForm
            label="Categoría"
            name="isActive"
            register={register}
            errors={errors}
            options={categoryOptions}
            require={true}
          />

          <div className="py-4 col-span-2">
            <button
              className={`rounded-md px-4 py-2 w-full ${
                isValid
                  ? "bg-accent cursor-pointer text-bg"
                  : "bg-accent/20 cursor-not-allowed text-txt"
              }`}
              type="submit"
              disabled={!isValid} // <-- Deshabilita si NO es válido
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
