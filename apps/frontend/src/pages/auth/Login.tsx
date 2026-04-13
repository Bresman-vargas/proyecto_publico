import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@proyecto_publico/schemas";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import InputForm from "../../components/InputForm";

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
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
    if (isAuthenticated) navigate("/prote");
  }, [isAuthenticated]);

  const onSubmit = async (data: any) => {
    await login(data);
  };

  return (
    <main className="center h-lvh">
      <section className="bg-bg-sec p-4 w-4xl rounded-md">
        <div className="grid grid-cols-2 gap-8">
          <aside className="relative">
            <img
              className="rounded-md"
              src="https://placehold.co/600x600"
              alt=""
            />
            <div
              className="absolute top-3 left-3 bg-bg-sec px-4 py-1 rounded-md flex gap-2 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
              Back
            </div>
          </aside>
          <div className="flex flex-col justify-center">
            <header className="pb-8 w-11/12">
              <h2 className="text-2xl py-2">¡Bienvenido de nuevo!</h2>
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
                register={register}
                errors={errors}
              />
              <InputForm
                label="Password"
                placeholder="******"
                name="password"
                type="password"
                register={register}
                errors={errors}
              />

              <div className="py-4">
                <button
                  className={`rounded-md px-4 py-2 w-full ${
                    isValid
                      ? "bg-accent cursor-pointer text-zinc-50"
                      : "bg-accent/20 cursor-not-allowed text-txt"
                  }`}
                  type="submit"
                  disabled={!isValid} // <-- Deshabilita si NO es válido
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
