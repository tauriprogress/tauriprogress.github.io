import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";

import withTheme from "@mui/styles/withTheme";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import CharacterList from "./CharacterList";

import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import InfoIcon from "../InfoIcon";

import { filterChars } from "./helpers";
import { environmentCharacterSpecsSelector } from "../../redux/selectors";
import OverflowScroll from "../OverflowScroll";
import ElevatedLinearProgress from "../ElevatedLinearProgress";

const UppercaseTableCell = styled(TableCell)({
    textTransform: "uppercase",
});

function TablePaginationActions(props) {
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </Box>
    );
}

function CharacterLadder({
    filter = {},
    combatMetric,
    data = [],
    page: propsPage,
    pageSize = 25,
    onPageChange,
    itemCount,
    sliced,
    loading,
}) {
    const specs = useSelector(environmentCharacterSpecsSelector);

    const [localPage, setPage] = useState(0);

    let page = typeof propsPage !== "undefined" ? propsPage : localPage;

    useEffect(() => {
        setPage(0);
    }, [combatMetric, data, filter]);

    let filteredData = filterChars(filter, data, specs);
    const filteredDataLength = filteredData.length;

    if (!sliced) {
        filteredData = filteredData.slice(
            page * pageSize,
            (page + 1) * pageSize
        );
    }

    function changePage(e, page) {
        window.scrollTo(0, 0);
        if (onPageChange) {
            onPageChange(e, page);
        } else {
            setPage(page);
        }
    }

    return (
        <React.Fragment>
            {loading && <ElevatedLinearProgress top="40px" />}
            <OverflowScroll>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" padding="checkbox">
                                Rank
                            </TableCell>
                            <TableCell>Character</TableCell>
                            <UppercaseTableCell>
                                <Tooltip
                                    title={"Click on the number for details"}
                                >
                                    <span>
                                        <InfoIcon /> {combatMetric}
                                    </span>
                                </Tooltip>
                            </UppercaseTableCell>
                            <TableCell>Item level</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <CharacterList
                            data={filteredData}
                            combatMetric={combatMetric}
                        />
                    </TableBody>
                </Table>
            </OverflowScroll>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={itemCount || filteredDataLength}
                rowsPerPage={pageSize}
                page={page}
                onPageChange={changePage}
                ActionsComponent={TablePaginationActions}
            />
        </React.Fragment>
    );
}

export default withTheme(CharacterLadder);
