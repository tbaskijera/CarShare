import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { View, Text, StyleSheet } from "react-native";
import { useImage } from "@/services/image-select/useImage";
import { Spacer } from "@/components/Spacer";
import { Picker } from "@/components/Picker";
import { useCarCreateUpdate } from "@/features/car-create-update/car-create-update.hook";
import { TextInput } from "@/components/TextInput";
import { LocationPicker } from "@/components/LocationPicker";
import { Slider } from "@/components/Slider";
import { Button } from "@/components/Button";
import { useNavigation } from "@react-navigation/native";
import { useFirebase } from "@/services/firebase-crud/useFirebase";

export const CarCreateUpdateForm = ({ route }) => {
  const { mode } = route?.params || {}; // https://stackoverflow.com/questions/70012657/undefined-is-not-an-object-evaluating-route-params-input-error-when-passing-dat
  const image = useImage();
  const { currentCar, pickerYears, pickerBrands, pickerModels, setCurrentCar } =
    useCarCreateUpdate();
  const navigation = useNavigation();
  const { createCar, isLoading } = useFirebase();

  return (
    <View style={{ width: "90%" }}>
      <ImagePlaceholder
        onPress={image.selectImage}
        image={image.showcase ?? currentCar.imageUrl}
      />
      <Spacer height={30} />
      <Picker
        selectedValue={currentCar.year}
        pickerValues={pickerYears}
        handleChange={(value) => setCurrentCar({ ...currentCar, year: value })}
        label={"Year"}
      />
      <Spacer height={8} />
      <Picker
        selectedValue={currentCar.brand}
        pickerValues={pickerBrands}
        handleChange={(value) => setCurrentCar({ ...currentCar, brand: value })}
        label={"Brand"}
      />
      <Spacer height={8} />
      <Picker
        selectedValue={currentCar.model}
        pickerValues={pickerModels}
        handleChange={(value) => setCurrentCar({ ...currentCar, model: value })}
        label={"Model"}
        enabled={currentCar.brand && currentCar.year ? true : false}
      />

      <LocationPicker
        value={currentCar.location ?? "Location"}
        onPress={() => {
          navigation.navigate("HiddenTabsStack", {
            screen: "LocationSelectScreen",
          });
        }}
        style={{ height: 55 }}
      />
      <Spacer height={30} />
      <Slider
        value={currentCar.price}
        handleChange={(value) =>
          setCurrentCar({ ...currentCar, price: value[0] })
        }
      />
      <Button
        loading={isLoading}
        onPress={async () => {
          await createCar(currentCar, image);
          navigation.goBack();
        }}
        disabled={
          !(
            (currentCar.imageUrl || image.showcase) &&
            currentCar.year &&
            currentCar.brand &&
            currentCar.model &&
            currentCar.location &&
            currentCar.price
          )
        }
        style={{ alignSelf: "center" }}
      >
        Submit
      </Button>
    </View>
  );
};
