//form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { discussionSchema } from "@proyecto_publico/schemas";
import InputForm from "../../components/InputForm";

//hooks
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
//others

import SelectForm from "../../components/SelectForm";
import ButtonLoading from "../../components/ButtonLoading";
import * as discussionsApi from "../../api/discussions";
import { ArrowLeft, Plus, X } from "lucide-react";
import Loader from "../../components/Loader";

export default function DiscussionForm() {
  const { id, forumId } = useParams();
  const isEditMode = Boolean(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentKeyword, setCurrentKeyword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError: setFormError, // <-- Añadir esto
    clearErrors: clearFormErrors, // <-- Añadir esto
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(discussionSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
      forum_id: "1",
      is_active: "0",
      keywords: [] as string[],
      user_id: user.id,
    },
  });

  const keywords = watch("keywords");

  useEffect(() => {
    if (isEditMode && id) {
      const fetchDiscussion = async () => {
        try {
          setLoading(true);
          const discussionData = await discussionsApi.getDiscussionId(id);

          reset({
            title: discussionData.title,
            subtitle: discussionData.subtitle,
            content: discussionData.content,
            forum_id: String(discussionData.forum_id),
            is_active: String(discussionData.is_active),
            keywords: discussionData.keywords || [],
            user_id: discussionData.user_id,
          });
        } catch (err) {
          console.error(err);
          setError("No se pudo cargar la discusión.");
        } finally {
          setLoading(false);
        }
      };

      fetchDiscussion();
    }
  }, [isEditMode, id, reset]);

  useEffect(() => {
    if (!isEditMode && forumId) {
      setValue("forum_id", String(forumId), { shouldValidate: true });
    }
  }, [isEditMode, forumId, setValue]);

  const addKeyword = () => {
    const trimmedWord = currentKeyword.trim();

    // 1. Validar que no esté vacía
    if (!trimmedWord) {
      setFormError("keywords", {
        type: "manual",
        message: "La palabra clave no puede estar vacía",
      });
      return;
    }

    // 2. Validar el máximo de caracteres compatible con la Base de Datos
    if (trimmedWord.length > 50) {
      setFormError("keywords", {
        type: "manual",
        message: "Cada palabra clave no puede superar los 50 caracteres",
      });
      return;
    }

    // 3. Validar el máximo de elementos permitidos
    if (keywords.length >= 4) {
      setFormError("keywords", {
        type: "manual",
        message: "Máximo 4 palabras clave",
      });
      return;
    }

    // Si todo está bien, agregamos la palabra y limpiamos los errores previos de keywords
    const updatedKeywords = [...keywords, trimmedWord];
    setValue("keywords", updatedKeywords, { shouldValidate: true });
    setCurrentKeyword("");
    clearFormErrors("keywords");
  };

  const removeKeyword = (indexToRemove: number) => {
    const updatedKeywords = keywords.filter(
      (_, index) => index !== indexToRemove,
    );
    setValue("keywords", updatedKeywords, { shouldValidate: true });
  };

  const onSubmit = async (data: any) => {
    const cleanData = { ...data, id: id };

    try {
      setLoading(true);

      if (isEditMode) {
        await discussionsApi.editDiscussion(cleanData);
      } else {
        await discussionsApi.createDiscussion(cleanData);
      }
      navigate("/discussions");
    } catch (err) {
      console.error(err);
      setError("Hubo un error al guardar los cambios.");
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: "1", label: "Visble" },
    { value: "0", label: "Oculto" },
  ];

  if (loading) return <Loader className="h-[calc(100vh-8rem)]" />;

  if (error) return <div>{error}</div>;

  return (
    <section className="center">
      <div className="bg-bg-sec/50 p-4 rounded-md border border-border">
        <header className="mb-8 col-span-2">
          <div className="flex  items-center gap-4">
            <Link to="/discussions" className="text-txt">
              <ArrowLeft />
            </Link>
            <h1 className="text-2xl my-2">
              {isEditMode ? "Editar una discusión" : "Crear una discusión"}
            </h1>
          </div>
          <p className="text-txt-sec text-pretty md:w-8/12">
            {isEditMode
              ? "Modifica los campos necesarios para actualizar la información de la discusión dentro de este foro."
              : "En este formulario podrás crear tus propios discussions que la comunidad podrá responder o comentar."}
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
            placeholder="Ej: Reparación de veredas en Av. Litoral"
            errors={errors}
            register={register}
            require={true}
          />
          <InputForm
            className="col-span-2"
            label="Subtitulo"
            name="subtitle"
            placeholder="Breve resumen del problema o beneficio"
            errors={errors}
            register={register}
            require={true}
          />
          <InputForm
            className="col-span-2"
            label="Detalle"
            name="content"
            placeholder="Describe los puntos clave de tu propuesta aquí..."
            errors={errors}
            register={register}
            require={true}
          />

          <SelectForm
            label="Visibilidad"
            name="is_active"
            register={register}
            errors={errors}
            options={categoryOptions}
            require={true}
          />

          <div className="col-span-2 mb-4">
            <label className="block mb-2">Palabras Clave (Máx 4)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentKeyword}
                maxLength={52} // <-- Evita que escriban infinitamente
                onChange={(e) => {
                  setCurrentKeyword(e.target.value);
                  // Si el usuario reduce el texto a un tamaño válido, quitamos el error visual
                  if (e.target.value.trim().length <= 50) {
                    clearFormErrors("keywords");
                  }
                }}
                placeholder="Ej: Iluminación"
                className="flex-1 p-2 bg-bg-sec/40 border border-border rounded-md focus:outline focus:outline-accent/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addKeyword();
                  }
                }}
              />
              <button
                type="button"
                onClick={addKeyword}
                disabled={keywords.length >= 4 || !currentKeyword.trim()}
                className="bg-accent px-4 rounded-md text-bg disabled:opacity-50 cursor-pointer"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {keywords.map((word, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/50 text-sm"
                >
                  #{word}
                  <button
                    type="button"
                    onClick={() => removeKeyword(index)}
                    className="hover:text-err cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>

            {/* RENDERIZADO DE ERROR MEJORADO */}
            {errors.keywords && (
              <p className="text-err text-xs mt-1">
                {/* Si el error viene de Zod como un array de fallos internos, busca el mensaje interno, si no muestra el mensaje raíz */}
                {Array.isArray(errors.keywords)
                  ? errors.keywords.find((err) => err)?.message ||
                    "Alguna palabra clave no es válida"
                  : (errors.keywords.message as string)}
              </p>
            )}
          </div>

          <div className="py-4 col-span-2">
            <ButtonLoading loading={loading} isValid={isValid}>
              {isEditMode ? "Editar discusión" : "Agregar discusión"}
            </ButtonLoading>{" "}
          </div>
        </form>
      </div>
    </section>
  );
}
