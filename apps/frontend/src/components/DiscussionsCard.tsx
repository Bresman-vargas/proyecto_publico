import { useState } from "react";
import { RotateCw, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { type DiscussionData } from "../pages/discussions/HarcoDiscussions";

interface DiscussionCardProps {
  dis: DiscussionData;
  devMode: boolean;
  onActiveToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete?: (id: string) => void;
  onExpand: (id: string) => void;
  children?: React.ReactNode;
}

export default function DiscussionCard({
  dis,
  devMode,
  onActiveToggle,
  onEdit,
  onDelete,
  onExpand,
  children,
}: DiscussionCardProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="rounded-md text-base/9 flex flex-col justify-start">
      {/* Añadimos el onExpand aquí para que responda al clic en la cabecera, pero sin afectar los botones */}
      <header
        onClick={() => onExpand(dis.id)}
        className="bg-bg p-4 rounded-t-md border-l border-r border-t border-border cursor-pointer"
      >
        <section className="flex justify-between items-center gap-4">
          <h1 className="text-xl font-bold text-pretty">{dis.title}</h1>

          {/* Al contenedor de acciones le agregamos un onClick que frena la propagación hacia el header */}
          <div
            className="flex items-start gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              onClick={() => onActiveToggle(dis.id)}
              className={`text-nowrap relative font-bold flex items-center gap-2 bg-bg-sec px-4 border border-border rounded-sm transition-all ${
                devMode ? "cursor-not-allowed opacity-75" : "cursor-pointer"
              } ${dis.is_active ? "text-ok" : "text-err"}`}
            >
              <span
                className={`absolute -top-1 -right-1 animate-ping size-3 rounded-full ${
                  dis.is_active ? "bg-ok" : "bg-err"
                }`}
              ></span>
              <span
                className={`absolute -top-1 -right-1 size-3 rounded-full ${
                  dis.is_active ? "bg-ok" : "bg-err"
                }`}
              ></span>
              <RotateCw size={15} className="hidden md:block" />
              {dis.is_active ? "Activo" : "No activo"}
            </span>

            {!devMode && (
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-2 cursor-pointer bg-bg-sec border border-border rounded-md"
                >
                  <Ellipsis size={20} className="text-txt-sec" />
                </button>

                {showOptions && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowOptions(false)}
                    />
                    <div className="absolute right-0 mt-2 w-32 bg-bg border border-border rounded-md z-50 overflow-hidden">
                      <button
                        onClick={() => {
                          onEdit(dis.id);
                          setShowOptions(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-bg-sec text-left cursor-pointer"
                      >
                        <Pencil size={14} /> Editar
                      </button>
                      <button
                        onClick={() => {
                          if (onDelete) onDelete(dis.id);
                          setShowOptions(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-err/10 text-err text-left cursor-pointer"
                      >
                        <Trash2 size={14} /> Eliminar
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        <section>
          <p className="text-txt-sec">{dis.subtitle}</p>
          <p className="text-base/normal">{dis.content}</p>
          <div className="flex flex-wrap gap-2 my-4">
            {dis.keywords.map((word: string, index: number) => (
              <div
                className="text-sm px-4 py-1 bg-accent/10 text-accent rounded-full border border-accent/50"
                key={index}
              >
                #{word}
              </div>
            ))}
          </div>
        </section>
      </header>

      {/* Contenedor del Botón de Expansión */}
      <section className="bg-bg border border-border rounded-b-md">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-bg flex items-center justify-center gap-2 py-1 border-b border-border rounded-t-md font-bold text-txt-sec hover:text-accent transition-colors cursor-pointer"
        >
          {isExpanded ? <>Ver menos</> : <>Ver más</>}
        </button>

        {isExpanded && children}
      </section>
    </section>
  );
}
