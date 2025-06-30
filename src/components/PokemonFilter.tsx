import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Chip,
} from '@mui/material'

type Props = {
  types: string[]
  selectedTypes: string[]
  onChange: (newTypes: string[]) => void
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const PokemonFilter = ({ types, selectedTypes, onChange }: Props) => {
  return (
    <Box
      sx={{
        mb: 4,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Filtrar por tipo</InputLabel>
        <Select
          multiple
          value={selectedTypes}
          onChange={(e) => {
            const value = e.target.value
            onChange(typeof value === 'string' ? value.split(',') : value)
          }}
          input={<OutlinedInput label="Filtrar por tipo" />}
          renderValue={() => ''}
          MenuProps={MenuProps}
        >
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={selectedTypes.includes(type)} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {selectedTypes.map((type) => (
          <Chip
            key={type}
            label={type}
            onDelete={() =>
              onChange(selectedTypes.filter((t) => t !== type))
            }
            variant="outlined"
            sx={{
              bgcolor: '#f5f5f5',
              borderColor: '#ccc',
              color: 'text.primary',
              '& .MuiChip-deleteIcon': {
                color: 'text.secondary',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default PokemonFilter; 
