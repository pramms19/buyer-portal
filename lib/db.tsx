type User = {
  id: string;
  name: string;
  email: string;
  password: string; 
  role: string;
};

type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
};

type Favourite = {
  userId: string;
  propertyId: string;
};

export const db = {
  users: [] as User[],
  properties: [
    { id: "1", title: "Modern Apartment", location: "Kathmandu", price: 50000 },
    { id: "2", title: "Luxury Villa", location: "Pokhara", price: 150000 },
  ] as Property[],
  favourites: [] as Favourite[],
};