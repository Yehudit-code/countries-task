import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  canCreate: boolean;
  onAdd: () => void;
}

export default function CountriesActions({ canCreate, onAdd }: Props) {
  if (!canCreate) return null;

  return (
    <Stack direction="row" spacing={2} mb={2} padding={2}>
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={onAdd}
      >
        Add Country
      </Button>
    </Stack>
  );
}
