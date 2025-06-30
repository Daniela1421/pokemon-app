export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  stat: {
    name: string
  }
}

export interface PokemonFull {
  id: number
  name: string
  sprites: {
    front_default: string
    other: {
      ['official-artwork']?: {
        front_default?: string
      }
    }
  }
  types: PokemonType[]
  height: number
  weight: number
  base_experience: number
  stats: PokemonStat[]
}
