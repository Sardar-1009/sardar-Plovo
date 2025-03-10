import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/header/header';
import Home from './pages/home/home';
import AddDish from './pages/add-dish/add-dish';
import DishDetails from './pages/dish-details/dish-details';
import Basket from './pages/basket/basket';
import Checkout from './pages/check-out/check-out';
import { Container } from '@mui/material';
import { IDish, IBasketState } from './type';
import { addDishToBasket, syncBasketWithDishes } from './utils/basketHelpers';
import { STORAGE_KEY } from './constants';

function App() {
  const [basketState, setBasketState] = useState<IBasketState>(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : {
      items: [],
      totalPrice: 0,
      totalCount: 0
    };
  });
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(basketState));
  }, [basketState]);
  
  const handleAddDish = (dish: IDish) => {
    setBasketState(currentState => addDishToBasket(currentState, dish));
  };
  
  const handleSyncBasketWithDishes = (dishes: IDish[]) => {
    setBasketState(currentState => syncBasketWithDishes(currentState, dishes));
  };

  return (
    <>
      <Header totalCount={basketState.totalCount} />
      <Container>
        <Routes>
          <Route path="/" element={<Home 
            addDishToBasket={handleAddDish} 
            handleSyncBasketWithDishes={handleSyncBasketWithDishes} 
          />} />
          <Route path="/add-dish" element={<AddDish />} />
          <Route path="/dish/:id" element={<DishDetails />} />
          <Route path="/basket" element={<Basket basketState={basketState} />} />
          <Route path="/check-out" element={<Checkout 
            basketState={basketState} 
            setBasketState={setBasketState} 
          />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;