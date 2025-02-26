import styles from './styles.module.css'
import {Button, TextField} from '@mui/material';
import {useState} from 'react';
import {IDishShort} from '../../type.ts';

const INITIAL_FORM_STATE: IDishShort = {
  name: '',
  description: '',
  price: 0
}
const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormState(prevState => ({...prevState, [name]: value}));
    };

const DishForm = () => {
  const [formState, setFormState] = useState<IDishShort>(INITIAL_FORM_STATE)    

  return (
    <form className={styles.form}>
      <TextField
        label={'Dish name'}
        value={formState.name}
        name={'name'}
        onChange={inputChangeHandler}
      />
      <TextField
        label={'Description'}
        value={formState.description}
        name={'description'}
        onChange={inputChangeHandler}
      />
      
      <TextField
        label={'Price'}
        value={formState.price}
        name={'price'}
        type={'number'}
        onChange={inputChangeHandler}
      />
      
      <Button type={'submit'} variant={'contained'}>Add Dish</Button>
    </form>
  );
};

export default DishForm;