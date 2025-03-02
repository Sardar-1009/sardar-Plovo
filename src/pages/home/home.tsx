import { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import DishCard from '../../components/dish-card/dish-card';
import { dishService } from '../../services/dish-service';
import { IDish } from '../../type';

const Home = () => {
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const dishesData = await dishService.getAllDishes();
        setDishes(dishesData);
      } catch (err) {
        console.error('Error fetching dishes:', err);
        setError('Failed to load dishes');
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="h5" color="error">{error}</Typography>
      </Box>
    );
  }

  if (dishes.length === 0) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="h5">No dishes available</Typography>
        <Typography variant="body1">Add a new dish to get started</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>All Dishes</Typography>
      <Grid container spacing={2}>
        {dishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dish.id}>
            <DishCard dish={dish} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;