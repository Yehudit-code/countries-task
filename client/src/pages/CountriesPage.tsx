import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCountries,
  deleteCountry,
  importCountriesIfEmpty,
} from "../api/countries.api";
import CountriesDataGrid from "../components/CountriesDataGrid";
import {
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Stack,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import type { Country } from "../types/country";

export default function CountriesPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false);
  const [deleteErrorOpen, setDeleteErrorOpen] = useState(false);

  // Fetch countries
  const {
    data: countries,
    isLoading,
    isError,
  } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  // Import countries (only if DB is empty)
  const importMutation = useMutation({
    mutationFn: importCountriesIfEmpty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
    },
  });

  // Delete country
  const deleteMutation = useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      setDeleteSuccessOpen(true);
      setSelectedId(null);
    },
    onError: () => {
      setDeleteErrorOpen(true);
    },
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load countries</Alert>;
  }

  return (
    <>
      {/* Action buttons */}
      <Stack direction="row" spacing={2} mb={2}>
        <Button
          variant="contained"
          onClick={() => importMutation.mutate()}
          disabled={importMutation.isPending}
        >
          Import Countries
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => navigate("/countries/new")}
        >
          Add Country
        </Button>
      </Stack>

      {/* Countries table */}
      <CountriesDataGrid
        countries={countries ?? []}
        onDelete={(id) => setSelectedId(id)}
      />

      {/* Delete confirmation dialog */}
      <Dialog open={!!selectedId} onClose={() => setSelectedId(null)}>
        <DialogTitle>
          Are you sure you want to delete this country?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setSelectedId(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={() =>
              selectedId && deleteMutation.mutate(selectedId)
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success snackbar */}
      <Snackbar
        open={deleteSuccessOpen}
        autoHideDuration={2000}
        onClose={() => setDeleteSuccessOpen(false)}
      >
        <Alert severity="success" variant="filled">
          Country deleted successfully
        </Alert>
      </Snackbar>

      {/* Error snackbar */}
      <Snackbar
        open={deleteErrorOpen}
        autoHideDuration={3000}
        onClose={() => setDeleteErrorOpen(false)}
      >
        <Alert severity="error" variant="filled">
          Failed to delete country
        </Alert>
      </Snackbar>
    </>
  );
}
