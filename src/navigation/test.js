const { string, number } = require("yup");

const car = {
  active: bool,
  brand: string,
  carId: string,
  imageUrl: string,
  location: string,
  model: string,
  ownerId: string,
  price: number,
  region: {
    latitude: number,
    longitude: number,
  },
};
