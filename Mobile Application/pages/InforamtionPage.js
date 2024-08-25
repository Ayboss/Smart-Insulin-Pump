import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import diab from "../assets/diaimg.png";

const Card = () => {
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ position: "relative", marginBottom: 16 }}>
        <Image source={diab} style={{ width: "100%", borderRadius: 12 }} />

        <Text
          style={{
            backgroundColor: "#6178BB",
            paddingVertical: 4,
            paddingHorizontal: 10,
            color: "#fff",
            width: "auto",
            alignSelf: "flex-start",
            borderRadius: 7,
            position: "absolute",
            bottom: 12,
            left: 12,
            fontSize: 14,
          }}
        >
          Today
        </Text>
      </View>
      <View>
        <Text style={{ marginBottom: 6, color: "#525866", fontWeight: "bold" }}>
          Emerging Complication of Diabetes
        </Text>
        <Text style={{ color: "#525866", fontSize: 12 }}>
          Complications that have traditionally been associated with diabetes
          mellitus include macrovascular conditions, ...
        </Text>
      </View>
    </View>
  );
};
const InforamtionPage = () => {
  return (
    <ScrollView>
      <View>
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Learn diabetics</Text>
        </View>
        <Card />
        <Card />
        <Card />
      </View>
    </ScrollView>
  );
};

export default InforamtionPage;
