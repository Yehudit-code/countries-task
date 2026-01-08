import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { Country } from "../types/country";
import { IconButton, Stack, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import LocationCityIcon from "@mui/icons-material/LocationCity";


interface Props {
    countries: Country[];
    onDelete: (id: string) => void;
    onShowCities: (countryId: string) => void;
}


export default function CountriesDataGrid({ countries, onDelete, onShowCities }: Props) {
    const navigate = useNavigate();

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "region", headerName: "Region", flex: 1 },
        { field: "population", headerName: "Population", flex: 1 },
        {
            field: "flag",
            headerName: "Flag",
            width: 90,
            sortable: false,
            filterable: false,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="100%"
                >
                    <img
                        src={params.value}
                        alt="flag"
                        style={{
                            width: 36,
                            height: 24,
                            objectFit: "cover",
                            borderRadius: 4,
                            boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                        }}
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                                "https://via.placeholder.com/36x24?text=?";
                        }}
                    />
                </Box>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            filterable: false,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: "100%" }}
                >
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() =>
                            navigate(`/countries/${params.id as string}`)
                        }
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(params.id as string)}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onShowCities(params.row._id)}
                    >
                        <LocationCityIcon fontSize="small" />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={countries}
                columns={columns}
                getRowId={(row) => row._id}
                pageSizeOptions={[5, 10]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5, page: 0 } },
                }}
                disableRowSelectionOnClick
            />
        </div>
    );
}
