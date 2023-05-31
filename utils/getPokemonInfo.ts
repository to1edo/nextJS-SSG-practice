import { PokemonInfo } from "@/interfaces";
import { pokeApi } from "@/api";

export const getPokemonInfo = async (idOrName:string) => {
  
  try {
    const { data } = await pokeApi.get<PokemonInfo>(`/pokemon/${idOrName}`);

    const pokemon = {
      name: data.name,
      id: data.id,  
      sprites: data.sprites
    }
    return pokemon

  } catch (error) {
    return null
  }
}