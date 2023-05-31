import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { PokemonInfo,PokeAPIResponse } from "@/interfaces";
import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import PokemonDetails from "@/components/pokemon/PokemonDetails";
import { getPokemonInfo } from "@/utils";

export const getStaticPaths: GetStaticPaths = async() => {

  const { data } = await pokeApi.get<PokeAPIResponse>(`/pokemon?limit=151`);

  const pokemonsPaths = data.results.map( item => {
    return { params: { name: item.name } };
  });

  return {
    paths: pokemonsPaths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  
  const pokemon = await getPokemonInfo(name)

  if(!pokemon){
    return{
      redirect:{
        destination: '/',
        permanent: false
      }
    }
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
const PokemonByName: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title={`Pokemon - ${pokemon.name}`}>
      <PokemonDetails pokemon={pokemon}/>
    </Layout>
  );
};

export default PokemonByName;
