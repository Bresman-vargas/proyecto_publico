import { Anchor } from "lucide-react";
import { Link } from "react-router-dom";

export default function Forums() {
  return (
    <div>
      <header className="py-3 gap-5 flex flex-col md:flex-row items-start justify-between">
        <div className="">
          <h1 className="text-xl font-bold">Foros</h1>
          <p className="text-txt-sec">
            En este lugar podras visualizar todo tipo de Foros
          </p>
        </div>
        <Link
          to="/papu"
          className="border w-full md:w-fit border-border px-5 py-2 bg-bg text-ok font-bold rounded-md flex justify-center gap-4 capitalize"
        >
          {" "}
          <Anchor /> Crear un foro{" "}
        </Link>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-bg-sec p-4">
        <section className="w-full grid grid-cols-3 border-2 border-border rounded-md">
          <div className="col-span-2 bg-bg rounded-l-md p-3 flex flex-col gap-2">
            <div className="">
              <p className="text-txt-sec capitalize"> categoria</p>
              <h2 className="font-bold text-xl">
                {" "}
                Areas Verdes, Parques y conviviencia{" "}
              </h2>
            </div>
            <div className="flex gap-4 ">
              <p className="text-txt-sec"> (120 Discusiones)</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="text-sm px-4 py-1 bg-accent/10 text-accent rounded-full border border-accent/50">
                foro de comunicacion
              </div>
            </div>
            <p className="py-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis a tempora culpa. Architecto, non obcaecati
              necessitatibus numquam id adipisci minus, inventore incidunt
              nesciunt harum error ex, officia similique voluptatibus
              exercitationem.
            </p>
          </div>
          <aside className="flex flex-col justify-between ">
            {" "}
            <img
              src="https://comoli.es/wp-content/uploads/2023/12/creacion-espacios-verdes-foto.jpg"
              alt="Areas verdes"
              className="h-full object-cover bg-linear-to-t from-bg to-transparent"
            />{" "}
            <footer className="p-2 grid grid-cols-2">
              <p> Abierto </p>
              <p> Cerrado </p>
            </footer>{" "}
          </aside>
        </section>
      </section>
    </div>
  );
}
