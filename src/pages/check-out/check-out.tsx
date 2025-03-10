import { useState } from 'react';
import { Container, Paper, Box, Typography, Divider, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import OrderItems from '../../components/order-items/order-items';
import CheckoutForm from '../../components/checkout-form/checkout-form';
import { IBasketState, IBasket } from '../../type';
import axios from 'axios';
import { STORAGE_KEY } from '../../constants';

interface CustomerData {
  name: string;
  address: string;
  phone: string;
}

interface OrderData {
  items: IBasket[];
  totalPrice: number;
  totalCount: number;
  customer: CustomerData;
  date: string;
  completed: boolean;
}

interface CheckoutProps {
  basketState: IBasketState;
  setBasketState: React.Dispatch<React.SetStateAction<IBasketState>>;
}

const Checkout = ({ basketState, setBasketState }: CheckoutProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const updateItemCount = (id: string, newCount: number) => {
    const updatedItems = basketState.items.map(item => {
      if (item.dish.id === id) {
        return { ...item, count: newCount };
      }
      return item;
    });

    const totalCount = updatedItems.reduce((sum, item) => sum + item.count, 0);
    const totalPrice = updatedItems.reduce((sum, item) => sum + (item.dish.price * item.count), 0);

    const updatedBasket = {
      items: updatedItems,
      totalCount,
      totalPrice
    };

    setBasketState(updatedBasket);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBasket));
  };

  const handleSubmitOrder = async (customerData: CustomerData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const orderData: OrderData = {
        items: basketState.items,
        totalPrice: basketState.totalPrice,
        totalCount: basketState.totalCount,
        customer: customerData,
        date: new Date().toISOString(),
        completed: false
      };

      await axios.post('https://your-firebase-url/orders.json', orderData);
      

      const emptyBasket = {
        items: [],
        totalCount: 0,
        totalPrice: 0
      };
      
      setBasketState(emptyBasket);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyBasket));
      
      setSuccess(true);
      

      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (err) {
      console.error('Error submitting order:', err);
      setError('Ошибка при оформлении заказа. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          Заказ успешно оформлен! Вы будете перенаправлены на главную страницу.
        </Alert>
      </Container>
    );
  }

  if (basketState.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Корзина пуста. Добавьте блюда для оформления заказа.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Оформление заказа
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <OrderItems 
          basketState={basketState} 
          onUpdateItemCount={updateItemCount} 
        />
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <CheckoutForm 
          onSubmit={handleSubmitOrder} 
          isSubmitting={isSubmitting} 
        />
      </Paper>
    </Container>
  );
};

export default Checkout;