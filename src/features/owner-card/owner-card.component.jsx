import { useOwnerCard } from "@/features/owner-card/owner-card.hook";
import { StyleSheet, Text, View, Image } from "react-native";

export const OwnerCard = () => {
  const { owner } = useOwnerCard();
  return owner ? (
    <View style={styles.ownerContainer}>
      <View style={styles.ownerImageContainer}>
        <Image
          resizeMode="cover"
          source={{ uri: owner.avatar }}
          style={styles.ownerImage}
        ></Image>
      </View>
      <View style={{ marginTop: 8, marginLeft: 5 }}>
        <Text
          style={{ color: "#181c2a", fontWeight: "700", fontSize: 16 }}
        >{`${owner.name} ${owner.surname}`}</Text>
        <Text style={{ color: "#181c2a80", fontSize: 16 }}>Owner </Text>
      </View>
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  ownerContainer: {
    backgroundColor: "white",

    height: 80,
    width: "90%",
    borderRadius: 25,
    flexDirection: "row",
    padding: 8,
  },

  ownerImageContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "orange",
    overflow: "hidden",
  },

  ownerImage: {
    width: "100%",
    height: "100%",
  },
});
