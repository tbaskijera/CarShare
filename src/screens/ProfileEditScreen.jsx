import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { Spacer } from "@/components/Spacer";
import { TextInput } from "@/components/TextInput";
import { useImage } from "@/services/image-select/useImage";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { colorAccent } from "@/style/colors";
import { useProfileEdit } from "@/features/edit-profile/profile-edit.hook";

export const ProfileEditScreen = ({ navigation }) => {
  const { showcase, selectImage, name, blob } = useImage();
  const {
    userData,
    isLoading,
    setIsLoading,
    changeName,
    changeSurname,
    submitChanges,
  } = useProfileEdit();
  return (
    <Screen>
      <Spacer height={70}></Spacer>
      <TouchableOpacity
        onPress={async () => {
          await selectImage();
        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            justifyContent: "center",
            borderRadius: 100,
            overflow: "hidden",
            borderWidth: 3,
            borderColor: colorAccent,
          }}
        >
          <Image
            resizeMode="cover"
            source={{ uri: showcase ?? userData.avatar }}
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </View>
      </TouchableOpacity>
      <Spacer height={10}></Spacer>
      <TextInput
        label={"Name"}
        value={userData.name}
        onChangeText={(text) => changeName(text)}
      ></TextInput>
      <Spacer height={10}></Spacer>
      <TextInput
        label={"Surname"}
        value={userData.surname}
        onChangeText={(text) => changeSurname(text)}
      ></TextInput>
      <Spacer height={20}></Spacer>

      <Button
        loading={isLoading}
        onPress={async () => {
          await submitChanges(name, blob);
          navigation.goBack();
        }}
      >
        Save changes
      </Button>
    </Screen>
  );
};
