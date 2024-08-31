import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import diab from "../assets/diaimg.png";
import diab2 from "../assets/diaimg2.png";
import diab3 from "../assets/diaimg3.png";

const Card = ({ title, descr, imagesrc }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ position: "relative", marginBottom: 16 }}>
        <Image source={imagesrc} style={{ width: "100%", borderRadius: 12 }} />

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
          {title}
        </Text>
        <Text style={{ color: "#525866", fontSize: 12 }}>{descr}</Text>
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
        <Card
          descr=" Complications that have traditionally been associated with diabetes
          mellitus include macrovascular conditions, ..."
          title=" Emerging Complication of Diabetes"
          imagesrc={diab}
        />
        <Card
          descr=" Diabetes is a condition that happens when your blood sugar is too high. It develops when your pancreas doesn’t..."
          title="Non-Invasive monitoring Testing"
          imagesrc={diab2}
        />
        <Card
          descr=" Diabetes is a condition that happens when your blood sugar is too high. It develops when your pancreas doesn’t..."
          title="Non-Invasive monitoring Testing"
          imagesrc={diab3}
        />
      </View>
    </ScrollView>
  );
};

export default InforamtionPage;
