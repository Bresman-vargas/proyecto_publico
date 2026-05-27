import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().min(1, "El contenido no puede estar vacío"),
  discussion_id: z.string().uuid("ID de discusión inválido"),
  user_id: z.string().uuid("ID de usuario inválido"),
  parent_comment_id: z.string().uuid("ID de comentario padre inválido").nullable().optional(),
});