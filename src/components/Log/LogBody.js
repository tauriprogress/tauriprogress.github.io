import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import OverflowScroll from "../OverflowScroll";
import CharacterName from "../CharacterName";
import ElevatedLinearProgress from "../ElevatedLinearProgress";

import { sortMembers, isRegularLog } from "./helpers";
import { shortNumber } from "../../helpers";
import { styled } from "@mui/system";
import {
    environmentShootUrlSelector,
    environmentIconUrlSelector,
    logLootEntireSelector,
} from "../../redux/selectors";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { Avatar } from "@mui/material";
import ErrorMessage from "../ErrorMessage";
import { logLootFetch } from "../../redux/actions";
import Talents from "../Talents";
import Trinket from "../Trinket";

const tableColumns = [
    {
        label: "Character",
        id: "ilvl",
    },
    {
        label: "DPS",
        id: "dps",
    },
    {
        label: "Damage",
        id: "dmg_done",
    },
    {
        label: "HPS",
        id: "hps",
    },
    {
        label: "Healing",
        id: "total_healing",
    },
    {
        label: "Heal",
        id: "heal_done",
    },
    {
        label: "Absorb",
        id: "absorb_done",
    },
    {
        label: "Damage taken",
        id: "dmg_taken",
    },
    {
        label: "Interrupts",
        id: "interrupts",
    },
    {
        label: "Dispells",
        id: "dispells",
    },
];

const BoldSpan = styled("span")({
    fontWeight: "bold",
});

function DetailedTableHead({ sort, setSort }) {
    return (
        <TableHead>
            <TableRow>
                {tableColumns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.label !== "Character" ? "right" : "left"}
                    >
                        <TableSortLabel
                            active={sort.by === column.id}
                            direction={sort.direction}
                            onClick={() =>
                                setSort({
                                    by: column.id,
                                    direction:
                                        sort.by === column.id
                                            ? sort.direction === "asc"
                                                ? "desc"
                                                : "asc"
                                            : "desc",
                                })
                            }
                        >
                            {column.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function DetailedCharacterList({ data }) {
    const [sort, setSort] = useState({
        by: "dps",
        direction: "desc",
    });
    return (
        <Table size="small">
            <DetailedTableHead sort={sort} setSort={setSort} />
            <TableBody>
                {sortMembers(data.members, sort).map((member) => (
                    <TableRow key={member.name}>
                        <TableCell>
                            {member.ilvl}{" "}
                            <CharacterName
                                character={{
                                    ...member,
                                    race: `${member.race},${member.gender}`,
                                }}
                                realmName={data.realm}
                            />
                        </TableCell>

                        <TableCell align="right">
                            {new Intl.NumberFormat().format(member.dps)}
                        </TableCell>

                        <TableCell align="right">
                            {new Intl.NumberFormat().format(member.dmg_done)}
                        </TableCell>

                        <TableCell align="right">
                            {new Intl.NumberFormat().format(member.hps)}
                        </TableCell>

                        <TableCell align="right">
                            {new Intl.NumberFormat().format(
                                member.total_healing
                            )}
                        </TableCell>

                        <TableCell align="right">
                            {new Intl.NumberFormat().format(member.heal_done)}
                        </TableCell>
                        <TableCell align="right">
                            {new Intl.NumberFormat().format(member.absorb_done)}
                        </TableCell>
                        <TableCell align="right">
                            {new Intl.NumberFormat().format(member.dmg_taken)}
                        </TableCell>
                        <TableCell align="right">{member.interrupts}</TableCell>
                        <TableCell align="right">{member.dispells}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function RegularCharaterList({ data }) {
    const [sort, setSort] = useState({
        by: "dps",
        direction: "desc",
    });
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">Character</TableCell>
                    <TableCell
                        padding="checkbox"
                        align="right"
                        sortDirection={
                            sort.by === "hps" ? sort.direction : false
                        }
                    >
                        <TableSortLabel
                            active={sort.by === "dps"}
                            direction={sort.direction}
                            onClick={() =>
                                setSort({
                                    by: "dps",
                                    direction:
                                        sort.by === "dps"
                                            ? sort.direction === "asc"
                                                ? "desc"
                                                : "asc"
                                            : "desc",
                                })
                            }
                        >
                            DPS
                        </TableSortLabel>
                    </TableCell>
                    <TableCell
                        align="right"
                        sortDirection={
                            sort.by === "hps" ? sort.direction : false
                        }
                    >
                        <TableSortLabel
                            active={sort.by === "hps"}
                            direction={sort.direction}
                            onClick={() =>
                                setSort({
                                    by: "hps",
                                    direction:
                                        sort.by === "hps"
                                            ? sort.direction === "asc"
                                                ? "desc"
                                                : "asc"
                                            : "desc",
                                })
                            }
                        >
                            HPS
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">Item level</TableCell>

                    <TableCell align="right">Talents</TableCell>
                    <TableCell>Trinkets</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortMembers(data.members, sort).map((member) => (
                    <TableRow key={member.name}>
                        <TableCell padding="checkbox">
                            <CharacterName
                                character={{
                                    ...member,
                                    race: `${member.race},${member.gender}`,
                                }}
                                realmName={data.realm}
                            />
                        </TableCell>
                        <TableCell padding="checkbox" align="right">
                            <BoldSpan>{shortNumber(member.dps)}</BoldSpan>
                        </TableCell>
                        <TableCell padding="checkbox" align="right">
                            <BoldSpan>{shortNumber(member.hps)}</BoldSpan>
                        </TableCell>
                        <TableCell align="right">{member.ilvl}</TableCell>

                        <TableCell align="right">
                            <Talents char={member} />
                        </TableCell>
                        <TableCell>
                            {[0, 1].map((index) => {
                                const item = member[`trinket_${index}`];
                                return item ? (
                                    <Trinket
                                        id={item.entry}
                                        icon={item.icon}
                                        key={item.entry}
                                    />
                                ) : null;
                            })}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function Loot({ items, realm }) {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(logLootEntireSelector);
    const { shootUrl, iconUrl } = useSelector((state) => {
        return {
            shootUrl: environmentShootUrlSelector(state),
            iconUrl: environmentIconUrlSelector(state),
        };
    }, shallowEqual);
    useEffect(() => {
        dispatch(
            logLootFetch({
                items: items.map((item) => ({ id: item.itemid })),
                realm,
            })
        );
    }, [dispatch, items, realm]);

    return (
        <React.Fragment>
            {loading && <ElevatedLinearProgress top="40px" />}
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Items</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        items
                            .reduce((acc, item) => {
                                let arr = [];
                                for (let i = 0; i < item.count; i++) {
                                    arr.push(item);
                                }
                                return acc.concat(arr);
                            }, [])
                            .map((item) => (
                                <TableRow key={item.itemid}>
                                    <TableCell>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={`${shootUrl}/?item=${item.itemid}`}
                                        >
                                            <Avatar
                                                src={`${iconUrl}/medium/${
                                                    data[item.itemid]
                                                        .m_inventoryIcon
                                                }.png`}
                                            />
                                            {data[item.itemid].name}
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </Table>
            {error && <ErrorMessage message={error} />}
        </React.Fragment>
    );
}

function LogBody({ data, realm }) {
    const isRegular = isRegularLog(data);
    const [tab, setTab] = useState(isRegular ? 1 : 2);
    return (
        <React.Fragment>
            <Tabs
                value={tab}
                onChange={(e, tab) => setTab(tab)}
                textColor="secondary"
                indicatorColor="secondary"
            >
                {isRegular && <Tab value={1} label={"Regular"} />}
                <Tab value={2} label={"Detailed"} />
                <Tab value={3} label={"Loot"} />
            </Tabs>
            <OverflowScroll>
                {(() => {
                    switch (tab) {
                        case 1:
                            return <RegularCharaterList data={data} />;
                        case 2:
                            return <DetailedCharacterList data={data} />;
                        case 3:
                            return <Loot items={data.items} realm={realm} />;
                        default:
                            return null;
                    }
                })()}
            </OverflowScroll>
        </React.Fragment>
    );
}

export default LogBody;
