export interface IDishShort {
    name: string;
    description: string;
    price: number;
  }
  
  export interface IDish extends IDishShort {
    id: string;
  }
  
  export type FirebaseResponse<T> = {
    [key: string]: T;
  };