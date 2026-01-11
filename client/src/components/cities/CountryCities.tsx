import { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    IconButton,
    Stack,
    Divider,
    CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import {
    getCitiesByCountry,
    createCity,
    updateCity,
    deleteCity,
} from "../../api/cities.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    countryId: string;
    allowEdit?: boolean;
}

export const CountryCities = ({
    countryId,
    allowEdit = false,
}: Props) => {
    const queryClient = useQueryClient();

    const [newCity, setNewCity] = useState("");
    const [editCityId, setEditCityId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    // const [citiesCountryId, setCitiesCountryId] = useState<string | null>(null);


    const { data: cities = [], isLoading } = useQuery({
        queryKey: ["cities", countryId],
        queryFn: () => getCitiesByCountry(countryId),
    });

    const createMutation = useMutation({
        mutationFn: (name: string) => createCity(countryId, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cities", countryId] });
            setNewCity("");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({
            cityId,
            name,
        }: {
            cityId: string;
            name: string;
        }) => updateCity(cityId, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cities", countryId] });
            setEditCityId(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (cityId: string) => deleteCity(cityId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cities", countryId] });
        },
    });

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={3}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Card sx={{ mt: 4 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Cities
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Stack spacing={1.5}>
                    {cities.map((city: any) => (
                        <Box
                            key={city._id}
                            px={1}
                            py={0.5}
                            borderRadius={1}
                            sx={{
                                "&:hover": {
                                    backgroundColor: allowEdit
                                        ? "action.hover"
                                        : "transparent",
                                },
                            }}
                        >
                            {editCityId === city._id ? (
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <TextField
                                        size="small"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                    />

                                    <IconButton
                                        color="success"
                                        onClick={() =>
                                            updateMutation.mutate({
                                                cityId: city._id,
                                                name: editName,
                                            })
                                        }
                                        disabled={!editName}
                                    >
                                        <CheckIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => {
                                            setEditCityId(null);
                                            setEditName("");
                                        }}
                                    >
                                        ✕
                                    </IconButton>
                                </Stack>
                            ) : (
                                <Typography>{city.name}</Typography>
                            )}

                            {allowEdit && (
                                <Stack direction="row" spacing={0.5}>
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            setEditCityId(city._id);
                                            setEditName(city.name);
                                        }}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => deleteMutation.mutate(city._id)}
                                    >
                                        <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            )}
                        </Box>
                    ))}
                </Stack>


                <Divider sx={{ my: 3 }} />

                <Stack direction="row" spacing={1}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Add new city"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                    />
                    <IconButton
                        color="primary"
                        onClick={() => createMutation.mutate(newCity)}
                        disabled={!newCity}
                    >
                        <AddIcon />
                    </IconButton>
                </Stack>
            </CardContent>
        </Card>
    );
};
