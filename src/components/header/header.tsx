import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { Link, useNavigate } from "react-router";

const Header = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
};
return (
    <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleHomeClick}>
                <FoodBankIcon fontSize="large" sx={{ mr: 1 }} />
            </IconButton>
            <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer", display: "flex", alignItems: "center" }}
            onClick={handleHomeClick}
            >
            My Plovo App
        </Typography>
        <Link to="/add-dish" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div" sx={{ cursor: "pointer" }}>
             Add dish
            </Typography>
        </Link>
    </Toolbar>
</AppBar>
);
};

export default Header;