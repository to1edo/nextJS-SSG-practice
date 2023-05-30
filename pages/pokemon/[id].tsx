import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { PokemonInfo } from "@/interfaces";
import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import PokemonDetails from "@/components/pokemon/PokemonDetails";


export const getStaticPaths: GetStaticPaths = () => {
  const pokemonsPaths = [...Array(151)].map((item, index) => {
    return { params: { id: `${index + 1}` } };
  });

  return {
    paths: pokemonsPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<PokemonInfo>(`/pokemon/${id}`);

  const pokemon = {
    name: data.name,
    id: data.id,  
    sprites: data.sprites
  }

  return {
    props: {
      pokemon
    },
  };
};

interface Props {
  pokemon: PokemonInfo;
}
const Pokemon: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title={`Pokemon - ${pokemon.name}`}>
      <PokemonDetails pokemon={pokemon}/>
    </Layout>
  );
};

export default Pokemon;
