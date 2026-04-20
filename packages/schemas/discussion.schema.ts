import * as z from "zod";

const MAX_NUMBER = 30;
const msgMax = (n: number) => `Máximo ${n} caracteres`;

export const discussion = z.object({
  title: z
    .string({ required_error: "El titulo es requerido" })
    .trim()
    .max(MAX_NUMBER, msgMax(MAX_NUMBER))
    .min(3, "Más de tres caracteres"),
  subtitle: z
    .string({ required_error: "El titulo es requerido" })
    .trim()
    .max(MAX_NUMBER, msgMax(MAX_NUMBER))
    .min(3, "Más de tres caracteres"),
  content: z
    .string({ required_error: "El titulo es requerido" })
    .trim()
    .max(MAX_NUMBER * 2, msgMax(MAX_NUMBER * 2))
    .min(3, "Más de tres caracteres"),
  foro: z
    .string({ required_error: "El titulo es requerido" })
    .trim()
    .max(MAX_NUMBER, msgMax(MAX_NUMBER))
    .min(3, "Más de tres caracteres"),
  isActive: z.string({ required_error: "Visibilidad requerido" }).trim()
});
