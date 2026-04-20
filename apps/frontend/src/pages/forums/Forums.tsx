import { Anchor } from "lucide-react";
import { Link } from "react-router-dom";

export default function Forums() {
  return (
    <div className="bg-bg-sec p-3 gap-5 border border-border flex flex-col md:flex-row items-start justify-between">
      <div className="">
        <h1 className="text-2xl font-bold">Foro de ingreso</h1>
        <p className="text-txt-sec">
          En este lugar podras visualizar todo tipo de Foros
        </p>
      </div>
      <Link to = "/papu" className="border w-full md:w-fit border-border px-5 py-2 bg-bg text-ok font-bold rounded-md flex justify-center gap-4 capitalize">
        {" "}
        <Anchor /> semen hg{" "}
      </Link>
    </div>
  );
}
