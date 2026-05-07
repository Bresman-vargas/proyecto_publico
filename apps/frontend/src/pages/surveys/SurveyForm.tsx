import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import InputForm from "../../components/InputForm";
import TextAreaForm from "../../components/TextAreaForm";
import { surveySchema } from "@proyecto_publico/schemas";

type EncuestaFormData = z.infer<typeof surveySchema>;

export default function SurveyForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EncuestaFormData>({
    resolver: zodResolver(surveySchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      dateStart: new Date(),
      dateEnd: new Date(),
    },
  });

  const onSubmit = (data: EncuestaFormData) => {
    console.log("Encuesta enviada:", data);
  };
  return (
    <section className="center">
      <div className="bg-bg-sec/50 p-4 rounded-md border border-border">
        <header className="mb-8 col-span-2">
          <div className="flex  items-center gap-4">
            <Link to="/surveys" className="text-txt">
              <ArrowLeft />
            </Link>
            <h1 className="text-2xl my-2">
              {isEditMode ? "Editar una encuesta" : "Crear una encuesta"}
            </h1>
          </div>
          <p className="text-txt-sec text-pretty md:w-8/12">
            {isEditMode
              ? "Modifica los campos necesarios para actualizar la información de la encuesta dentro de este foro."
              : "En este formulario podrás crear tus propias encuestas que la comunidad podrá votar y decidir."}
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
            placeholder=""
            errors={errors}
            register={register}
            require={true}
          />
          <TextAreaForm
            className="col-span-2"
            label="Description"
            name="description"
            placeholder=""
            errors={errors}
            register={register}
            require={true}
          />
          <label>
            <p className="mb-3">Fecha inicio</p>
            <input
              type="date"
              name=""
              id=""
              className="w-full outline-0 px-4 py-1 bg-bg-sec border border-border rounded-md"
            />
          </label>

          <label>
            <p className="mb-3">Fecha término</p>
            <input
              type="date"
              name=""
              id=""
              className="w-full outline-0 px-4 py-1 bg-bg-sec border border-border rounded-md"
            />
          </label>
          <div className="py-4 col-span-2">
            <button
              className={`rounded-md px-4 py-2 w-full ${
                isValid
                  ? "bg-accent cursor-pointer text-bg"
                  : "bg-accent/20 cursor-not-allowed text-txt"
              }`}
              type="submit"
              disabled={!isValid}
            >
              {isEditMode ? "Editar encuesta" : "Agregar encuesta"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
