export interface PokeAPIResponse {
  count:    number;
  next?:     string;
  previous?: string;
  results:  smallPokemons[];
}

export interface smallPokemons {
  name: string;
  id: number;
  img: string;
}
