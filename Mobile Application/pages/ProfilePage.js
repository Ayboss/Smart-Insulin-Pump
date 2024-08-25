import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import Phoneicon from "../assets/Icons/Phone";
import Emailicon from "../assets/Icons/Email";

function Card({ Icon, title, value }) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 20 }}>
      {/* ICON */}
      <Icon />
      <View style={{ marginLeft: 16 }}>
        <Text style={{ color: "#525866", fontWeight: 500, fontSize: 18 }}>
          {title}
        </Text>
        <Text style={{ color: "#525866", fontSize: 14 }}>{value}</Text>
      </View>
    </View>
  );
}

export class ProfilePage extends Component {
  render() {
    return (
      <ScrollView>
        <View>
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: 500 }}
            >
              Profile
            </Text>
          </View>
          <Card Icon={Phoneicon} title={"Phone Number"} value={"0814573920"} />
          <Card
            Icon={Emailicon}
            title={"Email Address"}
            value={"bamiayo90@gmail.com"}
          />
          <Text
            style={{
              marginBottom: 20,
              fontSize: 18,
              color: "#525866",
              fontWeight: 500,
            }}
          >
            Emergency Contacts
          </Text>
          <Card Icon={Phoneicon} title={"Ayobami Lawal"} value={"0814573920"} />
          <Card
            Icon={Phoneicon}
            title={"Maduabuchi Kieran"}
            value={"0814573920"}
          />
          <Card Icon={Phoneicon} title={"Ayodele Lawal"} value={"0814573920"} />
        </View>
        <Text
          style={{
            marginBottom: 20,
            fontSize: 18,
            color: "#525866",
            fontWeight: 500,
          }}
        >
          Add Emergency Contacts
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginBottom: 5,
            color: "#525866",
            // fontWeight: "bold",
          }}
        >
          Name
        </Text>
        <TextInput
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
          }}
        />
        <Text
          style={{
            fontSize: 12,
            marginBottom: 5,
            color: "#525866",
            // fontWeight: "bold",
          }}
        >
          Number
        </Text>
        <TextInput
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
          }}
        />
        <TouchableOpacity>
          <View
            style={{ backgroundColor: "#6178BB", padding: 10, borderRadius: 8 }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Add Contact
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});

export default ProfilePage;
