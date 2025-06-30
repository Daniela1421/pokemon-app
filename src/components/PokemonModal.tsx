import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Grid,
  LinearProgress,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PokemonFull } from "../types/pokemon";

type Props = {
  open: boolean;
  onClose: () => void;
  pokemon: PokemonFull | null;
};

const PokemonModal = ({ open, onClose, pokemon }: Props) => {
  const theme = useTheme();

  if (!pokemon) return null;

  const statColor = (value: number) => {
    if (value >= 80) return theme.palette.success.main;
    if (value < 50) return theme.palette.error.main;
    return theme.palette.grey[500];
  };

  const formatStatLabel = (label: string) => {
    switch (label) {
      case "hp":
        return "Salud";
      case "attack":
        return "Ataque";
      case "defense":
        return "Defensa";
      case "special-attack":
        return "Ataque Esp.";
      case "special-defense":
        return "Defensa Esp.";
      case "speed":
        return "Velocidad";
      default:
        return label;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="h6">
            #{pokemon.id} —{" "}
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Typography>
          <Box mt={1} display="flex" gap={1}>
            {pokemon.types.map((t) => (
              <Chip
                key={t.slot}
                label={t.type.name}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          mb={4}
        >
          <img
            src={
              pokemon.sprites.other?.["official-artwork"]?.front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            style={{ width: 140, height: 140 }}
          />
        </Box>
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Altura:
            </Typography>
            <Typography variant="body1">{pokemon.height / 10} m</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Peso:
            </Typography>
            <Typography variant="body1">{pokemon.weight / 10} kg</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Experiencia base:
            </Typography>
            <Typography variant="body1">{pokemon.base_experience}</Typography>
          </Grid>
        </Grid>
        <Typography variant="subtitle1" gutterBottom>
          Estadísticas base
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {pokemon.stats.map((stat) => {
            const value = stat.base_stat;
            const color = statColor(value);
            const label = formatStatLabel(stat.stat.name);

            return (
              <Box key={stat.stat.name}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  {label}: {value}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(value, 100)}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: theme.palette.grey[300],
                    [`& .MuiLinearProgress-bar`]: {
                      backgroundColor: color,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonModal;
