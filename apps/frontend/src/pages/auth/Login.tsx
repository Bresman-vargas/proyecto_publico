import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, OctagonAlert } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@proyecto_publico/schemas";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import InputForm from "../../components/InputForm";
import light from "../../../public/362shots_so.png";
import dark from "../../../public/252shots_so.png";
import { useTheme } from "../../context/ThemeContext";

function Login() {
  const navigate = useNavigate();

  const {
    login,
    isAuthenticated,
    errors: loginErrors,
    clearErrors,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/feed");
  }, [isAuthenticated]);

  useEffect(() => {
    clearErrors();
  }, []);

  const onSubmit = async (data: any) => {
    await login(data);
  };

  const { theme } = useTheme();

  return (
    <main className="center h-lvh">
      <section className="bg-bg-sec p-4 w-4xl rounded-md border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <aside className="relative hidden md:flex">
            {theme === "light" ? (
              <img
                className="rounded-l-md w-full h-130 object-cover object-left"
                src={light}
                alt=""
              />
            ) : (
              <img
                className="rounded-l-md w-full h-130 object-cover object-left"
                src={dark}
                alt=""
              />
            )}
            <Link
              to="/"
              className="bg-bg absolute top-3 left-3 px-4 py-1 rounded-md flex gap-2 cursor-pointer"
            >
              <ArrowLeft />
              Back
            </Link>
          </aside>
          <div className="flex flex-col justify-center bg-bg p-8 border border-border md:rounded-r-lg">
            <header className="pb-8 w-11/12">
              <h2 className="text-2xl py-2 flex items-center gap-4">
                <Link to="/" className="text-txt md:hidden">
                  <ArrowLeft />
                </Link>
                ¡Bienvenido de nuevo!
              </h2>
              <p className="text-txt-sec text-pretty">
                ¿No tienes una cuenta? {""}
                <Link to="/register" className="text-accent underline">
                  Crea una nueva cuenta
                </Link>
                , es <strong>GRATIS</strong> y toma menos de 2 minutos.
              </p>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputForm
                label="Email"
                placeholder="Prueba@Prueba.cl"
                name="email"
                require={true}
                register={register}
                errors={errors}
              />
              <InputForm
                label="Password"
                placeholder="******"
                name="password"
                type="password"
                require={true}
                register={register}
                errors={errors}
              />

              <div className="py-4">
                <button
                  className={`rounded-md px-4 py-2 w-full ${
                    isValid
                      ? "bg-accent cursor-pointer text-bg"
                      : "bg-accent/20 cursor-not-allowed text-txt"
                  }`}
                  type="submit"
                  disabled={!isValid} // <-- Deshabilita si NO es válido
                >
                  Submit
                </button>
              </div>

              <div className="h-8">
                {loginErrors.length > 0 && (
                  <div className="bg-err/20 p-2 rounded-md border border-err/50">
                    {loginErrors.map((error: string, i: number) => (
                      <div
                        className="flex items-center justify-center gap-2"
                        key={i}
                      >
                        <OctagonAlert />
                        <p key={i}>{error}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
