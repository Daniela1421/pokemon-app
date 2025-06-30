import { useEffect, useState } from 'react'
import { getAllPokemonDetails} from '../services/pokemonService'
import { PokemonFull } from '../types/pokemon'

export function usePokemonData() {
  const [pokemons, setPokemons] = useState<PokemonFull[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPokemon = await getAllPokemonDetails()
        setPokemons(allPokemon)
      } catch (err) {
        setError('Hubo un error al obtener los Pokémon.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { pokemons, loading, error }
}
