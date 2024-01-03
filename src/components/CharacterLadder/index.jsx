import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import CharacterList from "./CharacterList";
import InfoIcon from "../InfoIcon";
import TablePaginationActions from "../TablePaginationActions";
import ElevatedLinearProgress from "../ElevatedLinearProgress";
import OverflowScroll from "../OverflowScroll";

import { styled } from "@mui/material";

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
                            <TableCell padding="checkbox">Character</TableCell>
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

                            <TableCell align="right">Talents</TableCell>
                            <TableCell>Trinkets</TableCell>
                            <TableCell>Faction</TableCell>
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

export default CharacterLadder;
