import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import * as surveysApi from "../api/surveys";

type SurveyOption = {
  id: string;
  texto: string;
  votes: number;
};

type Survey = {
  id: string;
  title: string;
  description: string;
  user_id: string;
  creator_name?: string | null;
  date_start?: string | null;
  date_end?: string | null;
  has_voted?: boolean;
  voted_option_id?: string | null;
  options: SurveyOption[];
};

type SurveyCommentCardProps = {
  survey: Survey;
  onRefresh: () => void;
};

export default function SurveyCommentCard({
  survey,
  onRefresh,
}: SurveyCommentCardProps) {
  const { user } = useAuth();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    survey.voted_option_id ?? null,
  );

  const [votedOptionId, setVotedOptionId] = useState<string | null>(
    survey.voted_option_id ?? null,
  );

  const [isVoting, setIsVoting] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  const isAdmin = (user as any)?.rol === "admin";
  const hasVoted = Boolean(votedOptionId || survey.has_voted);

  const shouldShowVoteForm = !isAdmin && !hasVoted;
  const shouldShowResults = isAdmin || hasVoted;

  const totalVotes = survey.options.reduce(
    (total, option) => total + option.votes,
    0,
  );

  const winner = survey.options.length
    ? survey.options.reduce((currentWinner, option) =>
        option.votes > currentWinner.votes ? option : currentWinner,
      )
    : null;

  const getPercentage = (votes: number) => {
    if (!totalVotes) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  const handleConfirmVote = async () => {
    if (!selectedOptionId || !user?.id) return;

    try {
      setIsVoting(true);
      setVoteError(null);

      await surveysApi.voteSurvey({
        surveyId: survey.id,
        option_id: selectedOptionId,
        user_id: user.id,
      });

      setVotedOptionId(selectedOptionId);

      await onRefresh();
    } catch (error) {
      console.error("Error al votar encuesta:", error);
      setVoteError("No se pudo registrar tu voto o ya votaste.");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <section className="mt-3 rounded-md border border-border bg-bg-sec p-4">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase text-accent">
          Encuesta fijada
        </p>

        <h3 className="mt-1 text-lg font-bold text-txt">{survey.title}</h3>

        <p className="mt-1 text-sm text-txt-sec">{survey.description}</p>

        <p className="mt-2 text-xs text-txt-sec">
          Creador: {survey.creator_name ?? "Sin usuario"}
        </p>
      </div>

      {isAdmin && (
        <div className="mb-4 rounded-md border border-border bg-bg p-3">
          <p className="font-bold text-accent">Vista de administrador</p>
          <p className="text-sm text-txt-sec">
            Puedes revisar los resultados sin votar.
          </p>
        </div>
      )}

      {shouldShowVoteForm && (
        <div className="mb-4 rounded-md border border-border bg-bg p-3">
          <h4 className="mb-3 font-bold text-txt-sec">Vota en esta encuesta</h4>

          <div className="space-y-2">
            {survey.options.map((option) => (
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
            disabled={!selectedOptionId || isVoting || !user?.id}
            onClick={handleConfirmVote}
            className={`mt-4 w-full rounded-md px-4 py-2 font-bold ${
              selectedOptionId && !isVoting && user?.id
                ? "cursor-pointer bg-accent text-bg"
                : "cursor-not-allowed bg-accent/20 text-txt-sec"
            }`}
          >
            {isVoting ? "Registrando voto..." : "Confirmar voto"}
          </button>

          {voteError && <p className="mt-2 text-sm text-err">{voteError}</p>}

          {!user?.id && (
            <p className="mt-2 text-sm text-err">
              Debes iniciar sesión para votar.
            </p>
          )}
        </div>
      )}

      {hasVoted && !isAdmin && (
        <div className="mb-4 rounded-md border border-accent bg-accent/10 p-3">
          <p className="font-bold text-accent">Voto registrado correctamente.</p>
          <p className="text-sm text-txt-sec">
            Tu voto quedó bloqueado y no puede modificarse.
          </p>
        </div>
      )}

      {shouldShowResults && (
        <div>
          <h4 className="mb-3 text-center font-bold text-txt-sec">
            Resultados de la encuesta
          </h4>

          <div className="space-y-3">
            {survey.options.map((option) => {
              const percentage = getPercentage(option.votes);
              const isWinner = winner?.id === option.id;

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
                    <span className={isWinner ? "font-bold text-accent" : ""}>
                      {option.texto}
                    </span>

                    <span className="text-txt-sec">
                      {option.votes} votos · {percentage}%
                    </span>
                  </div>

                  <div className="h-4 w-full overflow-hidden rounded-full border border-border bg-bg-sec">
                    <div
                      className={
                        isWinner ? "h-full bg-accent" : "h-full bg-txt-sec/40"
                      }
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md border border-border bg-bg p-3">
              <p className="font-bold">Total de votos:</p>
              <p className="text-txt-sec">{totalVotes}</p>
            </div>

            <div className="rounded-md border border-border bg-bg p-3">
              <p className="font-bold">Opción más votada:</p>
              <p className="text-txt-sec">{winner?.texto ?? "Sin votos"}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}