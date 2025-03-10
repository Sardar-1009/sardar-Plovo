import { Box, Typography, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IBasketState, IBasket } from '../../type';

interface OrderItemsProps {
  basketState: IBasketState;
  onUpdateItemCount: (id: string, newCount: number) => void;
}

const OrderItems = ({ basketState, onUpdateItemCount }: OrderItemsProps) => {
  const { items, totalPrice, totalCount } = basketState;

  const handleIncrement = (id: string, currentCount: number) => {
    onUpdateItemCount(id, currentCount + 1);
  };

  const handleDecrement = (id: string, currentCount: number) => {
    if (currentCount > 1) {
      onUpdateItemCount(id, currentCount - 1);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Ваш заказ
      </Typography>
      <List>
        {items.map((item) => (
          <Box key={item.dish.id}>
            <ListItem>
              <ListItemText
                primary={item.dish.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Цена: {item.dish.price} som
                    </Typography>
                  </>
                }
              />
              <Box display="flex" alignItems="center">
                <IconButton 
                  onClick={() => handleDecrement(item.dish.id, item.count)}
                  disabled={item.count <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{item.count}</Typography>
                <IconButton 
                  onClick={() => handleIncrement(item.dish.id, item.count)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Typography variant="h6">
          Всего блюд: {totalCount}
        </Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          Итого: {totalPrice} som
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderItems;