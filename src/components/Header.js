import logo from "../images/header_logo_theme_dark.svg";

function Header() {
    return(
        <div className="header">
            <img className="header__logo" src={logo} alt="МЕСТО" />
        </div>
    )
}

export default Header;