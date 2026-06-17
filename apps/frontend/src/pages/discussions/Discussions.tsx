import { Search, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type DiscussionData, HarcoDiscussions } from "./HarcoDiscussions";
import { useState, useEffect, useMemo } from "react";
import * as discussionsApi from "../../api/discussions";
import { useAuth } from "../../context/AuthContext";
import DiscussionCard from "../../components/DiscussionsCard";
import Loader from "../../components/Loader";


export default function Discussions() {
  const { user, devMode } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [discussions, setDiscussions] = useState<DiscussionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredDiscussions = useMemo(() => {
    if (!searchTerm.trim()) return discussions;

    const lowerSearch = searchTerm.toLowerCase();
    
    return discussions.filter((dis) => {
      const matchTitle = dis.title?.toLowerCase().includes(lowerSearch);
      const matchCategory = dis.category?.toLowerCase().includes(lowerSearch);
      const matchKeywords = dis.keywords?.some((word) =>
        word.toLowerCase().includes(lowerSearch)
      );
      
      return matchTitle || matchCategory || matchKeywords;
    });
  }, [searchTerm, discussions]);

  const fetchDiscussions = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const response = await discussionsApi.discussionsByUser(user.id);
      setDiscussions(response);
    } catch (err) {
      setError("No se pudieron cargar las discusiones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (devMode) {
      setDiscussions(HarcoDiscussions);
      setLoading(false);
      return;
    }
    fetchDiscussions();
  }, [user, devMode]);

  const handledEdit = (id: string) => {
    if (devMode) return;
    navigate(`/discussions/edit/${id}`);
  };

  const handledComents = (id: string) => {
    if (devMode) return;
    navigate(`/comments/${id}`);
  };

  const handledDelete = async (id: string) => {
    if (devMode) return;
    try {
      await discussionsApi.delateDiscussion(id);
      await fetchDiscussions();
    } catch (error) {
      console.error("No se pudo eliminar:", error);
    }
  };

  const handledActive = async (id: string) => {
    if (devMode) return;

    try {
      setLoading(true);
      await discussionsApi.editDiscussionState(id);
      await fetchDiscussions();
    } catch (error) {
      console.error("No se pudo alternar el estado:", error);
    }
  };

  if (loading) return <Loader className="h-[calc(100vh-8rem)]" />;

  if (error) return <div className="p-4 text-err text-center">{error}</div>;

  return (
    <section>
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-4">
        <div className="h-20 flex flex-col justify-center">
          <h1 className="font-bold text-xl">Mis Discusiones</h1>
          <p className="text-txt-sec text-pretty">
            En esta parte verás todas tus discusiones y su estado.
          </p>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full xl:w-100">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-sec"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por título, tag o categoría..."
              className="pl-10 pr-4 py-2 bg-bg-sec border border-border rounded-md w-full focus:outline-none focus:border-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>
      {filteredDiscussions.length > 0 ? (
        <div className="bg-bg-sec p-4 rounded-md grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredDiscussions.map((dis) => (
            <DiscussionCard
              key={dis.id}
              dis={dis}
              devMode={devMode}
              onActiveToggle={handledActive}
              onEdit={handledEdit}
              onDelete={handledDelete}
              onExpand={handledComents}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 bg-bg-sec px-4 m-2 border border-border rounded-b-md animate-in fade-in duration-300">
                <p className="font-bold text-nowrap truncate">Estado:</p>
                <p className="border-r lg:border-border border-transparent text-txt-sec text-nowrap truncate">
                  {dis.is_active ? "Activo" : "Inactivo"}
                </p>
                <p className="font-bold text-nowrap truncate">Creado:</p>
                <p className="text-txt-sec text-nowrap truncate">
                  {formatDate(dis.created_at)}
                </p>

                <p className="font-bold">Razón:</p>
                <p className="border-r lg:border-border border-transparent text-txt-sec truncate">
                  {dis.reason}
                </p>
                <p className="font-bold text-nowrap truncate">Editado:</p>
                <p className="text-txt-sec text-nowrap truncate">
                  {formatDate(dis.updated_at)}
                </p>

                <p className="font-bold text-nowrap truncate">Resuelto:</p>
                <p className="border-r lg:border-border border-transparent text-txt-sec text-nowrap truncate">
                  {formatDate(dis.resolvedAt) || "Pendiente"}
                </p>
                <p className="font-bold">Foro:</p>
                <p className="text-txt-sec text-nowrap truncate">
                  {dis.category}
                </p>
              </div>
            </DiscussionCard>
          ))}
        </div>
      ) : (
        <div className="bg-bg-sec rounded-md p-20 flex flex-col items-center justify-center border-2 border-border border-dashed">
          <div className="bg-accent/10 p-4 mb-4 rounded-full">
            <Lightbulb size={36} className="text-accent" />
          </div>
          <h2 className="text-xl font-bold text-txt">
            {searchTerm !== ""
              ? `No hay resultados para "${searchTerm}"`
              : "Aún no tienes discusiones"}
          </h2>

          <p className="text-txt-sec mt-2 w-100 text-center text-pretty">
            {searchTerm !== ""
              ? "Intenta ajustar los términos de búsqueda o filtros."
              : "Comienza creando tu primera discusión para interactuar con la comunidad."}
          </p>

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-6 bg-accent/80 px-8 py-2 rounded-md text-bg font-semibold hover:bg-accent cursor-pointer"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      )}
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
