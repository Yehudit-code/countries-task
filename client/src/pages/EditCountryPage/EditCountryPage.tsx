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
import { CountryCities } from "../../components/cities/CountryCities";
import styles from "./EditCountryPage.module.css";

import { useSetRecoilState } from "recoil";
import { selectedCountryNameState } from "../../store/selectedCountryState";

import { useUpdateCountry } from "../../hooks/useUpdateCountry";
import { useCreateCountry } from "../../hooks/useCreateCountry";
import { useSnackbar } from "../../hooks/useSnackbar";

import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from "../../constants/messages";

import {
  EXIT_WITHOUT_SAVING_DIALOG,
} from "../../constants/dialogTexts";

export default function EditCountryPage() {
  const { id } = useParams<{ id?: string }>();
  const isEditMode = Boolean(id);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setSelectedCountryName = useSetRecoilState(
    selectedCountryNameState
  );

  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [citiesChanged, setCitiesChanged] = useState(false);

  const updateMutation = useUpdateCountry();
  const createMutation = useCreateCountry();

  const snackbar = useSnackbar();

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
            updateMutation.mutate(
              { id: id as string, data: values },
              {
                onSuccess: () => {
                  snackbar.showSnackbar(
                    SUCCESS_MESSAGES.COUNTRY_UPDATED,
                    "success"
                  );
                  setTimeout(() => navigate("/"), 1200);
                },
                onError: () => {
                  snackbar.showSnackbar(
                    ERROR_MESSAGES.COUNTRY_UPDATE_FAILED,
                    "error"
                  );
                },
              }
            );
          } else {
            createMutation.mutate(values, {
              onSuccess: () => {
                snackbar.showSnackbar(
                  SUCCESS_MESSAGES.COUNTRY_CREATED,
                  "success"
                );
                setTimeout(() => navigate("/"), 1200);
              },
              onError: () => {
                snackbar.showSnackbar(
                  ERROR_MESSAGES.COUNTRY_CREATE_FAILED,
                  "error"
                );
              },
            });
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
              {isEditMode && id && (
                <CountryCities
                  countryId={id as string}
                  allowEdit
                  onCitiesChange={() => setCitiesChanged(true)}
                />


              )}


              <div className={styles.actions}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={
                    (!dirty && !citiesChanged) ||
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
                    if (dirty || citiesChanged) {
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


      {/* Exit without saving dialog */}
      <Dialog
        open={showConfirmExit}
        onClose={() => setShowConfirmExit(false)}
      >
        <DialogTitle>
          {EXIT_WITHOUT_SAVING_DIALOG.TITLE}
        </DialogTitle>
        <DialogContent>
          {EXIT_WITHOUT_SAVING_DIALOG.CONTENT}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmExit(false)}>
            {EXIT_WITHOUT_SAVING_DIALOG.STAY}
          </Button>
          <Button color="error" onClick={() => navigate(-1)}>
            {EXIT_WITHOUT_SAVING_DIALOG.EXIT}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar – top right */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={snackbar.closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
