import axios from 'axios';
import { IDish, IDishShort, FirebaseResponse } from '../type';

const baseURL = 'https://sardar-plovo-default-rtdb.europe-west1.firebasedatabase.app/'; 

export const dishService = {
  async addDish(dish: IDishShort): Promise<string> {
    const response = await axios.post<{ name: string }>(`${baseURL}/dishes.json`, dish);
    return response.data.name;
  },

  async getAllDishes(): Promise<IDish[]> {
    const response = await axios.get<FirebaseResponse<IDishShort>>(`${baseURL}/dishes.json`);
    
    if (!response.data) {
      return [];
    }

    const dishes: IDish[] = Object.entries(response.data).map(([id, dish]) => ({
      id,
      ...dish
    }));

    return dishes;
  },

  async getDishById(id: string): Promise<IDish | null> {
    const response = await axios.get<IDishShort>(`${baseURL}/dishes/${id}.json`);
    
    if (!response.data) {
      return null;
    }

    return {
      id,
      ...response.data
    };
  },

  async deleteDish(id: string): Promise<void> {
    await axios.delete(`${baseURL}/dishes/${id}.json`);
  }
};