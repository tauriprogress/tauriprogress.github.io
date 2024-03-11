import { Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";

const TitleContainer = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    color: theme.palette.primary.contrastText,
}));

const Title = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(2),
    "& p": {
        cursor: "default",
    },
    display: "flex",
    justifyContent: "space-between",
}));

const TextLeft = styled(Typography)(({ theme }) => ({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginRight: theme.spacing(1),
}));

const TextRight = styled(Typography)(({ theme }) => ({
    whiteSpace: "nowrap",
}));

function ImageProgressBar({
    image,
    progressPercentage,
    textLeft,
    textRight,
    style = {},
}) {
    const containerStyles = { ...style, backgroundImage: image };
    return (
        <TitleContainer style={containerStyles}>
            <Title
                container
                justifyContent="space-between"
                wrap={"nowrap"}
                style={{
                    background: `linear-gradient(to left, rgba(0, 0, 0, 0.7) ${
                        100 - progressPercentage * 100
                    }%, rgba(0,0,0,0) ${100 - progressPercentage * 100}%)`,
                }}
            >
                <Grid
                    item
                    style={{
                        minWidth: 0,
                    }}
                >
                    <TextLeft>{textLeft}</TextLeft>
                </Grid>
                <Grid item>
                    <TextRight>{textRight}</TextRight>
                </Grid>
            </Title>
        </TitleContainer>
    );
}

export default ImageProgressBar;
