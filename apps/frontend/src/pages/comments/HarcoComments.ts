
export interface Comentario {
  id: string;
  content: string;
  discussion_id: string;
  user_id: string;
  parent_comment_id: string | null;
  upvotes: number;
  downvotes: number;
  created_at: string;
  updated_at: string;
  nombre_usuario: string;
  respuestas?: Comentario[];
}

export const comentariosData: Comentario[] = [
  {
    id: "c1111111-1111-1111-1111-111111111111",
    content: "Excelente artículo. Creo que el punto sobre la descentralización de los foros públicos es el más acertado para fomentar debates sanos.",
    discussion_id: "94a2c981-41ff-4d8b-a102-42377c5940ea",
    user_id: "a2026c3d-1121-4f3d-8805-cc2bdf564ec9",
    parent_comment_id: null, // Comentario raíz
    upvotes: 14,
    downvotes: 1,
    created_at: "2026-05-27T10:00:00.000Z",
    updated_at: "2026-05-27T10:00:00.000Z",
    nombre_usuario: "Bresman Vargas",
    respuestas: [
      {
        id: "c2222222-2222-2222-2222-222222222222",
        content: "Totalmente de acuerdo, Bresman. Sin embargo, ¿cómo controlarías la moderación sin caer en la censura previa?",
        discussion_id: "94a2c981-41ff-4d8b-a102-42377c5940ea",
        user_id: "e7853eda-20a1-4694-b9b1-4cb6b1c8c03f",
        parent_comment_id: "c1111111-1111-1111-1111-111111111111", // Hijo del primero
        upvotes: 6,
        downvotes: 0,
        created_at: "2026-05-27T10:15:00.000Z",
        updated_at: "2026-05-27T10:15:00.000Z",
        nombre_usuario: "Diego Alarcón",
        respuestas: [
          {
            id: "c3333333-3333-3333-3333-333333333333",
            content: "Se podría implementar un sistema de reportes comunitarios donde la misma reputación de los usuarios valide la veracidad.",
            discussion_id: "94a2c981-41ff-4d8b-a102-42377c5940ea",
            user_id: "a2026c3d-1121-4f3d-8805-cc2bdf564ec9",
            parent_comment_id: "c2222222-2222-2222-2222-222222222222", // Nieto del primero / Hijo del segundo
            upvotes: 3,
            downvotes: 0,
            created_at: "2026-05-27T10:30:00.000Z",
            updated_at: "2026-05-27T11:00:00.000Z", // Fecha simulada de edición
            nombre_usuario: "Bresman Vargas",
            respuestas: [] // Sin más respuestas
          }
        ]
      }
    ]
  }
];