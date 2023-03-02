import styled from "@emotion/styled";

const Container = styled("div")(({ theme }) => ({
    maxWidth: "100vw",
    display: "flex",
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
        flexWrap: "wrap",
    },
}));

const Aside = styled("aside")(({ theme }) => ({
    [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
        margin: "auto",
    },
    width: "260px",
    textAlign: "center",
}));

const Section = styled("section")(({ theme }) => ({
    flexGrow: 1,
    margin: `0 ${theme.spacing(1)}`,
    overflow: "hidden",
}));

function AsideContainer({ classes, AsideComponent, children, ...rest }) {
    return (
        <Container {...rest}>
            <Aside>
                <AsideComponent />
            </Aside>
            <Section>{children}</Section>
        </Container>
    );
}

export default AsideContainer;
