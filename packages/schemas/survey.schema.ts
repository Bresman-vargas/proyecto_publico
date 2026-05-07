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

  option1: z
    .string({ required_error: "El título es requerido." })
    .trim()
    .min(1, "No puede estar vacío.")
    .max(MAXTEXT, `Máximo ${MAXTEXT} caracteres.`),

  option2: z
    .string({ required_error: "El título es requerido." })
    .trim()
    .min(1, "No puede estar vacío.")
    .max(MAXTEXT, `Máximo ${MAXTEXT} caracteres.`),

  option3: z.string().trim().max(MAXTEXT, `Máximo ${MAXTEXT} caracteres.`),

  option4: z
    .string({ required_error: "El título es requerido." })
    .trim()
    .min(1, "No puede estar vacío.")
    .max(MAXTEXT, `Máximo ${MAXTEXT} caracteres.`),

  option5: z
    .string({ required_error: "El título es requerido." })
    .trim()
    .min(1, "No puede estar vacío.")
    .max(MAXTEXT, `Máximo ${MAXTEXT} caracteres.`),

  dateStart: z.date(),

  dateEnd: z.date(),
});
