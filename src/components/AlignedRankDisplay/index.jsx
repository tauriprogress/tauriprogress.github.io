import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";

const RankGrid = styled(Grid)(({ theme }) => ({
    minWidth: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "right",
    padding: `0 ${theme.spacing(3)} 0 ${theme.spacing(2)}`,
}));

function AlignedRankDisplay({ children, rank, className }) {
    return (
        <Grid container wrap="nowrap" className={className}>
            <RankGrid item>
                <Typography color="inherit">{rank}.</Typography>
            </RankGrid>
            <Grid item>{children}</Grid>
        </Grid>
    );
}

export default AlignedRankDisplay;
