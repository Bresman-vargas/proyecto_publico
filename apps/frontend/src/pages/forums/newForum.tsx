import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { forumSchema } from "@proyecto_publico/schemas";
import InputForm from "../../components/InputForm";
import TextAreaForm from "../../components/TextAreaForm";
import SelectForm from "../../components/SelectForm";
import { createForumRequest } from "../../api/forums";
import ButtonLoading from "../../components/ButtonLoading";
import { useState } from "react";

type ForumFormData = z.infer<typeof forumSchema>;

const categoriasOptions = [
  { value: "Medio Ambiente", label: "Medio Ambiente" },
  { value: "Seguridad", label: "Seguridad" },
  { value: "Infraestructura", label: "Infraestructura" },
  { value: "Servicios", label: "Servicios" },
  { value: "Urbanismo", label: "Urbanismo" },
  { value: "Comunidad", label: "Comunidad" },
];

export default function NewForum() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForumFormData>({
    resolver: zodResolver(forumSchema),
    mode: "onChange",
    defaultValues: { titulo: "", categoria: "", descripcion: "", imagen: "" },
  });

  const onSubmit = async (data: ForumFormData) => {
    try {
      setLoading(true);
      await createForumRequest(data);
      setLoading(false);
      navigate("/forums");
    } catch (error) {
      setLoading(false);
      console.error("Error al crear el foro:", error);
    }
  };

  return (
    <div className="flex justify-center py-6">
      <section className="w-full max-w-2xl bg-bg-sec/50 border border-border rounded-md p-4">
        <h1 className="font-bold text-2xl flex items-center gap-3">
          <Link
            to="/forums"
            className="text-txt-sec hover:text-accent transition-colors"
          >
            <ArrowLeft />
          </Link>
          Crear un Foro
        </h1>
        <p className="text-txt-sec py-3">
          Ingresa los siguientes datos para crear un foro.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 bg-bg border border-border px-4 rounded-md py-8"
        >
          <InputForm
            label="Título del Foro"
            name="titulo"
            placeholder="Ej: Mejoras En El Parque Central"
            register={register}
            errors={errors}
            require
          />

          <SelectForm
            label="Categoría"
            name="categoria"
            register={register}
            errors={errors}
            options={categoriasOptions}
            placeholder="Selecciona una categoría"
            require
          />

          <TextAreaForm
            label="Descripción"
            name="descripcion"
            placeholder="Describe el propósito del foro..."
            register={register}
            errors={errors}
            require
          />

          <InputForm
            label="URL de Imagen"
            name="imagen"
            placeholder="https://ejemplo.com/imagen.jpg"
            register={register}
            errors={errors}
            require
          />

          <div className="py-4 col-span-2">
            <ButtonLoading loading={loading} isValid={isValid}>
              {!loading ? "Agregar un foro" : "Procesando..."}
            </ButtonLoading>{" "}
          </div>
        </form>
      </section>
    </div>
  );
}
