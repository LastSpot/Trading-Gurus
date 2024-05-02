import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to);
        const isActive = useMatch({ path: resolvedPath.pathname, end: true });

        return (
            <li className={isActive ? "active" : ""}>
                <Link to={to} {...props}>
                    {children}
                </Link>
            </li>
        );
    }
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                Trading Gurus
            </Link>
            <ul>
                <CustomLink to="/">Dashboard</CustomLink>
                <CustomLink to="/convert">Converter</CustomLink>
                <CustomLink to="/profile">Profile</CustomLink>
            </ul>
        </nav>
    );
}
