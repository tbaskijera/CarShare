import * as ImagePicker from "expo-image-picker";
import { getImageName } from "@/utils/getImageName";
import { useState } from "react";

export const useImage = () => {
  const [blob, setBlob] = useState(null);
  const [name, setName] = useState(null);
  const [showcase, setShowcase] = useState(null);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      const imageData = await fetch(result.uri);
      const imageBlob = await imageData.blob();

      setBlob(imageBlob);
      setName(getImageName(result.uri));
      setShowcase(result.uri);
    }
  };
  return {
    blob,
    name,
    showcase,
    selectImage,
  };
};
