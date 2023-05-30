import { useEffect, useState } from 'react';

import { Layout } from '../../components/layouts';
import { NoFavorites } from '../../components/ui';
import { FavoritePokemons } from '../../components/pokemon';
import { pokemons } from '../../utils';

const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons( pokemons() );
  }, []);
  

  return (
      <Layout title='Pokémons - Favoritos'>
        
        {
          favoritePokemons.length === 0 
            ? ( <NoFavorites /> )
            : ( <FavoritePokemons pokemons={favoritePokemons} /> )
              }
      
      </Layout>
  )
};

export default FavoritesPage;