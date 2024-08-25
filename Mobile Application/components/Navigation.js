import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Homeicon from "../assets/Icons/Home";
import Walleticon from "../assets/Icons/Wallet";
import Profileicon from "../assets/Icons/Profile";

const Navigation = ({ screen, setScreen }) => {
  return (
    <View
      style={{
        justifyContent: "space-around",
        flexDirection: "row",
        paddingVertical: 17,
        borderTopColor: "#D3D0C5",
        borderTopWidth: 1,
      }}
    >
      <TouchableOpacity onPress={() => setScreen(1)}>
        <View style={{ alignItems: "center" }}>
          <Homeicon active={screen == 1} />
          <Text
            style={{ marginTop: 8, color: screen == 1 ? "#6178BB" : "#909090" }}
          >
            Home
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen(2)}>
        <View style={{ alignItems: "center" }}>
          <Walleticon active={screen == 2} />
          <Text
            style={{ marginTop: 8, color: screen == 2 ? "#6178BB" : "#909090" }}
          >
            Information
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen(3)}>
        <View style={{ alignItems: "center" }}>
          <Profileicon active={screen == 3} />
          <Text
            style={{ marginTop: 8, color: screen == 3 ? "#6178BB" : "#909090" }}
          >
            Profile
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Navigation;
