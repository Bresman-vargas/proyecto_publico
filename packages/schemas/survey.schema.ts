import * as z from "zod";
const MAXTEXT = 25;
export const surveySchema = z.object({
  title: z
    .string({ required_error: "El título es requerido." })
    .trim()
    .min(1, "No puede estar vacío.")
    .max(MAXTEXT, `El título no puede tener más de ${MAXTEXT} caracteres.`),

  description: z
    .string({ required_error: "La descripción es obligatoria." })
    .trim()
    .min(1, "No puede estar vació.")
    .max(125, "Máximo 125 caracteres."),

  options: z
    .array(
      z.object({
        texto: z
          .string()
          .trim()
          .min(1, "La opción no puede estar vacía")
          .max(50, "Máximo 50 caracteres"),
      }),
    )
    .min(2, "Debes agregar al menos 2 opciones")
    .max(5, "Puedes agregar máximo 5 opciones"),

  dateStart: z.date(),

  dateEnd: z.date(),
});
