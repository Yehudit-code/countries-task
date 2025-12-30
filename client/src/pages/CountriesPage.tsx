import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCountries, deleteCountry, importCountriesIfEmpty } from "../api/countries.api";
import CountriesDataGrid from "../components/CountriesDataGrid";
import { CircularProgress, Alert, Dialog, DialogTitle, DialogActions, Button, Stack } from "@mui/material";
import type { Country } from "../types/country";

export default function CountriesPage() {
    const queryClient = useQueryClient();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const {
        data: countries,
        isLoading,
        isError,
    } = useQuery<Country[]>({
        queryKey: ["countries"],
        queryFn: fetchCountries,
    });

    const importMutation = useMutation({
        mutationFn: importCountriesIfEmpty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["countries"] });
        },
    });


    const deleteMutation = useMutation({
        mutationFn: deleteCountry,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["countries"] });
            setSelectedId(null);
        },
    });

    if (isLoading) return <CircularProgress />;
    if (isError) return <Alert severity="error">Failed to load countries</Alert>;

    return (
        <>
            <Stack direction="row" spacing={2} mb={2}>
                <Button
                    variant="contained"
                    onClick={() => importMutation.mutate()}
                    disabled={importMutation.isPending }
                >
                    Import Countries
                </Button>
            </Stack>
            <CountriesDataGrid
                countries={countries ?? []}
                onDelete={(id) => setSelectedId(id)}
            />

            <Dialog open={!!selectedId} onClose={() => setSelectedId(null)}>
                <DialogTitle>Are you sure you want to delete this country?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setSelectedId(null)}>Cancel</Button>
                    <Button
                        color="error"
                        onClick={() => selectedId && deleteMutation.mutate(selectedId)}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


