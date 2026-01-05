import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

import type { Country } from "../../types/country";
import { getCountryById } from "../../api/countries.api";
import { countrySchema } from "../../validation/country.schema";
import styles from "./EditCountryPage.module.css";

import { useSetRecoilState } from "recoil";
import { selectedCountryNameState } from "../../store/selectedCountryState";

import { useUpdateCountry } from "../../hooks/useUpdateCountry";
import { useCreateCountry } from "../../hooks/useCreateCountry";

export default function EditCountryPage() {
  const { id } = useParams<{ id?: string }>();
  const isEditMode = Boolean(id);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setSelectedCountryName = useSetRecoilState(
    selectedCountryNameState
  );

  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateMutation = useUpdateCountry();
  const createMutation = useCreateCountry();

  /* ---------- Fetch country (cache-first) ---------- */
  const { data, isLoading } = useQuery<Country>({
    queryKey: ["countries", id],
    queryFn: () => getCountryById(id as string),
    enabled: isEditMode,
    initialData: () => {
      if (!isEditMode) return undefined;

      const countries = queryClient.getQueryData<Country[]>(["countries"]);
      return countries?.find((c) => c._id === id);
    },
  });

  /* ---------- Recoil: update Navbar ---------- */
  useEffect(() => {
    if (isEditMode && data?.name) {
      setSelectedCountryName(data.name);
    } else {
      setSelectedCountryName(null);
    }

    return () => {
      setSelectedCountryName(null);
    };
  }, [isEditMode, data, setSelectedCountryName]);

  /* ---------- Handle success ---------- */
  useEffect(() => {
    if (updateMutation.isSuccess || createMutation.isSuccess) {
      setSuccessOpen(true);

      setTimeout(() => {
        navigate("/");
      }, 1200);
    }
  }, [updateMutation.isSuccess, createMutation.isSuccess, navigate]);

  if (isEditMode && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          name: data?.name || "",
          region: data?.region || "",
          population: data?.population || 0,
          flag: data?.flag || "",
        }}
        validationSchema={countrySchema}
        enableReinitialize
        onSubmit={(values) => {
          if (isEditMode) {
            updateMutation.mutate({
              id: id as string,
              data: values,
            });
          } else {
            createMutation.mutate(values);
          }
        }}
      >
        {({ errors, touched, dirty, isValid }) => (
          <Form>
            <Stack spacing={2}>
              <Field
                name="name"
                as={TextField}
                label="Name"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />

              <Field
                name="region"
                as={TextField}
                label="Region"
                error={touched.region && !!errors.region}
                helperText={touched.region && errors.region}
              />

              <Field
                name="population"
                as={TextField}
                type="number"
                label="Population"
                error={touched.population && !!errors.population}
                helperText={touched.population && errors.population}
              />

              <Field
                name="flag"
                as={TextField}
                label="Flag URL"
                error={touched.flag && !!errors.flag}
                helperText={touched.flag && errors.flag}
              />

              <div className={styles.actions}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={
                    !dirty ||
                    !isValid ||
                    updateMutation.isPending ||
                    createMutation.isPending
                  }
                >
                  {isEditMode ? "Save" : "Create"}
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => {
                    if (dirty) {
                      setShowConfirmExit(true);
                    } else {
                      navigate(-1);
                    }
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Stack>
          </Form>
        )}
      </Formik>

      {/* Exit without saving */}
      <Dialog
        open={showConfirmExit}
        onClose={() => setShowConfirmExit(false)}
      >
        <DialogTitle>Exit without saving</DialogTitle>
        <DialogContent>
          Are you sure you want to leave without saving your changes?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmExit(false)}>
            Stay
          </Button>
          <Button color="error" onClick={() => navigate(-1)}>
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success snackbar */}
      <Snackbar
        open={successOpen}
        autoHideDuration={2000}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert severity="success" variant="filled">
          {isEditMode
            ? "Country updated successfully"
            : "Country created successfully"}
        </Alert>
      </Snackbar>

      {/* Error snackbar */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
