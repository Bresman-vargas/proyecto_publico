import { useForm } from "react-hook-form";
import InputForm from "../../components/InputForm";
import { registerSchema } from "@proyecto_publico/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { ArrowLeft, OctagonAlert } from "lucide-react";
export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      nombre: "",
      nombre2: "",
      apellido_paterno: "",
      apellido_materno: "",
      rut_cuerpo: undefined,
      rut_dv: "",
      email: "",
      id_region: 5,
      id_comuna: 65,
      acepta_terminos: false,
      password: "",
    },
  });

  const {
    registar,
    isAuthenticated,
    errors: registerErrors,
    clearErrors,
  } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/feed");
  }, [isAuthenticated]);

  useEffect(() => {
    clearErrors();
  }, []);

  const onSubmit = async (data: any) => {
    await registar(data);
  };
  return (
    <main className="flex justify-center md:items-center  md:h-lvh">
      <section className="bg-bg-sec/50 p-4 w-4xl rounded-md border border-border">
        <div className="flex flex-col justify-center">
          <header className="pb-8 w-11/12">
            <h2 className="text-2xl py-2 flex items-center gap-4">
              <Link to="/" className="text-txt">
                <ArrowLeft />
              </Link>
              ¡Bienvenido de nuevo!
            </h2>
            <p className="text-txt-sec text-pretty">
              ¿Ya tienes una cuenta? {""}
              <Link to="/login" className="text-accent underline">
                Inicia sesión aquí
              </Link>
            </p>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-4 gap-x-4 bg-bg px-4 pt-8 rounded-md border border-border"
          >
            <InputForm
              label="Primer Nombre"
              placeholder="Ej: Julian"
              name="nombre"
              require={true}
              register={register}
              errors={errors}
              className="col-span-4 md:col-span-2"
            />
            <InputForm
              label="Segundo Nombre"
              placeholder="Ej: Antonio"
              name="nombre2"
              require={true}
              register={register}
              errors={errors}
              className="col-span-4 md:col-span-2"
            />

            <InputForm
              label="Apellido Paterno"
              placeholder="Ej: Silva"
              name="apellido_paterno"
              require={true}
              register={register}
              errors={errors}
              className="col-span-4 md:col-span-2"
            />
            <InputForm
              label="Apellido Materno"
              placeholder="Ej: Donoso"
              name="apellido_materno"
              register={register}
              errors={errors}
              className="col-span-4 md:col-span-2"
            />
            <div className="col-span-4 md:col-span-2 grid grid-cols-3 gap-4">
              <InputForm
                label="RUT"
                placeholder="12345678"
                name="rut_cuerpo"
                require={true}
                register={register}
                errors={errors}
                className="col-span-2 md:col-span-2"
              />

              <InputForm
                label="DV"
                placeholder="K"
                name="rut_dv"
                require={true}
                register={register}
                errors={errors}
              />
            </div>
            <InputForm
              label="Correo Electrónico"
              placeholder="usuario@correo.cl"
              name="email"
              require={true}
              register={register}
              errors={errors}
              className="col-span-4 md:col-span-2"
            />
            <InputForm
              label="Contraseña"
              placeholder="******"
              type="password"
              name="password"
              require={true}
              register={register}
              errors={errors}
              className="col-span-4 md:col-span-2"
            />

            <div className="col-span-4 flex flex-col items-end py-2">
              <label className="flex items-center gap-2 cursor-pointer text-txt-sec text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-accent"
                  {...register("acepta_terminos")}
                />
                Acepto los términos y condiciones de servicio. <span>*</span>
              </label>
              <div className="h-4">
                {errors.acepta_terminos && (
                  <p className="text-err text-xs mt-1">
                    {errors.acepta_terminos.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-4  md:col-start-3 md:col-span-2 py-4">
              <button
                className={` rounded-md px-4 py-2 w-full ${
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

            <div className="h-8 col-span-4 mb-4">
              {registerErrors.length > 0 && (
                <div className="bg-err/20 p-2 rounded-md border border-err/50">
                  {registerErrors.map((error: string, i: number) => (
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
      </section>
    </main>
  );
}
