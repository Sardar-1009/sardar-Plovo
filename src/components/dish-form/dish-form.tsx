
import { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


interface DishData {
  name: string;
  description: string;
  price: number;

}

interface DishFormProps {
  onSubmit: (data: DishData) => void;
  isSubmitting: boolean;
}

const DishForm = ({ onSubmit, isSubmitting }: DishFormProps) => {
  const [formData, setFormData] = useState<DishData>({
    name: '',
    description: '',
    price: 0,
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    price: '',
  });

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { name: '', description: '', price: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Dish name is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dish Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price (som)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            required
          />
        </Grid>
      
        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Dish...' : 'Add Dish'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DishForm;