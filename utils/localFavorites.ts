const toggleFavorite = (id: number):void=>{
  
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

  if( favorites.includes( id) ){
    favorites = favorites.filter( (item:number)=> item !== id)
  }else{
    favorites.push(id)
  }

  localStorage.setItem('favorites',JSON.stringify(favorites))
}

const pokemons = (): number[] => {
  return JSON.parse( localStorage.getItem('favorites') || '[]' );
}

export{
  toggleFavorite,
  pokemons
}