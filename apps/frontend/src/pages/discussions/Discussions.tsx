import { CirclePlus, RotateCw, SquarePen } from "lucide-react";
import { Link , useNavigate} from "react-router-dom";
import { discussions } from "./HarcoDiscussions";


export default function Disscussions() {
  const navigate = useNavigate() 

  const hanleEdit = (id: string | number) => {
    navigate(`/discussions/edit/${id}`)
  }
  return (
    <section>
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-4">
        <div className="h-20 flex flex-col justify-center">
          <h1 className="font-bold text-xl">Mis Discusiones</h1>
          <p className="text-txt-sec text-pretty">
            En está parte verás todas tus discusiones y su estado.
          </p>
        </div>
        <Link
          className="text-nowrap w-full md:w-fit px-4 py-2 bg-bg-sec text-ok rounded-md font-bold border border-border flex justify-center gap-4"
          to="/discussions/new"
        >
          <CirclePlus/>
          Crear discussion
        </Link>
      </header>
      <div className="bg-bg-sec p-4 rounded-md grid grid-cols-1 xl:grid-cols-2 gap-8">
        {discussions.map((dis, index) => (
          <section
            className="rounded-md text-base/9 flex flex-col justify-start"
            key={index}
          >
            <header className="bg-bg p-4 rounded-t-md border-l border-r border-t border-border">
              <section className="flex justify-between items-center gap-4">
                <h1 className="text-xl font-bold text-pretty">{dis.title}</h1>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-nowrap relative cursor-pointer font-bold flex items-center gap-2 bg-bg-sec px-4 border border-border rounded-sm ${dis.isActive ? "text-ok" : "text-err"}`}
                  >
                    <span
                      className={`absolute -top-1 -right-1 animate-ping size-3 rounded-full ${dis.isActive ? "bg-ok" : "bg-err"}`}
                    ></span>
                    <span
                      className={`absolute -top-1 -right-1 size-3 rounded-full ${dis.isActive ? "bg-ok" : "bg-err"}`}
                    ></span>
                    <RotateCw size={15} className="hidden md:block" />
                    {dis.isActive ? "Activo" : "No activo"}
                  </span>
                  <button onClick={() => hanleEdit(dis.id)} className="hover:text-accent bg-bg-sec p-2 rounded-md border border-border text-txt-sec cursor-pointer"><SquarePen/></button>
                </div>
              </section>

              <section>
                <p className="text-txt-sec">{dis.subtitle}</p>
                <p className="text-base/normal">{dis.content}</p>
                <div className="flex flex-wrap gap-2 my-4">
                  {dis.keywords.map((word, index) => (
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
            <section className="bg-bg border border-border rounded-b-md">
              <div className="bg-bg col-span-4 text-center border-b border-border rounded-t-md font-bold text-txt-sec">
                Detalle
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 bg-bg-sec px-4 m-2 border border-border rounded-b-md">
                {/* Fila 1 */}
                <p className="font-bold text-nowrap truncate">Estado:</p>
                <p className="border-r lg:border-border border-transparent text-txt-sec text-nowrap truncate">
                  {dis.isActive ? "Activo" : "Inactivo"}
                </p>
                <p className="font-bold text-nowrap truncate">Creado:</p>
                <p className="text-txt-sec text-nowrap truncate">
                  {formatDate(dis.createdAt)}
                </p>

                {/* Fila 2 */}
                <p className="font-bold">Razón:</p>
                <p className="border-r lg:border-border border-transparent text-txt-sec truncate">
                  {dis.reason}
                </p>
                <p className="font-bold text-nowrap truncate">Editado:</p>
                <p className="text-txt-sec text-nowrap truncate">
                  {formatDate(dis.updatedAt)}
                </p>

                {/* Fila 3 */}
                <p className="font-bold text-nowrap truncate">Resuelto:</p>
                <p className="border-r lg:border-border border-transparent text-txt-sec text-nowrap truncate">
                  {formatDate(dis.resolvedAt) || "Pendiente"}
                </p>
                <p className="font-bold">Foro:</p>
                <p className="text-txt-sec text-nowrap truncate ">
                  {dis.category}
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
