import * as z from "zod";

const MAX_NUMBER = 30;
const msgMax = (n: number) => `Máximo ${n} caracteres`;

export const discussionSchema = z.object({
  title: z
    .string({ required_error: "El título es requerido" })
    .trim()
    .min(3, "Más de tres caracteres")
    .max(MAX_NUMBER, msgMax(MAX_NUMBER)),
  subtitle: z
    .string({ required_error: "El subtítulo es requerido" })
    .trim()
    .min(3, "Más de tres caracteres")
    .max(MAX_NUMBER, msgMax(MAX_NUMBER)),
  content: z
    .string({ required_error: "El contenido es requerido" })
    .trim()
    .min(3, "Más de tres caracteres")
    .max(MAX_NUMBER * 2, msgMax(MAX_NUMBER * 2)),
  forum_id: z
    .string({ required_error: "El ID del foro es requerido" })
    .min(1, "El ID del foro es requerido")
    .regex(/^\d+$/, "Debe ser un número entero válido"),
  is_active: z
    .string({ required_error: "Visibilidad requerida" })
    .refine((val) => val === "0" || val === "1", {
      message: "El valor debe ser Oculto o Visible",
    }),
  keywords: z
    .array(z.string().min(1, "La palabra clave no puede estar vacía"))
    .min(1, "Debes agregar al menos una palabra clave")
    .max(4, "Máximo 4 palabras clave"),
  user_id: z
    .string({ required_error: "El ID de usuario es requerido" })
    .uuid("El ID de usuario no es válido"),
});
