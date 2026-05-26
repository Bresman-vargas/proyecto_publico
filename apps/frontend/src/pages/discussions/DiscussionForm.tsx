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
  const { id } = useParams();
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

  const addKeyword = () => {
    if (currentKeyword.trim() && keywords.length < 4) {
      const updatedKeywords = [...keywords, currentKeyword.trim()];
      setValue("keywords", updatedKeywords, { shouldValidate: true });
      setCurrentKeyword("");
    }
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

  if (loading) return <Loader className="h-[calc(100vh-8rem)]"/>;

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
          <InputForm
            label="Foro"
            name="forum_id"
            type="number"
            placeholder="Ej: Seguridad, Medio Ambiente, Obras"
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
                onChange={(e) => setCurrentKeyword(e.target.value)}
                placeholder="Ej: Iluminación"
                className="flex-1 p-2 bg-bg-sec border border-border rounded-md focus:outline-none focus:border-accent"
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

            <div className="flex flex-wrap gap-2">
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
            {errors.keywords && (
              <p className="text-err text-xs mt-1">{errors.keywords.message}</p>
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
