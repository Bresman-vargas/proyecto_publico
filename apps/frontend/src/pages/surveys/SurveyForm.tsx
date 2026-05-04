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
      descripcionEncuesta: "",
      nombreAdmin: "",
      nombreVotante: "",
      apellidoPaternoVotante: "",
      apellidoMaternoVotante: "",
      voto: undefined,
    },
  });

  const onSubmit = (data: EncuestaFormData) => {
    console.log("Encuesta enviada:", data);
  };

  return (
    <main className="center">
      <section className="bg-bg-sec/50 p-4 border border-border rounded-md">
        <header className="mb-8 col-span-2">
          <div className="flex items-center gap-4">
            <Link to="/surveys" className="text-txt">
              <ArrowLeft />
            </Link>
            <h1 className="text-2xl my-2 text-blue-400">
              {isEditMode ? "Editar una Encuesta" : "Crear una Encuesta"}
            </h1>
          </div>
          <p className="text-txt-sec text-pretty md:w-8/12">
            {isEditMode
              ? "Modifica los campos necesarios para actualizar la información de la encuesta."
              : "Creación de la encuesta con la propuesta."}
          </p>
        </header>

        <form
          className="grid grid-cols-4 gap-x-4 px-4 pt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputForm
            label="Título de Encuesta"
            name="title"
            placeholder="Escribe el título"
            register={register}
            errors={errors}
            require={true}
            className="col-span-2"
          />

          <TextAreaForm
            label="Descripción"
            name="descripcionEncuesta"
            placeholder="Escribe la descripción"
            register={register}
            errors={errors}
            require={true}
            className="col-span-2"
          />

          <h2 className="text-blue-400 text-2xl col-span-4">
            Verificación Admin
          </h2>

          <InputForm
            label="Campo 1"
            name="nombreAdmin"
            placeholder="placeholder"
            register={register}
            errors={errors}
            require={true}
          />

          <InputForm
            label="Campo 2"
            name="adminCampo2"
            placeholder="placeholder"
            register={register}
            errors={errors}
            require={true}
          />

          <InputForm
            label="Campo 3"
            name="adminCampo3"
            placeholder="placeholder"
            register={register}
            errors={errors}
            require={true}
          />

          <InputForm
            label="Campo 4"
            name="adminCampo4"
            placeholder="placeholder"
            register={register}
            errors={errors}
          />

          <h2 className="text-blue-400 text-2xl">Voto</h2>

          <div>
            <label>
              <span>A favor</span>
              <input type="radio" value="favor" {...register("voto")} />
            </label>

            <label>
              <span>En contra</span>
              <input type="radio" value="contra" {...register("voto")} />
            </label>
          </div>

          <div>{errors.voto && <span>{errors.voto.message}</span>}</div>
        </form>
        <button
          type="submit"
          disabled={!isValid}
          className="right-full hover:text-accent bg-bg-sec p-2 rounded-md border border-border text-txt-sec cursor-pointer"
        >
          Mandar
        </button>
      </section>
    </main>
  );
}
