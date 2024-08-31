import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import Chart from "../components/Chart";
import bluetoothimg from "../assets/bluetooth.svg";
import splash from "../assets/splash.png";

function Home({ connectionStatus, glucoselevel, activatePump }) {
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Smart Insulin</Text>
        </View>
        <Chart glucoselevel={glucoselevel} />
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#525866",
              marginBottom: 6,
              marginTop: 10,
            }}
          >
            Emerging complications of diabetes
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#525866",
              marginBottom: 6,
              lineHeight: 20,
            }}
          >
            Diabetes is a group of metabolic diseases characterized by
            hyperglycemia resulting from defects in insulin secretion, insulin
            action, or both. The chronic hyperglycemia of diabetes is associated
            with long-term damage, dysfunction, and failure of differentorgans,
            especially the eyes, kidneys, nerves, heart, and blood vessels.
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: "#6178BB",
                textDecorationColor: "#6178BB",
                textDecorationLine: "underline",
                fontWeight: "bold",
              }}
            >
              Learn more
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#E2E7F3",
          padding: 6,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          justifyContent: "center",
          borderRadius: 10,
          marginBottom: 27,
          marginTop: 100,
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#6178BB",
            fontWeight: "bold",
            borderRadius: 6,
            fontSize: 14,
          }}
        >
          {connectionStatus == "Connected"
            ? "Your device is online. Bluetooth connected"
            : connectionStatus}
        </Text>
      </View>
      <TouchableOpacity onPress={activatePump}>
        <View
          style={{ backgroundColor: "#6178BB", padding: 10, borderRadius: 8 }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Activate insulin pump
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Home;
