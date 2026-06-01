import { ArrowLeft, MessageSquarePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { HarcoDiscussions } from "../discussions/HarcoDiscussions";

const foro = {
  categoria: "Medio Ambiente",
  titulo: "Áreas Verdes, Parques y convivencia",
  discusiones: 120,
  abiertas: 73,
  cerradas: 47,
  descripcion:
    "Espacio para debatir sobre el cuidado de nuestros parques, propuestas para nuevas áreas verdes y normas de convivencia en espacios públicos de la comuna.",
  imagen:
    "https://comoli.es/wp-content/uploads/2023/12/creacion-espacios-verdes-foto.jpg",
};

export default function ForumDetail() {
  return (
    <div className="flex flex-col gap-4">

      {/* Banner + Avatar */}
      <div className="relative">
        <div className="w-full h-24 rounded-md bg-linear-to-r from-accent/40 to-accent/10 border border-border" />
        <Link
          to="/explore"
          className="absolute top-3 right-3 flex items-center gap-2 text-white text-sm bg-black/30 hover:bg-black/50 px-3 py-1 rounded-md transition-colors"
        >
          <ArrowLeft size={16} /> Volver
        </Link>
        <div className="absolute -bottom-16 left-6">
          <img
            src={foro.imagen}
            alt={foro.titulo}
            className="w-32 h-32 rounded-full object-cover border-4 border-bg-sec shadow-md"
          />
        </div>
      </div>

      {/* Info principal */}
      <section className="bg-bg-sec rounded-md border border-border p-6 pt-20 flex flex-col gap-4">
        <div>
          <p className="text-accent capitalize text-sm">{foro.categoria}</p>
          <h1 className="font-bold text-3xl">{foro.titulo}</h1>
        </div>
        <p className="text-txt-sec">{foro.descripcion}</p>
        <div className="flex flex-wrap gap-4 pt-2 border-t border-border">
          <div className="flex flex-col items-center bg-bg border border-border rounded-md px-6 py-3">
            <span className="font-bold text-xl">{foro.discusiones}</span>
            <span className="text-txt-sec text-sm">Discusiones</span>
          </div>
          <div className="flex flex-col items-center bg-green-500/10 border border-green-500/40 rounded-md px-6 py-3">
            <span className="font-bold text-xl text-green-600">{foro.abiertas}</span>
            <span className="text-green-600 text-sm">Abiertas</span>
          </div>
          <div className="flex flex-col items-center bg-gray-500/10 border border-gray-400/40 rounded-md px-6 py-3">
            <span className="font-bold text-xl text-gray-500">{foro.cerradas}</span>
            <span className="text-gray-500 text-sm">Cerradas</span>
          </div>
        </div>
      </section>

      {/* Sección discusiones */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Discusiones</h2>
          <Link
            to="/discussions/new"
            className="border border-border px-4 py-2 bg-bg font-bold rounded-md flex items-center gap-2 text-sm hover:bg-accent/10 transition-colors"
          >
            <MessageSquarePlus size={16} className="text-accent" />
            Nueva discusión
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {HarcoDiscussions.map((dis) => (
            <article
              key={dis.id}
              className="bg-bg-sec border border-border rounded-md p-4 flex flex-col gap-3 hover:border-accent/50 transition-colors cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base">{dis.title}</h3>
                  <p className="text-txt-sec text-sm">{dis.subtitle}</p>
                </div>
                <span
                  className={`text-nowrap text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${
                    dis.is_active
                      ? "bg-green-500/10 text-green-600 border-green-500/40"
                      : "bg-gray-500/10 text-gray-500 border-gray-400/40"
                  }`}
                >
                  ● {dis.is_active ? "Activa" : "Cerrada"}
                </span>
              </div>

              {/* Contenido */}
              <p className="text-sm text-txt line-clamp-2">{dis.content}</p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-2">
                {dis.keywords.map((word, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-0.5 bg-accent/10 text-accent rounded-full border border-accent/50"
                  >
                    #{word}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-txt-sec">
                <span>
                  Por <span className="font-semibold text-txt">{dis.nombre} {dis.apellido}</span>
                </span>
                <span>{dis.commentCount} comentarios</span>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}