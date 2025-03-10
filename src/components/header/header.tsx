import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  totalCount: number;
}

const Header = ({ totalCount }: HeaderProps) => {
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
        
        <Badge badgeContent={totalCount} color="error" sx={{ mx: 2 }}>
          <ShoppingCartIcon />
        </Badge>
        
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