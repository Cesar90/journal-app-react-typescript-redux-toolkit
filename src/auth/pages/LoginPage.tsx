import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useAppDispatch, useAppSelector } from "../../store";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";

interface IFormInput {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { status, errorMessage } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isAuthenticating = useMemo(() => {
    return status === "checking"
  }, [status])

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(startLoginWithEmailPassword(data));
  };

  const onGoogleSubmit = () => {
    console.log("onGoogleSignIn")
    dispatch(startGoogleSignIn({ email: "", password: "" }))
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="email"
                  type="email"
                  placeholder="email@google.com"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="password"
                  type="password"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid
            container
            display={!!errorMessage ? "" : "none"}
            sx={{ mt: 1, mb: 1 }}
          >
            <Grid
              item xs={12}
            >
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>
          </Grid>


          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                onClick={onGoogleSubmit}
                variant="contained"
                fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Create an account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
