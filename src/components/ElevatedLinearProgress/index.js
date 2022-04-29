import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/system";

function ElevatedLinearProgress({ top = "0px" }) {
    return (
        <Container>
            <Elevation top={top}>
                <LinearProgress color="secondary" />
            </Elevation>
        </Container>
    );
}

const Container = styled("div")({
    position: "relative",
});

const Elevation = styled("div")(({ top }) => ({
    position: "absolute",
    width: "100%",
    top: top,
    height: "10px",
    zIndex: "100000",
}));

export default ElevatedLinearProgress;
