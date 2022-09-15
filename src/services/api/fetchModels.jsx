import { capitalizeString } from "@/utils/capitalizeString";

export const fetchModels = async (brand, year) => {
  const fetchedModels = [];
  try {
    console.log("FETCHING");
    const response = await fetch(
      `https://api.api-ninjas.com/v1/cars?limit=15&make=${brand}&year=${year}`,
      {
        headers: {
          "X-Api-Key": "OLpKx6ETv8umz3P7i63Pdg==5KlPbLzDjaA09GwY",
        },
      }
    );
    const json = await response.json();

    json.forEach((item) => {
      item = capitalizeString(item.model);
      fetchedModels.push({ label: item, value: item });
    });
  } catch (error) {
    console.error(error);
  }
  return fetchedModels;
};
