import * as z from "zod";

export const forumSchema = z.object({
  titulo: z
    .string({ required_error: "El título es requerido" })
    .trim()
    .min(1, "No puede estar vacío")
    .max(100, "El título no puede tener más de 100 caracteres"),

  categoria: z
    .string({ required_error: "La categoría es requerida" })
    .min(1, "Debes seleccionar una categoría"),

  descripcion: z
    .string({ required_error: "La descripción es requerida" })
    .trim()
    .min(1, "No puede estar vacía")
    .max(500, "La descripción no puede tener más de 500 caracteres"),

  imagen: z
    .string({ required_error: "La imagen es requerida" })
    .url("Debe ser una URL válida")
    .trim(),
});