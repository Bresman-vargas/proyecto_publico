import { useState, useEffect } from "react";
import { Search } from "lucide-react";
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForos = async () => {
      try {
        const data = await getForumsRequest();
        setForosData(data);
      } catch (err) {
        setError("Error al cargar los foros");
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

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-3 bg-bg-sec p-4 rounded-md">
        {loading ? (
          <div className="col-span-2">
            <Loader className="h-[calc(100vh-8rem)]" />
          </div>
        ) : error ? (
          <p className="text-err col-span-2 text-center py-10">{error}</p>
        ) : forosFiltrados.length === 0 ? (
          <p className="text-txt-sec col-span-2 text-center py-10">
            No se encontraron foros para "{busqueda}"
          </p>
        ) : (
          forosFiltrados.map((foro) => (
            <Link
              to={`/forums/${foro.id}`}
              key={foro.id}
              className="h-full block"
            >
              <section className="h-full w-full grid grid-cols-1 md:grid-cols-3 border-2 border-border rounded-md overflow-hidden hover:border-accent/50 transition-colors cursor-pointer">
                <div className="col-span-2 bg-bg rounded-l-md rounded-tr-md rounded-br-md p-4 flex flex-col gap-2">
                  <div>
                    <p className="text-accent capitalize text-sm">
                      {foro.categoria}
                    </p>
                    <h2 className="font-bold text-xl">{foro.titulo}</h2>
                  </div>
                  <p className="text-txt-sec text-sm line-clamp-3">
                    {foro.descripcion}
                  </p>
                </div>
                <aside className="row-start-1 flex flex-col w-full">
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
    </div>
  );
}
