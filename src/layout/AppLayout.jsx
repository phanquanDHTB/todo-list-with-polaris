import { Frame, TopBar } from "@shopify/polaris";
import "./styles.scss";

const AppLayout = ({ children }) => {
    const userMenuMarkup = <TopBar.UserMenu actions={[]} name="Dharma" detail={"Avada"} initials="A" />;
    const logo = {
        topBarSource: "https://avada.io/assets/images/avada-logo-new.png",
        width: 86,
        url: "/",
        accessibilityLabel: "Avada",
    };

    const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;
    return (
        <Frame topBar={topBarMarkup} logo={logo}>
            {children}
        </Frame>
    );
};

AppLayout.propTypes = { children: HTMLElement };

export default AppLayout;
