import { styled } from "@mui/material";
import Container from "@mui/material/Container";

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
