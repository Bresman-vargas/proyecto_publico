import * as z from "zod";

const MAX_NUMBER = 15;
const msgMax = (n) => `Máximo ${n} caracteres`;

const optionalString = z
  .string()
  .max(MAX_NUMBER, msgMax(MAX_NUMBER))
  .nullish()
  .or(z.literal(""));

//LOGIN SCHEMA

export const loginSchema = z.object({
  email:  z
    .string({ required_error: "El email es requerido" })
    .email("Email debe ser valido"),
  password: z
    .string({ required_error: "Contraseña es requerida" })
    .min(3, "Más de 3 caracteres")
    .max(255)
})

//REGISTER SCHEMA

export const registerSchema = z.object({
  nombre: z
    .string({ required_error: "Nombre es requerido" })
    .trim()
    .min(1, "No puede estar vacío")
    .max(MAX_NUMBER, msgMax(MAX_NUMBER)),

  nombre2: optionalString,

  apellido_paterno: z
    .string({ required_error: "Apellido paterno es requerido" })
    .min(1, "No puede estar vacío")
    .max(MAX_NUMBER, msgMax(MAX_NUMBER)),

  apellido_materno: optionalString,

  rut_cuerpo: z.coerce
    .number({
      required_error: "RUT es requerido",
      invalid_type_error: "Debe ser un número",
    })
    .int()
    .positive(),

  rut_dv: z
    .string({ required_error: "Digito verificador es requerido" })
    .length(1, "Debe ser de solo un caracter")
    .transform((val) => val.toUpperCase())
    .refine((val) => /^[0-9K]$/.test(val), "DV inválido"),

  email: z
    .string({ required_error: "El email es requerido" })
    .email("Email debe ser valido"),

  id_region: z.number().int().positive(),

  id_comuna: z.number().int().positive(),

  acepta_terminos: z
    .boolean({ required_error: "Aceptar términos es requerido" })
    .refine((val) => val === true, {
      message: "Debes aceptar los términos y condiciones para continuar",
    }),

  password: z
    .string({ required_error: "Contraseña es requerida" })
    .min(3, "Más de 3 caracteres")
    .max(255),
});
