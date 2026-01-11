import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { Country } from "../types/country";
import {
  IconButton,
  Stack,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

interface Props {
  countries: Country[];
  canDelete: boolean;
  canUpdate: boolean;
  onDelete: (id: string) => void;
  onShowCities: (id: string) => void;
}

export default function CountriesDataGrid({
  countries,
  canDelete,
  canUpdate,
  onDelete,
  onShowCities
}: Props) {
  const navigate = useNavigate();

  const columns: GridColDef[] = useMemo(() => {
    const cols: GridColDef[] = [
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
        field: "cities",
        headerName: "Cities",
        width: 90,
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <IconButton
            size="small"
            onClick={() => onShowCities(params.row._id)}
          >
            <LocationCityIcon fontSize="small" />
          </IconButton>
        ),
      },
    ];

    if (canUpdate || canDelete) {
      cols.push({
        field: "actions",
        headerName: "Actions",
        width: 120,
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Stack direction="row" spacing={0.5}>
            {canUpdate && (
              <IconButton
                size="small"
                color="primary"
                onClick={() =>
                  navigate(`/countries/${params.id as string}`)
                }
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}

            {canDelete && (
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(params.id as string)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        ),
      });
    }

    return cols;
  }, [canUpdate, canDelete, navigate, onDelete, onShowCities]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={countries}
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 }
          },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
}
