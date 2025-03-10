import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';

interface CustomerData {
  name: string;
  address: string;
  phone: string;
}

interface CheckoutFormProps {
  onSubmit: (data: CustomerData) => void;
  isSubmitting: boolean;
}

const CheckoutForm = ({ onSubmit, isSubmitting }: CheckoutFormProps) => {
  const [formData, setFormData] = useState<CustomerData>({
    name: '',
    address: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { name: '', address: '', phone: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Имя получателя обязательно';
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Адрес доставки обязателен';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Номер телефона обязателен';
      isValid = false;
    } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Неверный формат телефона';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      <Typography variant="h5" gutterBottom>
        Данные для доставки
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Имя получателя"
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
            label="Адрес доставки"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Номер телефона"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
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
            {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutForm;