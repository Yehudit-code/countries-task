import { useState } from "react";
import { useCountriesQuery } from "../hooks/useCountriesQuery";
import { useDeleteCountry } from "../hooks/useDeleteCountry";
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
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false);
  const [deleteErrorOpen, setDeleteErrorOpen] = useState(false);

  /* ---------- Fetch countries (via cache hook) ---------- */
  const {
    data: countries,
    isLoading,
    isError,
  } = useCountriesQuery();

  const safeCountries = Array.isArray(countries) ? countries : [];

  const deleteMutation = useDeleteCountry();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load countries</Alert>;
  }


  return (
    <>
      {/* Action buttons */}
      <Stack direction="row" spacing={2} mb={2} padding={2}>
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
        countries={safeCountries}
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
            onClick={() => {
              if (!selectedId) return;

              deleteMutation.mutate(selectedId, {
                onSuccess: () => {
                  setDeleteSuccessOpen(true);
                  setSelectedId(null);
                },
                onError: () => {
                  setDeleteErrorOpen(true);
                },
              });
            }}
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
