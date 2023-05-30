import { useState, useEffect, FC } from "react";
import Image from "next/image";
import { Grid, Card, Button, Container, Text } from "@nextui-org/react";
import { toggleFavorite,showStars } from "@/utils";
import { PokemonInfo } from "@/interfaces";


interface Props{
  pokemon:PokemonInfo;
}

const PokemonDetails:FC<Props> = ({pokemon})=>{

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let favorites:number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite( favorites.includes(pokemon.id) );
  }, [pokemon]);


  const onToggle = ()=>{
    if(!isFavorite){
      showStars()
    }
    setIsFavorite(!isFavorite);
  }

  return (
    <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              <Button
                color={"gradient"}
                ghost={!isFavorite}
                onClick={() => {
                  toggleFavorite(pokemon.id);
                  onToggle();
                }}
              >
                {isFavorite ? "Borrar de favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
  )
}

export default PokemonDetails