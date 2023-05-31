import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Layout } from "@/components/layouts";
import PokemonDetails from "@/components/pokemon/PokemonDetails";
import { PokemonInfo } from "@/interfaces";
import { getPokemonInfo } from "@/utils";


export const getStaticPaths: GetStaticPaths = () => {
  const pokemonsPaths = [...Array(151)].map((item, index) => {
    return { params: { id: `${index + 1}` } };
  });

  return {
    paths: pokemonsPaths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id)

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
    revalidate: 86400 //60*60*24
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
