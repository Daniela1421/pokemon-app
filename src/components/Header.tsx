import { CatchingPokemon } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        py: 2,
        px: 3,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <CatchingPokemon sx={{ mr: 2, fontSize: '28px'}} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Explorador de pokémones - Primera generación
        </Typography>
      </Box>
    </Box>
  )
}

export default Header; 
