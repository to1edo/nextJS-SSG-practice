import { GetStaticProps, NextPage } from "next"
import { Layout } from "@/components/layouts";
import { pokeApi } from "@/api";
import { PokeAPIResponse, smallPokemons } from "@/interfaces";
import { Grid } from '@nextui-org/react';
import { PokemonCard } from "@/components/pokemon";

export const getStaticProps: GetStaticProps = async(ctx)=> {
  const {data} = await pokeApi.get<PokeAPIResponse>('/pokemon?limit=151')

  const pokemons:smallPokemons[] = data.results.map( (pokemon,index) =>{
    pokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`
    pokemon.id = index+1
    return {img:pokemon.img, id:pokemon.id, name: pokemon.name}
  })

  return {
    props:{
      pokemons
    }
  }
}

interface Props{
  pokemons: smallPokemons[]
}

const Home:NextPage<Props> = ({pokemons})=> {

  return (
    <Layout title='Listado de Pokémons'>
      
      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map( ( pokemon ) => (
            <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
          ))
        }
      </Grid.Container>

    </Layout>
  )
}

export default Home
