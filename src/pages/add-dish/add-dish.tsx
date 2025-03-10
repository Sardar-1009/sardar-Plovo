import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Alert } from '@mui/material';
import DishForm from '../../components/dish-form/dish-form';
import axios from 'axios';

// Add interface for dish data
interface DishData {
  name: string;
  description: string;
  price: number;
  // Add any other properties your dish has
}

const AddDish = () => {
  // Use proper typing for error state
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Add type to dishData parameter
  const handleSubmit = async (dishData: DishData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const newDish = {
        ...dishData,
        id: Date.now().toString()
      };
      
      await axios.post('https://sardar-plovo-default-rtdb.europe-west1.firebasedatabase.app/dishes.json', newDish);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Error adding dish:', err);
      setError('Failed to add dish. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Dish
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Dish added successfully! Redirecting to home page...
        </Alert>
      )}
      
      <DishForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </Container>
  );
};

export default AddDish;