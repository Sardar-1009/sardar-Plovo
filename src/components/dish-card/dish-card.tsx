import { Card, CardContent, Typography, CardActionArea, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IDish } from '../../type';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from 'react';

interface DishCardProps {
  dish: IDish;
  addDishToBasket: (dish: IDish) => void;
}

const DishCard = ({ dish, addDishToBasket }: DishCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dish/${dish.id}`);
  };

  const handleAddDishToBasket = (e: React.MouseEvent<HTMLButtonElement>, dish: IDish) => {
    e.stopPropagation();
    addDishToBasket(dish);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '10px' }}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {dish.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${dish.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={(e) => handleAddDishToBasket(e, dish)}
          endIcon={<AddShoppingCartIcon />}
        >
          Add to basket
        </Button>
      </CardActions>
    </Card>
  );
};

export default DishCard;