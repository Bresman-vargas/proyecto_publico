import * as z from "zod";
export const surveySchema = z.object({
  title: z
    .string({ required_error: "El título es requerido" })
    .trim()
    .min(1, "No puede estar vacío")
    .max(100, "El título no puede tener más de 100 caracteres"),

  nombreAdmin: z
    .string({ required_error: "El nombre del administrador es requerido" })
    .trim()
    .min(1, "No puede estar vacío")
    .max(50, "El nombre del administrador no puede tener más de 50 caracteres"),

  descripcionEncuesta: z
    .string()
    .trim()
    .min(1, "La descripción no puede estar vacía")
    .max(500, "La descripción no puede tener más de 500 caracteres"),

  nombreVotante: z
    .string({ required_error: "El nombre del votante es requerido" })
    .trim()
    .min(1, "No puede estar vacío")
    .max(50, "El nombre del votante no puede tener más de 50 caracteres"),

  apellidoPaternoVotante: z
    .string({ required_error: "El apellido paterno del votante es requerido" })
    .trim()
    .min(1, "No puede estar vacío")
    .max(
      50,
      "El apellido paterno del votante no puede tener más de 50 caracteres",
    ),

  apellidoMaternoVotante: z
    .string({ required_error: "El apellido paterno del votante es requerido" })
    .trim()
    .min(1, "No puede estar vacío")
    .max(
      50,
      "El apellido paterno del votante no puede tener más de 50 caracteres",
    ),

  voto: z.enum(["favor", "contra"], {
    required_error: "Debes seleccionar una opción de voto",
  }),
});
