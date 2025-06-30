import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
  Box,
} from '@mui/material'
import { PokemonFull } from '../types/pokemon'

type Props = {
  pokemons: PokemonFull[]
  onSelectPokemon: (pokemon: PokemonFull) => void
}

const PokemonGrid = ({ pokemons, onSelectPokemon }: Props) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(6, 1fr)',
        },
        gap: 2,
        mt: 3,
      }}
    >
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          sx={{
            textAlign: 'center',
            borderRadius: 2,
            boxShadow: 2,
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.03)',
              boxShadow: 4,
            },
          }}
        >
          <CardActionArea onClick={() => onSelectPokemon(pokemon)}>
            <Box sx={{ position: 'relative', pt: 2 }}>
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontWeight: 600,
                  backgroundColor: '#eee',
                  borderRadius: 1,
                  px: 1,
                }}
              >
                #{pokemon.id.toString().padStart(3, '0')}
              </Typography>
              <img
                src={
                  pokemon.sprites.other?.['official-artwork']?.front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                style={{ width: '80px', height: '80px' }}
              />
            </Box>
            <CardContent>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, textTransform: 'capitalize' }}
              >
                {pokemon.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  )
}

export default PokemonGrid
