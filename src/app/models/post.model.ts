export interface Post {
  /** Id del usuario */
  userId: number;
  /** Identificador único */
  id?: number;
  /** Título */
  title: string;
  /** Contenido  */
  body: string;
}