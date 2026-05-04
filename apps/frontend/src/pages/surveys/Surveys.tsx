import { CirclePlus, SquarePen, ThumbsUp, ThumbsDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { surveys } from "./HardcodeSurveys";

export default function SurveysList() {
  const navigate = useNavigate();

  const handleEdit = (id: string | number) => {
    navigate(`/surveys/edit/${id}`);
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-4">
        <div className="h-20 flex flex-col justify-center">
          <h1 className="font-bold text-xl">Registros de Votación</h1>
          <p className="text-txt-sec text-pretty">
            En esta sección verás todas las encuestas y el registro de votos
            emitidos.
          </p>
        </div>
        <Link
          className="text-nowrap w-full md:w-fit px-4 py-2 bg-bg-sec text-ok rounded-md font-bold border border-border flex justify-center gap-4"
          to="/surveys/new"
        >
          <CirclePlus />
          Crear Encuesta
        </Link>
      </div>

      <div className="bg-bg-sec p-4 rounded-md grid grid-cols-1 xl:grid-cols-2 gap-8">
        {surveys.map((sur, index) => (
          <section
            className="rounded-md text-base/9 flex flex-col justify-start"
            key={index}
          >
            <header className="bg-bg p-4 rounded-t-md border-l border-r border-t border-border">
              <section className="flex justify-between items-start gap-4 mb-2">
                <h1 className="text-xl font-bold text-pretty">{sur.title}</h1>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-nowrap relative cursor-pointer font-bold flex items-center gap-2 bg-bg-sec px-4 border border-border rounded-sm ${
                      sur.voto === "favor" ? "text-ok" : "text-err"
                    }`}
                    title="Estado de Aprobación"
                  >
                    <span
                      className={`absolute -top-1 -right-1 animate-ping size-3 rounded-full ${
                        sur.voto === "favor" ? "bg-ok" : "bg-err"
                      }`}
                    ></span>
                    <span
                      className={`absolute -top-1 -right-1 size-3 rounded-full ${
                        sur.voto === "favor" ? "bg-ok" : "bg-err"
                      }`}
                    ></span>
                    {sur.voto === "favor" ? (
                      <ThumbsUp size={16} className="hidden md:block" />
                    ) : (
                      <ThumbsDown size={16} className="hidden md:block" />
                    )}
                    {sur.voto === "favor" ? "A Favor" : "En Contra"}
                  </span>
                  <button
                    onClick={() => handleEdit(sur.id)}
                    className=" hover:text-accent bg-bg-sec p-2 rounded-md border border-border text-txt-sec cursor-pointer"
                    title="Editar registro"
                  >
                    <SquarePen size={20} />
                  </button>
                </div>
              </section>

              <section>
                <p className="text-base/normal text-txt-sec mt-2">
                  {sur.descripcionEncuesta}
                </p>
              </section>
            </header>

            <section className="bg-bg border border-border rounded-b-md">
              <div className="bg-bg col-span-4 text-center border-b border-border rounded-t-md font-bold text-txt-sec py-1">
                Detalle del Registro
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 bg-bg-sec px-4 py-2 m-2 border border-border rounded-b-md text-sm">
                {/* Fila 1 */}
                <p className="font-bold text-nowrap truncate">Administrador:</p>
                <p className="border-r lg:border-border border-transparent text-txt-sec text-nowrap truncate pr-2">
                  {sur.nombreAdmin}
                </p>
                <p className="font-bold text-nowrap truncate pl-2 lg:pl-0">
                  Cantidad de Votos:
                </p>
                <p className="text-txt-sec text-nowrap truncate">
                  {sur.cantVotos}
                </p>

                {/* Fila 2 */}
                <p className="font-bold text-nowrap truncate">Decisión:</p>
                <p className="border-r lg:border-border border-transparent text-txt-sec truncate pr-2 capitalize">
                  {sur.voto}
                </p>
                <p className="font-bold text-nowrap truncate pl-2 lg:pl-0">
                  Fecha Emisión:
                </p>
                <p className="text-txt-sec text-nowrap truncate">
                  {formatDate(sur.fechaVoto)}
                </p>
              </div>
            </section>
          </section>
        ))}
      </div>
    </section>
  );
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
