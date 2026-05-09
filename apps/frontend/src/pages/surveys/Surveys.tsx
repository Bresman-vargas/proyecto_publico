import { useState } from "react";
import { CirclePlus, SquarePen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { surveys } from "./HardcodeSurveys";

export default function Surveys() {
  const [activeTab, setActiveTab] = useState<"crear" | "vista">("crear");
  const navigate = useNavigate();
  const [openSurveyId, setOpenSurveyId] = useState<string | number | null>(
    null,
  );

  const loggedAdmin = "Vicente Mery";
  const mySurveys = surveys.filter((sur) => sur.nombreAdmin === loggedAdmin);
  const visibleSurveys = activeTab === "crear" ? mySurveys : surveys;
  //const canEdit = activeTab === "crear";
  const handleEdit = (id: string | number) => {
    navigate(`/surveys/edit/${id}`);
  };

  const toggleSurvey = (id: string | number) => {
    setOpenSurveyId((currentId) => (currentId === id ? null : id));
  };

  const getOptionPercentage = (votes: number, totalVotes: number) => {
    if (!totalVotes || totalVotes <= 0) return 0;

    return Math.round((votes / totalVotes) * 100);
  };

  const getWinningOption = (
    options: { id: string; text: string; votes: number }[],
  ) => {
    if (!options.length) return null;

    return options.reduce((winner, current) =>
      current.votes > winner.votes ? current : winner,
    );
  };

  return (
    <section className="w-full rounded-md border border-border bg-bg-sec p-4">
      <div className="mb-4 flex gap-2 border-b border-border">
        <button
          type="button"
          onClick={() => setActiveTab("crear")}
          className={`cursor-pointer px-4 py-2 text-sm font-medium ${
            activeTab === "crear"
              ? "border-b-2 border-accent text-accent"
              : "text-txt-sec hover:text-txt"
          }`}
        >
          Mis encuestas
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("vista")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "vista"
              ? "border-b-2 border-accent text-accent"
              : "text-txt-sec hover:text-txt"
          }`}
        >
          Todas las encuestas
        </button>
      </div>

      <div className="rounded-md bg-bg p-4">
        {activeTab === "crear" && (
          <div>
            <section className="flex flex-col">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-4">
                <div className="">
                  <h2 className="text-lg font-semibold text-txt">
                    Crear nueva encuesta
                  </h2>
                  <p className="text-txt-sec">
                    Aquí puedes poner el formulario para crear la encuesta.
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
                {visibleSurveys.map((sur, index) => (
                  <section
                    className="rounded-md text-base/9 flex flex-col justify-start"
                    key={index}
                  >
                    <header className="bg-bg p-4 rounded-t-md border-l border-r border-t border-border">
                      <section className="flex justify-between items-start gap-4 mb-2">
                        <h1 className="text-xl font-bold text-pretty">
                          {sur.title}
                        </h1>
                        <div className="flex items-center gap-4">
                          <span
                            className="text-nowrap relative cursor-pointer font-bold flex items-center gap-2 bg-bg-sec px-4 border border-border rounded-sm text-accent"
                            title="Opción más votada"
                          >
                            <span className="absolute -top-1 -right-1 animate-ping size-3 rounded-full bg-accent"></span>
                            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-accent"></span>
                            Más votada:{" "}
                            {getWinningOption(sur.options)?.text ?? "Sin votos"}
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

                    <section className="bg-bg border border-border rounded-b-md p-3">
                      <button
                        type="button"
                        onClick={() => toggleSurvey(sur.id)}
                        className="w-full rounded-md border border-border bg-bg-sec px-4 py-2 text-sm font-bold text-txt-sec hover:text-accent cursor-pointer"
                      >
                        {openSurveyId === sur.id
                          ? "Mostrar menos"
                          : "Mostrar más"}
                      </button>

                      {openSurveyId === sur.id && (
                        <div className="mt-4 rounded-md border border-border bg-bg-sec p-4">
                          <h3 className="mb-3 text-center font-bold text-txt-sec">
                            Resultados de la encuesta
                          </h3>

                          <div className="space-y-4">
                            {sur.options.map((option) => {
                              const winner = getWinningOption(sur.options);
                              const isWinner = winner?.id === option.id;
                              const percentage = getOptionPercentage(
                                option.votes,
                                sur.cantVotos,
                              );

                              return (
                                <div
                                  key={option.id}
                                  className={`rounded-md border p-3 ${
                                    isWinner
                                      ? "border-accent bg-accent/10"
                                      : "border-border bg-bg"
                                  }`}
                                >
                                  <div className="mb-1 flex justify-between gap-4 text-sm">
                                    <span
                                      className={
                                        isWinner ? "font-bold text-accent" : ""
                                      }
                                    >
                                      {option.text}
                                    </span>

                                    <span className="text-txt-sec">
                                      {option.votes} votos · {percentage}%
                                    </span>
                                  </div>

                                  <div className="h-4 w-full rounded-full bg-bg-sec border border-border overflow-hidden">
                                    <div
                                      className={
                                        isWinner
                                          ? "h-full bg-accent"
                                          : "h-full bg-txt-sec/40"
                                      }
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>

                                  {isWinner && (
                                    <p className="mt-2 text-sm font-bold text-accent">
                                      Opción más votada
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded-md border border-border bg-bg p-3">
                              <p className="font-bold">Administrador:</p>
                              <p className="text-txt-sec">{sur.nombreAdmin}</p>
                            </div>

                            <div className="rounded-md border border-border bg-bg p-3">
                              <p className="font-bold">Total de votos:</p>
                              <p className="text-txt-sec">{sur.cantVotos}</p>
                            </div>

                            <div className="rounded-md border border-border bg-bg p-3">
                              <p className="font-bold">Opción más votada:</p>
                              <p className="text-txt-sec">
                                {getWinningOption(sur.options)?.text ??
                                  "Sin votos"}
                              </p>
                            </div>
                            <div className="rounded-md border border-border bg-bg p-3">
                              <p className="font-bold">Fecha emisión:</p>
                              <p className="text-txt-sec">
                                {formatDate(sur.fechaVoto)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </section>
                  </section>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "vista" && (
          <div>
            <section className="flex flex-col">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-txt">
                    Todas las encuestas
                  </h2>
                  <p className="text-txt-sec">
                    Aquí puedes revisar las encuestas creadas por todos los
                    administradores.
                  </p>
                </div>
              </div>

              <div className="bg-bg-sec p-4 rounded-md grid grid-cols-1 xl:grid-cols-2 gap-8">
                {surveys.map((sur, index) => (
                  <section
                    className="rounded-md text-base/9 flex flex-col justify-start"
                    key={index}
                  >
                    <header className="bg-bg p-4 rounded-t-md border-l border-r border-t border-border">
                      <section className="flex justify-between items-start gap-4 mb-2">
                        <h1 className="text-xl font-bold text-pretty">
                          {sur.title}
                        </h1>

                        <div className="flex items-center gap-4">
                          <span
                            className="text-nowrap relative cursor-pointer font-bold flex items-center gap-2 bg-bg-sec px-4 border border-border rounded-sm text-accent"
                            title="Opción más votada"
                          >
                            <span className="absolute -top-1 -right-1 animate-ping size-3 rounded-full bg-accent"></span>
                            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-accent"></span>
                            Más votada:{" "}
                            {getWinningOption(sur.options)?.text ?? "Sin votos"}
                          </span>
                        </div>
                      </section>

                      <section>
                        <p className="text-base/normal text-txt-sec mt-2">
                          {sur.descripcionEncuesta}
                        </p>
                      </section>
                    </header>

                    <section className="bg-bg border border-border rounded-b-md p-3">
                      <button
                        type="button"
                        onClick={() => toggleSurvey(sur.id)}
                        className="w-full rounded-md border border-border bg-bg-sec px-4 py-2 text-sm font-bold text-txt-sec hover:text-accent cursor-pointer"
                      >
                        {openSurveyId === sur.id
                          ? "Mostrar menos"
                          : "Mostrar más"}
                      </button>

                      {openSurveyId === sur.id && (
                        <div className="mt-4 rounded-md border border-border bg-bg-sec p-4">
                          <h3 className="mb-3 text-center font-bold text-txt-sec">
                            Resultados de la encuesta
                          </h3>

                          <div className="space-y-4">
                            {sur.options.map((option) => {
                              const winner = getWinningOption(sur.options);
                              const isWinner = winner?.id === option.id;
                              const percentage = getOptionPercentage(
                                option.votes,
                                sur.cantVotos,
                              );

                              return (
                                <div
                                  key={option.id}
                                  className={`rounded-md border p-3 ${
                                    isWinner
                                      ? "border-accent bg-accent/10"
                                      : "border-border bg-bg"
                                  }`}
                                >
                                  <div className="mb-1 flex justify-between gap-4 text-sm">
                                    <span
                                      className={
                                        isWinner ? "font-bold text-accent" : ""
                                      }
                                    >
                                      {option.text}
                                    </span>

                                    <span className="text-txt-sec">
                                      {option.votes} votos · {percentage}%
                                    </span>
                                  </div>

                                  <div className="h-4 w-full rounded-full bg-bg-sec border border-border overflow-hidden">
                                    <div
                                      className={
                                        isWinner
                                          ? "h-full bg-accent"
                                          : "h-full bg-txt-sec/40"
                                      }
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>

                                  {isWinner && (
                                    <p className="mt-2 text-sm font-bold text-accent">
                                      Opción más votada
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded-md border border-border bg-bg p-3">
                              <p className="font-bold">Administrador:</p>
                              <p className="text-txt-sec">{sur.nombreAdmin}</p>
                            </div>

                            <div className="rounded-md border border-border bg-bg p-3">
                              <p className="font-bold">Total de votos:</p>
                              <p className="text-txt-sec">{sur.cantVotos}</p>
                            </div>

                            <div className="rounded-md border border-border bg-bg p-3">
                              <p className="font-bold">Opción más votada:</p>
                              <p className="text-txt-sec">
                                {getWinningOption(sur.options)?.text ??
                                  "Sin votos"}
                              </p>
                            </div>

                            <div className="rounded-md border border-border bg-bg p-3">
                              <p className="font-bold">Fecha emisión:</p>
                              <p className="text-txt-sec">
                                {formatDate(sur.fechaVoto)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </section>
                  </section>
                ))}
              </div>
            </section>
          </div>
        )}
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
