import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import { Google } from '@mui/icons-material';
import { AuthLayout } from "../layout/AuthLayout";
import { useAppDispatch, useAppSelector } from "../../store";
import { startCreatingUserWithEmailPassword } from "../../store/auth";

interface IFormInput {
  displayName: string
  email: string;
  password: string;
}

export const RegisterPage = () => {

  const dispatch = useAppDispatch();
  const { status, errorMessage } = useAppSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === "checking", [status]);

  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(startCreatingUserWithEmailPassword(data));
  };

  return (
    <AuthLayout title="Create an account">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="displayName"
              control={control}
              rules={{
                required: true,
                minLength: 5,
              }}
              render={({
                field,
                fieldState: { error },
              }) => {

                return (
                  <TextField
                    {...field}
                    label="Full Name"
                    error={!!error}
                    type="text"
                    placeholder="Full Name"
                    fullWidth
                    helperText={error?.type == "minLength" ? "At least 6 characters" : null}
                  />
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              }}
              render={({
                field,
                fieldState: { error },
              }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  placeholder="test@google.com"
                  fullWidth
                  error={!!error}
                  helperText={error?.type == "pattern" ? "Email not valid" : null}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
                minLength: 5,
              }}
              render={({
                field,
                fieldState: { error },
              }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  placeholder="password"
                  fullWidth
                  error={!!error}
                  helperText={error?.type == "minLength" ? "At least 5 characters" : null}
                />
              )}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid
              item xs={12}
              display={!!errorMessage ? "" : "none"}
            >
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth>
                Create account
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Do you have an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Go Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
