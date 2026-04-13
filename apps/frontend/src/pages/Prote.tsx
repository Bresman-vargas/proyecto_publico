import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function Prote() {
  const { user, logout } = useAuth();
  return (
    <>
      <Header />
      <section className="border-b border-border">
        <div className="container border-x border-border p-4">
          <h1 className="text-xl font-bold">Ruta Protegida</h1>
          <p className="text-txt-sec">
            Esta página solo es visible para usuarios autenticados:
          </p>

          <div className="mt-4 bg-bg-sec rounded-md border border-border w-fit">
            <div className="bg-bg m-2 p-4 rounded-sm">
              <h2 className="font-semibold mb-2">Datos del Usuario:</h2>
              {user ? (
                <ul className="list-disc pl-5">
                  <li>
                    <strong className="text-accent">Nombre:</strong>{" "}
                    {user.user.nombre}
                  </li>
                  <li>
                    <strong className="text-accent">Email:</strong>{" "}
                    {user.user.email}
                  </li>
                </ul>
              ) : (
                <p>Cargando datos del usuario...</p>
              )}
            </div>
          </div>
          <div className="pt-4">
            <button
              className="bg-accent/60 px-4 py-2 rounded-md cursor-pointer"
              onClick={async () => await logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
