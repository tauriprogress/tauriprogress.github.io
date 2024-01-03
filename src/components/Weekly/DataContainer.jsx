import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";

const Container = styled(Grid)(({ theme }) => ({
    minWidth: "300px",
    maxWidth: "400px !important",
    margin: "0 auto",
    padding: theme.spacing(2),
}));

function DataContainer({ difficultyName, xs, children }) {
    return (
        <Container item xs={xs}>
            <Typography variant="h6" align="center">
                {difficultyName}
            </Typography>
            {children}
        </Container>
    );
}

export default DataContainer;
