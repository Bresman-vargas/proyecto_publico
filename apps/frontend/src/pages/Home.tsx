import CardLandig from "../components/CardLandig";
import HeaderLandig from "../components/HeaderLandig";
function Home() {
  return (
    <>
      <HeaderLandig />
      <section className="h-96 bg-bg text-text">
        <div className="container h-full px-8 border-x border-border">
          <div className="flex flex-col justify-center items-center md:items-start h-full">
            <h1 className="text-3xl font-semibold text-accent text-center md:text-left">
              Santo Domingo Conecta
            </h1>
            <p className="text-txt-sec text-center md:text-left">
              Tu voz construye nuestra comuna.
            </p>
            <div className="py-4">
              <button className="bg-bg-sec px-4 py-2 rounded-md border border-border">
                Sumar mi voz
              </button>
            </div>
          </div>
        </div>
      </section>

      <main role="main">
        <section className="bg-bg border-y border-border text-text">
          <div className="container py-8 px-8 grid grid-cols-1 md:grid-cols-3 gap-5 border-x border-border">
            <CardLandig title="Debates con altura de miras.">
              <p>
                Abre hilos sobre seguridad, cultura, urbanismo o medio ambiente.
                <strong> Tu opinión importa</strong> y la comunidad la valora.
              </p>
            </CardLandig>
            <CardLandig title="Reportes en tiempo real.">
              <p>
                Informa sobre problemas de iluminación, calles en mal estado o
                aseo. <strong>Gestión directa</strong>
              </p>
            </CardLandig>
            <CardLandig title="Comunidad activa.">
              <p>
                Conecta con personas de tu mismo barrio para organizar
                actividades. <strong>Juntos hacemos más</strong> por nuestro
                sector.
              </p>
            </CardLandig>
          </div>
        </section>
      </main>
    </>
  );
}
export default Home;
