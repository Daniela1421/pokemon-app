import { useMemo } from 'react'
import { PokemonFull } from '../types/pokemon'

export function useFilteredPokemons(
  pokemons: PokemonFull[],
  selectedTypes: string[]
) {
  return useMemo(() => {
    if (selectedTypes.length === 0) return pokemons

    return pokemons.filter((pokemon) =>
      pokemon.types.some((t) => selectedTypes.includes(t.type.name))
    )
  }, [selectedTypes, pokemons])
}
