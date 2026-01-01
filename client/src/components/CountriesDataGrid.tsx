import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { Country } from "../types/country";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

interface Props {
    countries: Country[];
    onDelete: (id: string) => void;
}

export default function CountriesDataGrid({ countries, onDelete }: Props) {
    const navigate = useNavigate();

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "region", headerName: "Region", flex: 1 },
        { field: "population", headerName: "Population", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton
                        color="primary"
                        onClick={() =>
                            navigate(`/countries/${params.id as string}`)
                        }
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={() => onDelete(params.id as string)}
                    >
                        <DeleteIcon />
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
