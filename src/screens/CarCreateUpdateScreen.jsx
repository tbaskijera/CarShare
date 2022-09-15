import { LocationPicker } from "@/components/LocationPicker";
import { Screen } from "@/components/Screen";
import { Spacer } from "@/components/Spacer";
import { CarCreateUpdateForm } from "@/features/car-create-update/car-create-update.component";

export const CarCreateUpdateScreen = () => {
  return (
    <Screen>
      <Spacer height={80}></Spacer>
      <CarCreateUpdateForm></CarCreateUpdateForm>
    </Screen>
  );
};
