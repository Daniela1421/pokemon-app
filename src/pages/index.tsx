import {
  Container,
  CircularProgress,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Fade,
} from '@mui/material'
import { useState, useMemo } from 'react'
import { usePokemonData } from '../hooks/usePokemonData'
import { useFilteredPokemons } from '../hooks/useFilteredPokemons'
import { PokemonFull } from '../types/pokemon'
import Header from '@/components/Header'
import PokemonTable from '@/components/PokemonTable'
import PokemonGrid from '@/components/PokemonGrid'
import PokemonModal from '@/components/PokemonModal'
import PokemonFilter from '@/components/PokemonFilter'

export default function Home() {
  const { pokemons, loading, error } = usePokemonData()
  const [selected, setSelected] = useState<PokemonFull | null>(null)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [view, setView] = useState<'table' | 'grid'>('table')

  const allTypes = useMemo(() => {
    const typeSet = new Set<string>()
    pokemons.forEach((p) => {
      p.types.forEach((t) => typeSet.add(t.type.name))
    })
    return Array.from(typeSet).sort()
  }, [pokemons])

  const filteredPokemons = useFilteredPokemons(pokemons, selectedTypes)

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
        {loading && (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress color="primary" size={48} />
          </Box>
        )}
        {error && (
          <Typography color="error" align="center" mt={4}>
            {error}
          </Typography>
        )}
        {!loading && !error && (
          <Fade in timeout={500}>
            <Box>
              <Box display="flex" justifyContent="center" my={2}>
                <ToggleButtonGroup
                  value={view}
                  exclusive
                  onChange={(_, newView) => {
                    if (newView) setView(newView)
                  }}
                  size="small"
                  color="primary"
                >
                  <ToggleButton value="table">Vista en Tabla</ToggleButton>
                  <ToggleButton value="grid">Vista en Cuadrícula</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <PokemonFilter
                types={allTypes}
                selectedTypes={selectedTypes}
                onChange={setSelectedTypes}
              />
              {filteredPokemons.length === 0 ? (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 4 }}
                >
                  No se encontraron Pokémon con los tipos seleccionados.
                </Typography>
              ) : view === 'table' ? (
                <PokemonTable
                  pokemons={filteredPokemons}
                  onSelectPokemon={setSelected}
                />
              ) : (
                <PokemonGrid
                  pokemons={filteredPokemons}
                  onSelectPokemon={setSelected}
                />
              )}
              <PokemonModal
                open={!!selected}
                onClose={() => setSelected(null)}
                pokemon={selected}
              />
            </Box>
          </Fade>
        )}
      </Container>
    </>
  )
}

