import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import InputForm from "../../components/InputForm";
import TextAreaForm from "../../components/TextAreaForm";
import { surveySchema } from "@proyecto_publico/schemas";

import { useAuth } from "../../context/AuthContext";
import * as surveysApi from "../../api/surveys";
import { createSurveyCommentRequest } from "../../api/comments";
import ButtonLoading from "../../components/ButtonLoading";

type EncuestaFormData = z.infer<typeof surveySchema>;

export default function SurveyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const discussionId = searchParams.get("discussionId");
  const [loading, setLoading] = useState(false);

  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<EncuestaFormData>({
    resolver: zodResolver(surveySchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      options: [{ texto: "" }, { texto: "" }],
      dateStart: new Date(),
      dateEnd: new Date(),
      user_id: user?.id ?? "",
      discussion_id: discussionId ?? "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  useEffect(() => {
    const emptySurvey = {
      title: "",
      description: "",
      options: [{ texto: "" }, { texto: "" }],
      dateStart: new Date(),
      dateEnd: new Date(),
      user_id: user?.id ?? "",
      discussion_id: discussionId ?? "",
    };

    if (!isEditMode || !id) {
      reset(emptySurvey);
      return;
    }

    const loadSurvey = async () => {
      try {
        setLoading(true); // 3. Activamos loader al traer los datos viejos si es edición
        const survey = await surveysApi.getSurveyId(id);

        reset({
          title: survey.title,
          description: survey.description,
          options: survey.options?.map((option: { texto: string }) => ({
            texto: option.texto,
          })) ?? [{ texto: "" }, { texto: "" }],
          dateStart: new Date(survey.date_start),
          dateEnd: new Date(survey.date_end),
          user_id: survey.user_id,
          discussion_id: survey.discussion_id ?? discussionId ?? "",
        });
      } catch (error) {
        console.error("Error al cargar encuesta:", error);
      } finally {
        setLoading(false); // 4. Desactivamos loader inicial
      }
    };

    loadSurvey();
  }, [isEditMode, id, reset, user?.id, discussionId]);

  const addOption = () => {
    if (fields.length >= 5) return;
    append({ texto: "" });
  };

  const removeOption = (index: number) => {
    if (fields.length <= 2) return;
    remove(index);
  };

  const onSubmit = async (data: EncuestaFormData) => {
    try {
      if (!user?.id) {
        console.error("No hay usuario autenticado");
        return;
      }

      setLoading(true);
      const finalDiscussionId = data.discussion_id || discussionId;

      if (isEditMode && id) {
        await surveysApi.editSurvey({
          ...data,
          id,
          user_id: user.id,
          discussion_id: finalDiscussionId ?? null,
        });

        navigate(
          finalDiscussionId ? `/comments/${finalDiscussionId}` : "/surveys",
        );
        return;
      }

      if (!finalDiscussionId) {
        console.error("Debes seleccionar una discusión para crear la encuesta");
        setLoading(false);
        return;
      }

      await createSurveyCommentRequest(finalDiscussionId, {
        title: data.title,
        description: data.description,
        options: data.options,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        user_id: user.id,
      });

      navigate(`/comments/${finalDiscussionId}`);
    } catch (error) {
      console.error("Error al guardar encuesta:", error);
      setLoading(false);
    }
  };

  return (
    <section className="center">
      <div className="bg-bg-sec/50 p-4 rounded-md border border-border">
        {loading && !isValid && (
          <div className="text-center py-4 text-accent animate-pulse">
            Cargando datos de la encuesta...
          </div>
        )}
        <header className="mb-8 col-span-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-txt bg-transparent border-0 cursor-pointer"
            >
              <ArrowLeft />
            </button>

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
          autoComplete="off"
          className="grid grid-cols-2 gap-x-4 bg-bg border border-border px-4 rounded-md py-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="hidden" {...register("discussion_id")} />

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
              className="w-full outline-0 px-4 py-1 bg-bg-sec border border-border rounded-md"
              {...register("dateStart", {
                valueAsDate: true,
              })}
            />

            <div className="h-8 flex items-center">
              {errors.dateStart && (
                <span className="text-err text-sm">
                  {errors.dateStart.message as string}
                </span>
              )}
            </div>
          </label>

          <label>
            <p className="mb-3">Fecha término</p>
            <input
              type="date"
              className="w-full outline-0 px-4 py-1 bg-bg-sec border border-border rounded-md"
              {...register("dateEnd", {
                valueAsDate: true,
              })}
            />

            <div className="h-8 flex items-center">
              {errors.dateEnd && (
                <span className="text-err text-sm">
                  {errors.dateEnd.message as string}
                </span>
              )}
            </div>
          </label>

          <section className="col-span-2 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg">Opciones de voto</h2>

              {fields.length < 5 && (
                <button
                  type="button"
                  onClick={addOption}
                  className="cursor-pointer rounded-md px-4 py-2 bg-accent text-bg"
                >
                  Agregar opción
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {fields.map((field, index) => (
                <div key={field.id}>
                  <label className="text-txt-sec flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span>
                        Opción {index + 1}:{index < 2 && " *"}
                      </span>

                      {index >= 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="cursor-pointer text-err text-sm rounded-md px-4 py-2"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>

                    <input
                      className="bg-bg-sec/40 p-2 border border-border rounded-md focus:outline-1 outline-accent/30"
                      placeholder={`Opción ${index + 1}`}
                      {...register(`options.${index}.texto`)}
                    />
                  </label>

                  <div className="h-8 flex items-center">
                    {errors.options?.[index]?.texto && (
                      <span className="text-err text-sm">
                        {errors.options[index]?.texto?.message as string}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {fields.length >= 5 && (
              <p className="text-txt-sec text-sm mt-2">
                Máximo 5 opciones permitidas.
              </p>
            )}
          </section>

          <div className="py-4 col-span-2">
            <ButtonLoading loading={loading} isValid={isValid}>
              {isEditMode ? "Editar encuesta" : "Agregar encuesta"}
            </ButtonLoading>
          </div>
        </form>
      </div>
    </section>
  );
}
