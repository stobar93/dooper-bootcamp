import React from "react";
import { Container, Grid, Typography } from "@mui/material";

export default function TestPage() {
  return (
    <Container>
      <Typography typography={"h1"}>Dooper bootcamp</Typography>
      <Grid container mt={3}>
        <Grid item xs={6}>
          <Typography typography={"h4"}>Column 1</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography typography={"h4"}>Column 2</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
