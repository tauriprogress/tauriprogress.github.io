import React from "react";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { getRaidImg } from "../../helpers";
import { styled } from "@mui/system";
import ImageProgressBar from "../ImageProgressBar";

const Container = styled(Card)(({ theme }) => ({
    margin: `0 ${theme.spacing(1)} ${theme.spacing(1)}`,
    width: "260px",
    borderRadius: "4px",
}));

const Defeated = styled("span")(({ theme }) => ({
    color: theme.palette.success.main,
}));

const Alive = styled("span")(({ theme }) => ({
    color: theme.palette.error.main,
}));

const TooltipContentContainer = styled(Paper)(({ theme }) => ({
    background: "transparent",
    padding: theme.spacing(1),
}));

const FilledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    "& .MuiTooltip-tooltip": {
        backgroundColor: theme.palette.background.tooltip,
        padding: 0,
    },
}));

function GuildRaidSummary({ data, difficultyNames }) {
    return (
        <Container>
            <FilledTooltip
                title={
                    <TooltipContentContainer elevation={5}>
                        <Table variant="tooltip">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    {data.difficulties.map((difficulty) => (
                                        <TableCell
                                            key={difficulty}
                                            align="center"
                                        >
                                            <Typography>
                                                {difficultyNames[difficulty]}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.bosses.map((boss) => (
                                    <TableRow key={boss.name}>
                                        <TableCell>
                                            <Typography>{boss.name}</Typography>
                                        </TableCell>
                                        {data.difficulties.map((difficulty) => (
                                            <TableCell key={difficulty}>
                                                <Typography>
                                                    {boss[difficulty] ? (
                                                        <Defeated>
                                                            Defeated
                                                        </Defeated>
                                                    ) : (
                                                        <Alive>Alive</Alive>
                                                    )}
                                                </Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TooltipContentContainer>
                }
            >
                <div>
                    <ImageProgressBar
                        textLeft={data.name}
                        textRight={`${data.defeatedBosses}/${data.bossCount}`}
                        image={`url("${getRaidImg(data.image)}")`}
                        progressPercentage={
                            data.defeatedBosses / data.bossCount
                        }
                    />
                </div>
            </FilledTooltip>
        </Container>
    );
}

/*

<ImageProgressBar
                    textLeft={data.name}
                    textRight={`${data.defeatedBosses}/${data.bossCount}`}
                    image={`url("${getRaidImg(data.image)}")`}
                    progressPercentage={data.defeatedBosses / data.bossCount}
                />

*/

export default GuildRaidSummary;
