import { Flame, Hourglass, MessagesSquare } from "lucide-react";
import { comentariosData } from "./HarcoComments";

import { CommentItem } from "../../components/CommentItem";

export default function UserComments() {
  return (
    <div className="flex justify-center">
      <div className="max-w-3xl">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <div className="h-20 flex flex-col justify-center">
            <h1 className="text-xl font-bold">Mis comentarios</h1>
            <p className="text-txt-sec">
              En esta sección podrás ver tus comentarios
            </p>
          </div>
          <div className="grid grid-cols-2 md:flex gap-4">
            <button className="flex justify-center gap-2 text-txt-sec hover:text-accent cursor-pointer bg-bg border border-border px-4 py-1 rounded-md">
              <Flame /> Más famosos
            </button>
            <button className="flex justify-center gap-2 text-txt-sec hover:text-accent cursor-pointer bg-bg border border-border px-4 py-1 rounded-md">
              <Hourglass />
              Más reciente
            </button>
          </div>
        </header>

        {comentariosData.length > 0 ? (
          <section className="bg-bg-sec p-4 rounded-md grid grid-cols-1 gap-4">
            {comentariosData.map((comment) => (
              <CommentItem comment={comment} key={comment.id} />
            ))}
          </section>
        ) : (
          <div className="bg-bg-sec rounded-md p-10 flex flex-col items-center justify-center border-2 border-border border-dashed">
            <div className="bg-bg p-4 mb-4 rounded-full text-txt/30">
              <MessagesSquare size={60} />
            </div>
            <h2 className="text-xl font-bold text-txt">
              Aún no tienes comentarios
            </h2>

            <p className="text-txt-sec mt-2">
              Comienza creando tu primer comentario e interactuar con la
              comunidad.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
