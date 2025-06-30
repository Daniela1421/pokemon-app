import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableSortLabel,
  Avatar,
  Chip,
  Typography,
  Box,
  Button,
  TableFooter,
  TablePagination,
} from '@mui/material'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender, SortingState, ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { PokemonFull } from '../types/pokemon'
import VisibilityIcon from '@mui/icons-material/Visibility'

interface Props {
  pokemons: PokemonFull[]
  onSelectPokemon: (pokemon: PokemonFull) => void
}

const PokemonTable = ({ pokemons, onSelectPokemon }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getStat = (p: PokemonFull, name: string) =>
    p.stats.find((s) => s.stat.name === name)?.base_stat ?? 0

  const columns: ColumnDef<PokemonFull>[] = [
    {
      header: 'Imagen',
      accessorKey: 'sprites',
      cell: ({ row }) => (
        <Box display="flex" justifyContent="center">
          <Avatar src={row.original.sprites.front_default} alt={row.original.name} />
        </Box>
      ),
      enableSorting: false,
    },
    {
      header: 'Nombre',
      accessorKey: 'name',
      cell: ({ getValue }) => (
        <Typography sx={{ fontWeight: 500 }}>
          {capitalize(getValue() as string)}
        </Typography>
      ),
    },
    {
      header: 'Tipo',
      accessorKey: 'types',
      cell: ({ row }) => (
        <Box display="flex" flexWrap="wrap" gap={0.5}>
          {row.original.types.map((t) => (
            <Chip
              key={t.slot}
              label={capitalize(t.type.name)}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      ),
      sortingFn: (a, b) => {
        const [a1 = '', a2 = ''] = a.original.types.map((t) => t.type.name)
        const [b1 = '', b2 = ''] = b.original.types.map((t) => t.type.name)

        const first = a1.localeCompare(b1)
        return first !== 0 ? first : a2.localeCompare(b2)
      },
    },
    {
      header: 'Altura (m)',
      accessorFn: (row) => (row.height / 10).toFixed(1),
      cell: ({ getValue }) => getValue(),
    },
    {
      header: 'Peso (kg)',
      accessorFn: (row) => (row.weight / 10).toFixed(1),
      cell: ({ getValue }) => getValue(),
    },
    {
      header: 'Salud base',
      accessorFn: (row) => getStat(row, 'hp'),
      cell: ({ getValue }) => <StatChip value={getValue()} />,
    },
    {
      header: 'Exp. Base',
      accessorKey: 'base_experience',
      cell: ({ getValue }) => getValue(),
    },
    {
      header: 'Ataque',
      accessorFn: (row) => getStat(row, 'attack'),
      cell: ({ getValue }) => <StatChip value={getValue()} />,
    },
    {
      header: 'Defensa',
      accessorFn: (row) => getStat(row, 'defense'),
      cell: ({ getValue }) => <StatChip value={getValue()} />,
    },
    {
      header: 'Atq. Especial',
      accessorFn: (row) => getStat(row, 'special-attack'),
      cell: ({ getValue }) => <StatChip value={getValue()} />,
    },
    {
      header: 'Def. Especial',
      accessorFn: (row) => getStat(row, 'special-defense'),
      cell: ({ getValue }) => <StatChip value={getValue()} />,
    },
    {
      header: 'Velocidad',
      accessorFn: (row) => getStat(row, 'speed'),
      cell: ({ getValue }) => <StatChip value={getValue()} />,
    },
    {
      header: 'Detalles',
      cell: ({ row }) => (
        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={() => onSelectPokemon(row.original)}
            sx={{
              bgcolor: '#f5f5f5',
              borderColor: '#ccc',
              color: 'text.primary',
            }}
          >
            Ver
          </Button>
        </Box>
      ),
      enableSorting: false,
    },
  ]

  const table = useReactTable({
    data: pokemons,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater
      setPageIndex(next.pageIndex)
      setPageSize(next.pageSize)
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 1, boxShadow: 3, overflowX: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} sx={{ backgroundColor: '#fafafa' }}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  align="center"
                  sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}
                >
                  {header.isPlaceholder ? null : (
                    <TableSortLabel
                      active={!!header.column.getIsSorted()}
                      direction={header.column.getIsSorted() === 'asc' ? 'asc' : 'desc'}
                      hideSortIcon={false}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} align="center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={pokemons.length}
              page={pageIndex}
              onPageChange={(_, newPage) => setPageIndex(newPage)}
              rowsPerPage={pageSize}
              onRowsPerPageChange={(e) => {
                setPageSize(Number(e.target.value))
                setPageIndex(0)
              }}
              rowsPerPageOptions={[10, 20, 30, 50]}
              labelRowsPerPage="Pokémon por página"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function StatChip({ value }: { value: number }) {
  let color: 'success' | 'error' | 'default' = 'default'
  if (value >= 80) color = 'success'
  else if (value < 50) color = 'error'

  return (
    <Chip
      label={value}
      size="small"
      color={color}
      sx={{ minWidth: 40, fontWeight: 500 }}
    />
  )
}

export default PokemonTable; 
