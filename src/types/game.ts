// Interface para game básico (usado na listagem)
export interface Game {
  id: number;
  title: string;
  year: number;
  imgUrl: string;
  shortDescription: string;
}

// Interface para game detalhado (usado na página individual)
export interface GameDetail {
  id: number;
  title: string;
  year: number;
  genre: string;
  platforms: string;
  score: number;
  imgUrl: string;
  shortDescription: string;
  longDescription: string;
}
