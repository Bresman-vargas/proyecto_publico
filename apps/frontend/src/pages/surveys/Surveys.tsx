import { useState, useEffect } from "react";
import { CirclePlus, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as surveysApi from "../../api/surveys";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

type SurveyOption = {
  id: string;
  texto: string;
  votes: number;
};

type Survey = {
  id: string;
  title: string;
  description: string;
  user_id: string | null;
  creator_name?: string | null;
  is_active?: boolean;
  date_start?: string | null;
  date_end?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  has_voted?: boolean;
  voted_option_id?: string | null;
  options: SurveyOption[];
};

export default function Surveys() {
  const [activeTab, setActiveTab] = useState<"crear" | "vista">("crear");
  const [openSurveyId, setOpenSurveyId] = useState<string | null>(null);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.rol === "admin";

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await surveysApi.getSurveys(user?.id);
      setSurveys(data);
    } catch (err) {
      console.error("Error al cargar encuestas:", err);
      setError("No se pudieron cargar las encuestas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, [user?.id]);

  const mySurveys = surveys.filter((sur) => sur.user_id === user?.id);
  const visibleSurveys = activeTab === "crear" ? mySurveys : surveys;

  const handleEdit = (id: string) => {
    navigate(`/surveys/edit/${id}`);
  };

  const toggleSurvey = (id: string) => {
    setOpenSurveyId((currentId) => (currentId === id ? null : id));
  };

  const getTotalVotes = (options: SurveyOption[]) => {
    return options.reduce((total, option) => total + option.votes, 0);
  };

  const getOptionPercentage = (votes: number, totalVotes: number) => {
    if (!totalVotes || totalVotes <= 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  const getWinningOption = (options: SurveyOption[]) => {
    if (!options.length) return null;

    return options.reduce((winner, current) =>
      current.votes > winner.votes ? current : winner,
    );
  };

  const handleVoteSuccess = (updatedSurvey: Survey) => {
    setSurveys((currentSurveys) =>
      currentSurveys.map((survey) =>
        survey.id === updatedSurvey.id ? updatedSurvey : survey,
      ),
    );
  };

  if (loading) return <Loader className="h-[calc(100vh-8rem)]" />;

  if (error) {
    return (
      <section className="w-full rounded-md border border-border bg-bg-sec p-4">
        <p className="text-err">{error}</p>
      </section>
    );
  }

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
          className={`cursor-pointer px-4 py-2 text-sm font-medium ${
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
          <section className="flex flex-col">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-txt">
                  Crear nueva encuesta
                </h2>
                <p className="text-txt-sec">
                  Aquí puedes crear y administrar tus encuestas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 rounded-md bg-bg-sec p-4 xl:grid-cols-2">
              {visibleSurveys.length === 0 && (
                <p className="col-span-2 text-txt-sec">
                  Aún no tienes encuestas creadas.
                </p>
              )}

              {visibleSurveys.map((sur) => (
                <SurveyCard
                  key={sur.id}
                  survey={sur}
                  openSurveyId={openSurveyId}
                  canEdit={false}
                  userId={user?.id}
                  isAdmin={isAdmin}
                  onToggle={toggleSurvey}
                  onEdit={handleEdit}
                  onVoteSuccess={handleVoteSuccess}
                  getTotalVotes={getTotalVotes}
                  getOptionPercentage={getOptionPercentage}
                  getWinningOption={getWinningOption}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === "vista" && (
          <section className="flex flex-col">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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

            <div className="grid grid-cols-1 gap-8 rounded-md bg-bg-sec p-4 xl:grid-cols-2">
              {surveys.length === 0 && (
                <p className="col-span-2 text-txt-sec">
                  Aún no hay encuestas disponibles.
                </p>
              )}

              {surveys.map((sur) => (
                <SurveyCard
                  key={sur.id}
                  survey={sur}
                  openSurveyId={openSurveyId}
                  canEdit={false}
                  userId={user?.id}
                  isAdmin={isAdmin}
                  onToggle={toggleSurvey}
                  onEdit={handleEdit}
                  onVoteSuccess={handleVoteSuccess}
                  getTotalVotes={getTotalVotes}
                  getOptionPercentage={getOptionPercentage}
                  getWinningOption={getWinningOption}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

type SurveyCardProps = {
  survey: Survey;
  openSurveyId: string | null;
  canEdit: boolean;
  userId?: string;
  isAdmin: boolean;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onVoteSuccess: (updatedSurvey: Survey) => void;
  getTotalVotes: (options: SurveyOption[]) => number;
  getOptionPercentage: (votes: number, totalVotes: number) => number;
  getWinningOption: (options: SurveyOption[]) => SurveyOption | null;
};

function SurveyCard({
  survey,
  openSurveyId,
  canEdit,
  userId,
  isAdmin,
  onToggle,
  onEdit,
  onVoteSuccess,
  getTotalVotes,
  getOptionPercentage,
  getWinningOption,
}: SurveyCardProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    survey.voted_option_id ?? null,
  );

  const [votedOptionId, setVotedOptionId] = useState<string | null>(
    survey.voted_option_id ?? null,
  );
  const [isVoting, setIsVoting] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  const options = survey.options ?? [];
  const totalVotes = getTotalVotes(options);
  const winner = getWinningOption(options);

  const hasVoted = Boolean(votedOptionId || survey.has_voted);

  const shouldShowVoteForm = !isAdmin && !hasVoted;
  const shouldShowResults = isAdmin || hasVoted;

  useEffect(() => {
    setSelectedOptionId(survey.voted_option_id ?? null);
    setVotedOptionId(survey.voted_option_id ?? null);
    setVoteError(null);
  }, [survey.id, survey.voted_option_id]);

  const handleConfirmVote = async () => {
    if (!selectedOptionId || !userId) return;

    try {
      setIsVoting(true);
      setVoteError(null);

      const updatedSurvey = await surveysApi.voteSurvey({
        surveyId: survey.id,
        option_id: selectedOptionId,
        user_id: userId,
      });

      setVoteError(null);
      setSelectedOptionId(selectedOptionId);
      setVotedOptionId(selectedOptionId);
      onVoteSuccess({
        ...updatedSurvey,
        has_voted: true,
        voted_option_id: selectedOptionId,
      });
    } catch (error) {
      console.error("Error al votar:", error);
      setVoteError("No se pudo registrar tu voto o ya votaste.");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <section className="flex flex-col justify-start rounded-md text-base/9">
      <header className="rounded-t-md border-l border-r border-t border-border bg-bg p-4">
        <section className="mb-2 flex items-start justify-between gap-4">
          <h1 className="text-pretty text-xl font-bold">{survey.title}</h1>

          <div className="flex items-center gap-4">
            <span
              className="relative flex cursor-pointer items-center gap-2 text-nowrap rounded-sm border border-border bg-bg-sec px-4 font-bold text-accent"
              title="Opción más votada"
            >
              <span className="absolute -right-1 -top-1 size-3 animate-ping rounded-full bg-accent"></span>
              <span className="absolute -right-1 -top-1 size-3 rounded-full bg-accent"></span>
              Más votada: {winner?.texto ?? "Sin votos"}
            </span>

            {canEdit && (
              <button
                type="button"
                onClick={() => onEdit(survey.id)}
                className="cursor-pointer rounded-md border border-border bg-bg-sec p-2 text-txt-sec hover:text-accent"
                title="Editar registro"
              >
                <SquarePen size={20} />
              </button>
            )}
          </div>
        </section>

        <section>
          <p className="mt-2 text-base/normal text-txt-sec">
            {survey.description}
          </p>
        </section>
      </header>

      <section className="rounded-b-md border border-border bg-bg p-3">
        <button
          type="button"
          onClick={() => onToggle(survey.id)}
          className="w-full cursor-pointer rounded-md border border-border bg-bg-sec px-4 py-2 text-sm font-bold text-txt-sec hover:text-accent"
        >
          {openSurveyId === survey.id ? "Mostrar menos" : "Mostrar más"}
        </button>

        {openSurveyId === survey.id && (
          <div className="mt-4 rounded-md border border-border bg-bg-sec p-4">
            {shouldShowVoteForm && (
              <div className="mb-4 rounded-md border border-border bg-bg p-4">
                <h3 className="mb-3 font-bold text-txt-sec">
                  Vota en esta encuesta
                </h3>

                <div className="space-y-2">
                  {options.map((option) => (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 ${
                        selectedOptionId === option.id
                          ? "border-accent bg-accent/10"
                          : "border-border bg-bg-sec"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`survey-${survey.id}`}
                        value={option.id}
                        checked={selectedOptionId === option.id}
                        disabled={isVoting}
                        onChange={() => setSelectedOptionId(option.id)}
                      />

                      <span>{option.texto}</span>
                    </label>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={!selectedOptionId || isVoting || !userId}
                  onClick={handleConfirmVote}
                  className={`mt-4 w-full rounded-md px-4 py-2 font-bold ${
                    selectedOptionId && !isVoting && userId
                      ? "cursor-pointer bg-accent text-bg"
                      : "cursor-not-allowed bg-accent/20 text-txt-sec"
                  }`}
                >
                  {isVoting ? "Registrando voto..." : "Confirmar voto"}
                </button>

                {voteError && (
                  <p className="mt-2 text-sm text-err">{voteError}</p>
                )}

                {!userId && (
                  <p className="mt-2 text-sm text-err">
                    Debes iniciar sesión para votar.
                  </p>
                )}
              </div>
            )}

            {hasVoted && !isAdmin && (
              <div className="mb-4 rounded-md border border-accent bg-accent/10 p-4">
                <p className="font-bold text-accent">
                  Voto registrado correctamente.
                </p>
                <p className="text-sm text-txt-sec">
                  Tu voto quedó bloqueado y no puede modificarse.
                </p>
              </div>
            )}

            {isAdmin && (
              <div className="mb-4 rounded-md border border-border bg-bg p-4">
                <p className="font-bold text-accent">Vista de administrador</p>
                <p className="text-sm text-txt-sec">
                  Puedes revisar los resultados sin votar.
                </p>
              </div>
            )}

            {shouldShowResults && (
              <>
                <h3 className="mb-3 text-center font-bold text-txt-sec">
                  Resultados de la encuesta
                </h3>

                <div className="space-y-4">
                  {options.map((option) => {
                    const isWinner = winner?.id === option.id;
                    const percentage = getOptionPercentage(
                      option.votes,
                      totalVotes,
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
                            className={isWinner ? "font-bold text-accent" : ""}
                          >
                            {option.texto}
                          </span>

                          <span className="text-txt-sec">
                            {option.votes} votos · {percentage}%
                          </span>
                        </div>

                        <div className="h-4 w-full overflow-hidden rounded-full border border-border bg-bg-sec">
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
                    <p className="font-bold">Creador:</p>
                    <p className="text-txt-sec">
                      {survey.creator_name ?? "Sin usuario"}
                    </p>
                  </div>

                  <div className="rounded-md border border-border bg-bg p-3">
                    <p className="font-bold">Total de votos:</p>
                    <p className="text-txt-sec">{totalVotes}</p>
                  </div>

                  <div className="rounded-md border border-border bg-bg p-3">
                    <p className="font-bold">Opción más votada:</p>
                    <p className="text-txt-sec">
                      {winner?.texto ?? "Sin votos"}
                    </p>
                  </div>

                  <div className="rounded-md border border-border bg-bg p-3">
                    <p className="font-bold">Fecha emisión:</p>
                    <p className="text-txt-sec">
                      {formatDate(survey.created_at ?? survey.date_start)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </section>
  );
}

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
