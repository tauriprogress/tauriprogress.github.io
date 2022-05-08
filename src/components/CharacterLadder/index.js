import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";

import withTheme from "@mui/styles/withTheme";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Tooltip from "@mui/material/Tooltip";

import CharacterList from "./CharacterList";

import InfoIcon from "../InfoIcon";
import TablePaginationActions from "../TablePaginationActions";

import OverflowScroll from "../OverflowScroll";
import ElevatedLinearProgress from "../ElevatedLinearProgress";

const UppercaseTableCell = styled(TableCell)({
    textTransform: "uppercase",
});

function CharacterLadder({
    filter = {},
    combatMetric,
    data = [],
    page: propsPage,
    pageSize = 25,
    onPageChange,
    itemCount,
    loading,
}) {
    const [localPage, setPage] = useState(0);

    let page = typeof propsPage !== "undefined" ? propsPage : localPage;

    useEffect(() => {
        setPage(0);
    }, [combatMetric, data, filter]);

    function changePage(e, page) {
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
                            <TableCell>Talents</TableCell>
                            <TableCell>Trinkets</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <CharacterList
                            data={data}
                            combatMetric={combatMetric}
                        />
                    </TableBody>
                </Table>
            </OverflowScroll>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={itemCount || 0}
                rowsPerPage={pageSize}
                page={page}
                onPageChange={changePage}
                ActionsComponent={TablePaginationActions}
            />
        </React.Fragment>
    );
}

export default withTheme(CharacterLadder);
