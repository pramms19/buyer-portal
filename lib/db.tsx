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
  img: string;
};

type Favourite = {
  userId: string;
  propertyId: string;
};

export const db = {
  users: [] as User[],
  properties: [
    {
      id: "1",
      title: "Modern House",
      location: "Kathmandu",
      price: 50000,
      img: "/House1",
    },
    {
      id: "2",
      title: "Luxury Villa",
      location: "Pokhara",
      price: 150000,
      img: "/House2",
    },
    {
      id: "3",
      title: "Cozy Modern House",
      location: "Lalitpur",
      price: 45000,
      img: "/House3",
    },
    {
      id: "4",
      title: "Peaceful Modern Villa",
      location: "Pokhara",
      price: 170000,
      img: "/House5",
    },
    {
      id: "5",
      title: "Modern House",
      location: "Kathmandu",
      price: 50000,
      img: "/House6",
    },
    {
      id: "6",
      title: "Luxury Cottage",
      location: "Lalitpur",
      price: 75000,
      img: "/House4",
    },
  ] as Property[],
  favourites: [] as Favourite[],
};
