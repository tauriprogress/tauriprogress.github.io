import brandIcon from "/assets/social/brandIcon.svg";
import { styled } from "@mui/system";

const Img = styled("img")({
    width: `21px`,
    height: `21px`,
});

function HomeIcon() {
    return <Img src={brandIcon} alt="Home" />;
}

export default HomeIcon;
