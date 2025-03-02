import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IDish } from '../../type';

interface DishCardProps {
  dish: IDish;
}

const DishCard = ({ dish }: DishCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dish/${dish.id}`);
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
    </Card>
  );
};

export default DishCard;