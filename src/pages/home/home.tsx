
import { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import DishCard from '../../components/dish-card/dish-card';
import { IDish } from '../../type';

interface HomeProps {
  addDishToBasket: (dish: IDish) => void;
  handleSyncBasketWithDishes: (dishes: IDish[]) => void;
}

const Home = ({ addDishToBasket, handleSyncBasketWithDishes }: HomeProps) => {
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://sardar-plovo-default-rtdb.europe-west1.firebasedatabase.app/dishes.json');
      
      if (response.data) {
        const dishesArray = Object.keys(response.data).map(key => ({
          ...response.data[key],
          id: key 
        }));
        
        setDishes(dishesArray);

        handleSyncBasketWithDishes(dishesArray);
      } else {
        setDishes([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching dishes:', err);
      setError('Failed to load dishes. Please refresh the page.');
      setDishes([]); 
    } finally {
      setLoading(false);
    }
  }, [handleSyncBasketWithDishes]);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Our Dishes
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <CircularProgress />
        </div>
      ) : dishes.length > 0 ? (
        <Grid container spacing={3}>
          {dishes.map((dish) => (
            <Grid item xs={12} sm={6} md={4} key={dish.id}>
              <DishCard 
                dish={dish}
                addDishToBasket={addDishToBasket}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No dishes available. Add some dishes to get started.
        </Typography>
      )}
    </Container>
  );
};

export default Home;