import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MessageSquarePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { forumSchema } from "@proyecto_publico/schemas";
import InputForm from "../../components/InputForm";
import TextAreaForm from "../../components/TextAreaForm";
import SelectForm from "../../components/SelectForm";

type ForumFormData = z.infer<typeof forumSchema>;

const categoriasOptions = [
  { value: "Medio Ambiente", label: "Medio Ambiente" },
  { value: "Seguridad", label: "Seguridad" },
  { value: "Infraestructura", label: "Infraestructura" },
  { value: "Servicios", label: "Servicios" },
  { value: "Urbanismo", label: "Urbanismo" },
  { value: "Comunidad", label: "Comunidad" },
];

const toTitleCase = (str: string) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

const toSentenceCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());

export default function NewForum() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForumFormData>({
    resolver: zodResolver(forumSchema),
    mode: "onChange",
    defaultValues: { titulo: "", categoria: "", descripcion: "", imagen: "" },
  });

  const onSubmit = (data: ForumFormData) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center py-6">
      <section className="w-full max-w-2xl bg-bg-sec/50 border border-border rounded-md p-4">
        <h1 className="font-bold text-2xl flex items-center gap-3">
          <Link to="/forums" className="text-txt-sec hover:text-accent transition-colors">
            <ArrowLeft />
          </Link>
          Crear un Foro
        </h1>
        <p className="text-txt-sec py-3">
          Ingresa los siguientes datos para crear un foro.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 bg-bg border border-border px-4 rounded-md py-8">
          <InputForm
            label="Título del Foro"
            name="titulo"
            placeholder="Ej: Mejoras En El Parque Central"
            register={register}
            errors={errors}
            require
            onChange={(e) => {
              e.target.value = toTitleCase(e.target.value);
              register("titulo").onChange(e);
            }}
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
            onChange={(e) => {
              e.target.value = toSentenceCase(e.target.value);
              register("descripcion").onChange(e);
            }}
          />

          <InputForm
            label="URL de Imagen"
            name="imagen"
            placeholder="https://ejemplo.com/imagen.jpg"
            register={register}
            errors={errors}
            require
          />

          <button
            type="submit"
            className="mt-2 border border-border px-4 py-2 rounded-md bg-bg text-accent font-bold flex items-center justify-center gap-2 hover:bg-accent/10 transition-colors"
          >
            <MessageSquarePlus />
            Crear Foro
          </button>
        </form>
      </section>
    </div>
  );
}