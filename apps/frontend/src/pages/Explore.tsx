import { useState, useEffect } from "react";
import { Megaphone, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { getForumsRequest } from "../api/forums";
import Loader from "../components/Loader";

interface ForumData {
  id: number;
  categoria: string;
  titulo: string;
  descripcion: string;
  imagen: string;
}

export default function Explore() {
  const [forosData, setForosData] = useState<ForumData[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForos = async () => {
      try {
        const data = await getForumsRequest();
        setForosData(data);
      } catch (err) {
        console.error("Error al cargar los foros", err);
      } finally {
        setLoading(false);
      }
    };
    fetchForos();
  }, []);

  const forosFiltrados = forosData.filter((foro) => {
    const texto = busqueda.toLowerCase();
    return (
      foro.titulo.toLowerCase().includes(texto) ||
      foro.categoria.toLowerCase().includes(texto) ||
      foro.descripcion.toLowerCase().includes(texto)
    );
  });

  return (
    <div>
      <header className="py-3 gap-3 flex flex-col md:flex-row items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">Explorar Foros</h1>
          <p className="text-txt-sec">
            Explora los foros disponibles y participa en las discusiones de tu
            comuna.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-sec"
          />
          <input
            type="text"
            placeholder="Buscar foro..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full border border-border bg-bg rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-12rem)]">
          <Loader className="h-[calc(100vh-8rem)]" />
        </div>
      ) : (
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-3 bg-bg-sec p-4 rounded-md">
          {forosFiltrados.length === 0 ? (
            <div className="col-span-2 bg-bg-sec rounded-md p-20 flex flex-col items-center justify-center border-2 border-border border-dashed">
              <div className="bg-accent/10 p-4 mb-4 rounded-full">
                <Megaphone size={36} className="text-accent" />
              </div>
              <h2 className="text-xl font-bold text-txt">
                {busqueda !== ""
                  ? `No hay resultados para "${busqueda}"`
                  : "Aún no hay foros creados"}
              </h2>
              <p className="text-txt-sec mt-2 max-w-md text-center text-pretty">
                {busqueda !== ""
                  ? "Intenta ajustar los términos de búsqueda o revisa que la categoría o descripción sea la correcta."
                  : "Próximamente se crearán nuevos foros donde la comunidad podrá participar activamente."}
              </p>
              {busqueda && (
                <button
                  onClick={() => setBusqueda("")}
                  className="mt-6 bg-accent px-8 py-2 rounded-md text-bg font-semibold hover:bg-accent/90 transition-colors cursor-pointer text-sm"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            forosFiltrados.map((foro) => (
              <Link
                to={`/forums/${foro.id}`}
                key={foro.id}
                className="block h-full"
              >
                <section className="h-full w-full grid grid-cols-1 md:grid-cols-3 border-2 border-border rounded-md overflow-hidden hover:border-accent/50 transition-colors cursor-pointer min-h-40">
                  <div className="col-span-2 bg-bg rounded-l-md rounded-tr-md rounded-br-md p-3 flex flex-col gap-2">
                    <div>
                      <p className="text-accent capitalize">{foro.categoria}</p>
                      <h2 className="font-bold text-xl">{foro.titulo}</h2>
                    </div>
                    <p className="py-5">{foro.descripcion}</p>
                  </div>
                  <aside className="row-start-1 flex flex-col w-full justify-between">
                    <img
                      src={foro.imagen}
                      alt={foro.titulo}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </aside>
                </section>
              </Link>
            ))
          )}
        </section>
      )}
    </div>
  );
}
