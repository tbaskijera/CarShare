import { useSearchList } from "@/features/search-list/search-list.hook";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { getDistance } from "geolib";
import { ResultNumber } from "@/components/ResultNumber";

import { Card } from "@/components/Card";

export const SearchList = () => {
  const { filteredCars, isRefreshing, setIsRefreshing, region } =
    useSearchList();
  const renderItem = ({ item }) => (
    <Card
      car={item}
      distance={region && getDistance(region, item.region, 100) / 1000}
    />
  );

  return (
    <View style={{ width: "100%" }}>
      {filteredCars && (
        <ResultNumber number={filteredCars.length}></ResultNumber>
      )}
      <View style={{ borderRadius: 25, overflow: "hidden" }}>
        <FlatList
          data={filteredCars}
          renderItem={renderItem}
          keyExtractor={(item) => item.carId}
          // extraData={{ filteredCars }}
          onRefresh={() => {
            setIsRefreshing(true);
          }}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          contentContainerstyle={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
          }}
          style={{ borderRadius: 25, marginBottom: 210 }}
        ></FlatList>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
