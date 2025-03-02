import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { dishService } from '../../services/dish-service';
import { IDish } from '../../type';

const DishDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dish, setDish] = useState<IDish | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDish = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const dishData = await dishService.getDishById(id);
        setDish(dishData);
      } catch (err) {
        console.error('Error fetching dish:', err);
        setError('Failed to load dish details');
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      await dishService.deleteDish(id);
      navigate('/');
    } catch (err) {
      console.error('Error deleting dish:', err);
      setError('Failed to delete dish');
    }
  };

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
        <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Return to Home
        </Button>
      </Box>
    );
  }

  if (!dish) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="h5">Dish not found</Typography>
        <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Return to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={3}>
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>{dish.name}</Typography>
          <Typography variant="body1" paragraph>{dish.description}</Typography>
          <Typography variant="h6" color="primary" gutterBottom>${dish.price}</Typography>
          
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="outlined" onClick={() => navigate('/')}>
              Back to List
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DishDetails;