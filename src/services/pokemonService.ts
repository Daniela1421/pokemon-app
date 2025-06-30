import axios from 'axios'
import { PokemonFull } from '../types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151'

export const getAllPokemonDetails = async (): Promise<PokemonFull[]> => {
  const { data } = await axios.get(BASE_URL)

  const results = await Promise.all(
    data.results.map(async (poke: { name: string; url: string }) => {
      const response = await axios.get(poke.url)
      return response.data
    })
  )

  return results
}
