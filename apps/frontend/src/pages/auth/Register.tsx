import { useForm } from "react-hook-form";
import InputForm from "../../components/InputForm";
import { registerSchema } from "@proyecto_publico/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { ArrowLeft, OctagonAlert } from "lucide-react";
import ButtonLoading from "../../components/ButtonLoading";
import SelectForm from "../../components/SelectForm";
import { getRegionesRequest, getComunasByRegionRequest } from "../../api/util";

interface RegionOption {
  id: number;
  nombre: string;
}

interface ComunaOption {
  id: number;
  nombre: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [regiones, setRegiones] = useState<{ value: number; label: string }[]>(
    [],
  );
  const [comunas, setComunas] = useState<{ value: number; label: string }[]>(
    [],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
      id_region: undefined as unknown as number,
      id_comuna: undefined as unknown as number,
      acepta_terminos: false,
      password: "",
    },
  });

  const {
    registar,
    loading,
    isAuthenticated,
    errors: registerErrors,
    clearErrors,
  } = useAuth();

  // Monitoreamos el valor
  const selectedRegion = watch("id_region");

  // Cargar regiones al montar
  useEffect(() => {
    const loadRegiones = async () => {
      try {
        const res = await getRegionesRequest();
        const formattedRegiones = res.data.map((reg: RegionOption) => ({
          value: reg.id,
          label: reg.nombre,
        }));
        setRegiones(formattedRegiones);
      } catch (error) {
        console.error("Error cargando regiones:", error);
      }
    };
    loadRegiones();
  }, []);

  // Cargar comunas
  useEffect(() => {
    const loadComunas = async () => {
      if (!selectedRegion) {
        setComunas([]);
        setValue("id_comuna", undefined as unknown as number, {
          shouldValidate: true,
        });
        return;
      }
      try {
        const res = await getComunasByRegionRequest(Number(selectedRegion));
        const formattedComunas = res.data.map((com: ComunaOption) => ({
          value: com.id,
          label: com.nombre,
        }));
        setComunas(formattedComunas);
        // Reiniciamos el valor de comuna al cambiar la región
        setValue("id_comuna", undefined as unknown as number, {
          shouldValidate: true,
        });
      } catch (error) {
        console.error("Error cargando comunas:", error);
      }
    };
    loadComunas();
  }, [selectedRegion, setValue]);

  useEffect(() => {
    if (isAuthenticated) navigate("/feed");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearErrors();
  }, []);

  const onSubmit = async (data: any) => {
    // Forzamos que los ids viajen como tipo numérico hacia la API y Zod
    const payload = {
      ...data,
      id_region: Number(data.id_region),
      id_comuna: Number(data.id_comuna),
    };
    await registar(payload);
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

            {/* SELECT DE REGIONES */}
            <SelectForm
              label="Región"
              require={true}
              placeholder="Seleccione Región"
              options={regiones}
              register={register}
              errors={errors}
              className="col-span-4 md:col-span-2"
              // Interceptamos el registro nativo pasándole el tipado numérico en el cambio
              {...register("id_region", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
            />

            {/* SELECT DE COMUNAS (Deshabilitado implícitamente o controlado si no hay región) */}
            <div className="col-span-4 md:col-span-2">
              <label className="text-txt-sec flex flex-col gap-2">
                <div className="flex gap-1">
                  Comuna:<span className="text-txt-sec">*</span>
                </div>
                <select
                  disabled={!selectedRegion}
                  className={`bg-bg-sec/40 p-2 border border-border rounded-md focus:outline-1 outline-accent/30 cursor-pointer appearance-none ${
                    !selectedRegion ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  {...register("id_comuna", {
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-bg">
                    {!selectedRegion
                      ? "Primero seleccione una región"
                      : "Seleccione Comuna"}
                  </option>
                  {comunas.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-bg-sec text-txt-sec"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="h-8 flex items-center">
                {errors.id_comuna && (
                  <span className="text-err text-sm">
                    {errors.id_comuna?.message as string}
                  </span>
                )}
              </div>
            </div>

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
              <ButtonLoading loading={loading} isValid={isValid}>
                Registrar
              </ButtonLoading>
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
