import Container from "@mui/material/Container";
import { styled } from "@mui/styles";

const FilterContainer = styled(Container)(({ theme }) => ({
    padding: 0,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& .MuiFormControl-root": {
        margin: theme.spacing(1),
    },
}));

export default FilterContainer;
