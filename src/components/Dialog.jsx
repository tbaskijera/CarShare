import { colorAccent } from "@/style/colors";
import RNDialog from "react-native-dialog";

export const Dialog = ({
  title,
  description,
  visible,
  setVisible,
  onPressConfirm,
}) => {
  return (
    <RNDialog.Container
      visible={visible}
      style={{ borderRadius: 25, oveflow: "hidden" }}
    >
      <RNDialog.Title>{title}</RNDialog.Title>
      <RNDialog.Description>{description}</RNDialog.Description>
      <RNDialog.Button
        label="Cancel"
        onPress={() => setVisible(false)}
        color={colorAccent}
        bold={true}
      />
      <RNDialog.Button
        label="Confirm"
        onPress={onPressConfirm}
        color={"white"}
        bold={true}
        style={{ backgroundColor: colorAccent, borderRadius: 25 }}
      />
    </RNDialog.Container>
  );
};
