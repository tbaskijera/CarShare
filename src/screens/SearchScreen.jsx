import { Screen } from "@/components/Screen";
import { Spacer } from "@/components/Spacer";
import { colorAccent } from "@/style/colors";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "@/components/IconButton";
import { SearchList } from "@/features/search-list/search-list.component";
import { useRef, useCallback, useEffect, useContext } from "react";
import CustomBackdrop from "@/components/CustomBackdrop";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ModalScreen } from "@/screens/ModalScreen";
import { useFilters } from "@/features/filters/filters.hook";
import { Chip } from "@/components/Chip";
import { CarContext } from "@/context/CarContext";

export const SearchScreen = () => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["25%", "95%"];

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const { filters, setFilters } = useContext(CarContext);

  return (
    <Screen>
      <Spacer height={16} />
      <Text style={styles.text}>Search</Text>
      <View style={styles.iconButton}>
        <IconButton
          name={"filter"}
          size={30}
          color={"#181c2a"}
          onPress={handlePresentModalPress}
        />
      </View>
      <Spacer height={16}></Spacer>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-start",
        }}
      >
        {filters.brand && (
          <Chip
            text={filters.brand}
            iconName={"close"}
            onClose={() => setFilters({ ...filters, brand: null })}
          />
        )}

        {filters.year && (
          <Chip
            text={`> ${filters.year}`}
            iconName={"close"}
            onClose={() => setFilters({ ...filters, year: null })}
          />
        )}

        {filters.price && (
          <Chip
            text={`$${filters.price[0]} - ${filters.price[1]}`}
            iconName={"close"}
            onClose={() => setFilters({ ...filters, price: null })}
          />
        )}
      </View>
      <Spacer height={30} />
      <SearchList></SearchList>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={(backdropProps) => (
          <CustomBackdrop {...backdropProps} />
        )}
        handleStyle={{ backgroundColor: "#e9e9ed" }}
        style={{ flex: 1 }}
      >
        <ModalScreen
          handleDismissModalPress={handleDismissModalPress}
        ></ModalScreen>
      </BottomSheetModal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 35, color: colorAccent, alignSelf: "flex-start" },
  iconButton: {
    position: "absolute",
    top: "7%",
    left: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
});
