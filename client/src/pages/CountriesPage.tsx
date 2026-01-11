import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
} from "@mui/material";

import { useCountriesQuery } from "../hooks/useCountriesQuery";
import { useDeleteCountry } from "../hooks/useDeleteCountry";
import { authUserState } from "../store/auth.store";

import CountriesDataGrid from "../components/CountriesDataGrid";
import { CountryCities } from "../components/cities/CountryCities";
import CountriesActions from "../components/countries/CountriesActions";
import DeleteCountryDialog from "../components/countries/DeleteCountryDialog";

export default function CountriesPage() {
  const navigate = useNavigate();
  const user = useRecoilValue(authUserState);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openCitiesCountryId, setOpenCitiesCountryId] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const { data, isLoading, isError } = useCountriesQuery();
  const deleteMutation = useDeleteCountry();

  const countries = Array.isArray(data) ? data : [];

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Failed to load countries</Alert>;

  return (
    <>
      {/* Action buttons */}
      <CountriesActions
        canCreate={!!user?.permissions.create}
        onAdd={() => navigate("/countries/new")}
      />

      {/* Countries table */}
      <CountriesDataGrid
        countries={countries}
        canDelete={!!user?.permissions.delete}
        canUpdate={!!user?.permissions.update}
        onDelete={(id) => setSelectedId(id)}
        onShowCities={(id) => setOpenCitiesCountryId(id)}
      />

      {/* Cities dialog */}
      <Dialog
        open={Boolean(openCitiesCountryId)}
        onClose={() => setOpenCitiesCountryId(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cities</DialogTitle>
        <DialogContent>
          {openCitiesCountryId && (
            <CountryCities countryId={openCitiesCountryId} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <DeleteCountryDialog
        open={!!selectedId}
        onCancel={() => setSelectedId(null)}
        onConfirm={() => {
          if (!selectedId) return;
          deleteMutation.mutate(selectedId, {
            onSuccess: () => {
              setSuccessOpen(true);
              setSelectedId(null);
            },
            onError: () => setErrorOpen(true),
          });
        }}
      />

      {/* Snackbars */}
      <Snackbar
        open={successOpen}
        autoHideDuration={2000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Country deleted successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" variant="filled">
          Failed to delete country
        </Alert>
      </Snackbar>
    </>
  );
}
