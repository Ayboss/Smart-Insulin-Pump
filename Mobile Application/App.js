import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, PermissionsAndroid } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { atob } from "react-native-quick-base64";
import * as Location from "expo-location";
import { Buffer } from "buffer";

import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import InforamtionPage from "./pages/InforamtionPage";
import Navigation from "./components/Navigation";

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: "Location permission for bluetooth scanning",
        message:
          "Grant location permission to allow the app to scan for Bluetooth devices",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    const check = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );

    if (check) {
      console.log("You can use the ACCESS_COARSE_LOCATION");
    } else {
      console.log("ACCESS_FINE_LOCATION permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

async function requestPermissions() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);

    if (
      granted["android.permission.ACCESS_FINE_LOCATION"] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.BLUETOOTH_SCAN"] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.BLUETOOTH_CONNECT"] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("All permissions granted");
    } else {
      console.log("Some permissions were denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

const bleManager = new BleManager();

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const CHARACTERISTIC_UUID = "beefcafe-36e1-4688-b7f5-00000000000b";
const BLENAME = "Ayobami";

export default function App() {
  const [screen, setScreen] = useState(1);
  const [deviceID, setDeviceID] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Searching...");
  const [glucoselevel, setGlucoseLevel] = useState(0);
  const [logs, setLogs] = useState([]);

  const deviceRef = useRef(null);

  const searchAndConnectToDevice = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error.reason, "HIIIIIII");
        setLogs([...logs, error.reason]);
        setConnectionStatus("Error searching for devices");
        return;
      }
      if (device.name === BLENAME) {
        bleManager.stopDeviceScan();
        setConnectionStatus("Connecting...");
        connectToDevice(device);
      }
    });
  };
  useEffect(() => {
    requestLocationPermission();
    requestPermissions();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    searchAndConnectToDevice();
  }, []);

  useEffect(() => {
    const subscription = bleManager.onDeviceDisconnected(
      deviceID,
      (error, device) => {
        if (error) {
          console.log("Disconnected with error:", error);
        }
        setConnectionStatus("Disconnected");
        console.log("Disconnected device");

        if (deviceRef.current) {
          setConnectionStatus("Reconnecting...");
          connectToDevice(deviceRef.current)
            .then(() => setConnectionStatus("Connected"))
            .catch((error) => {
              console.log("Reconnection failed: ", error);
              setConnectionStatus("Reconnection failed");
            });
        }
      }
    );
    return () => subscription.remove();
  }, [deviceID]);

  const connectToDevice = (device) => {
    return device
      .connect()
      .then((device) => {
        setDeviceID(device.id);
        setConnectionStatus("Connected");
        deviceRef.current = device;
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        return device.services();
      })
      .then((services) => {
        let service = services.find((service) => service.uuid === SERVICE_UUID);
        return service.characteristics();
      })
      .then((characteristics) => {
        console.log(characteristics, "ALL CHARACTERSITICS");
        let stepDataCharacteristic = characteristics.find(
          (char) => char.uuid === CHARACTERISTIC_UUID
        );

        // setStepDataChar(stepDataCharacteristic);
        stepDataCharacteristic.monitor((error, char) => {
          if (error) {
            console.error(error);
            return;
          }
          const rawStepData = atob(char.value);
          console.log("Received step data:", rawStepData);
          setLogs([...logs, rawStepData]);
          setGlucoseLevel(rawStepData);
        });

        // Store the write characteristic reference

        // return writeDataCharacteristic;
      })
      .catch((error) => {
        console.log(error);
        setConnectionStatus("Error in Connection");
      });
  };

  // Function to write data to the ESP32
  const activatePump = () => {
    deviceRef.current
      .writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        Buffer.from("activate").toString("base64") // Convert data to base64 format
      )
      .then(() => {
        console.log("Data sent successfully");
      })
      .catch((error) => {
        console.error("Error sending data", error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {screen == 1 ? (
        <Home
          connectionStatus={connectionStatus}
          glucoselevel={glucoselevel}
          activatePump={activatePump}
        />
      ) : screen == 2 ? (
        <InforamtionPage />
      ) : (
        <ProfilePage />
      )}

      {/* <Button onPress={searchAndConnectToDevice} title="connect again" /> */}

      <Navigation screen={screen} setScreen={setScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F2EF",
    padding: 20,
    paddingTop: 50,
  },
});
