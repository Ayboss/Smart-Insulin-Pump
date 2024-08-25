#include <EEPROM.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <Stepper.h>

// VARIABLES DECLERATION
#define SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define GLUCOSE_DATA_CHAR_UUID "beefcafe-36e1-4688-b7f5-00000000000b"

BLECharacteristic *pGlucoseDataCharacteristic;

int value;
int voltval;
int irpin = 13;
int randomNumber;
String data;
#define BUTTON_PIN 14

// SET MOTOR STEPS PER REVOLUTION
const int stepsPerRevolution = 2048; 
const int revolutionSteps = 900; 

// INITIALIZING STEPER MOTOR 
Stepper myStepper(stepsPerRevolution, 18, 17, 19, 16);

void activatePump(){
  
  Serial.println("clockwise");
  myStepper.step(revolutionSteps);
  delay(500);

  
  Serial.println("counterclockwise");
  myStepper.step(-revolutionSteps);
  delay(500);
}

// CALLBACKS CLASS TO HANDLE WRITES TO THE CHARACTERISTIC
class MyCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    String value = pCharacteristic->getValue();
    Serial.print("Received data: ");
    Serial.println(value);

    if(value == "activate"){
      activatePump();
    }
  }
};



void setup() {

  // INITIALIZE THE SERIAL PORT
  Serial.begin(9600);
  delay(2000);

  // CREATE BLE DEVICE
  BLEDevice::init("Ayobami");
  
  // CREATE BLE SERVER AND SERVICE
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);


  // CREATE DATA CHARACTERISTICS
  pGlucoseDataCharacteristic = pService->createCharacteristic(
      GLUCOSE_DATA_CHAR_UUID,
      BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY | BLECharacteristic::PROPERTY_WRITE);
  pGlucoseDataCharacteristic->addDescriptor(new BLE2902());
  
  // SET CALLBALLS FOR WRITE ACTIONS FROM CLIENT
  pGlucoseDataCharacteristic->setCallbacks(new MyCallbacks());

  // START BLE server 
  pService->start();

  // ADVERTISING BLE SERVER 
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  // pAdvertising->setScanResponse(true);
  // pAdvertising->setMinPreferred(0x06);
  // pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();

  Serial.println("BLE device is ready to be connected");

  // SET PUSH BUTTON PINMODE
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  // SETUP IR LED PINMODE
  pinMode(irpin, INPUT);
  
  // SET SPEED OF MOTOR 
  myStepper.setSpeed(10);

  randomSeed(analogRead(0));
}

void loop() {
  
  // IF PINMODE IS PRESSED
  if (digitalRead(BUTTON_PIN) == HIGH) {
    Serial.println("BUTTON PRESSED");
    activatePump();
    delay(1000); // Debouncing the button press
  }

  // READ IR VALUE 
   value = analogRead(irpin);
   voltval = map(value, 0, 1023, 70, 141);
   randomNumber = random(70, 141); 
   data = String(randomNumber);

  pGlucoseDataCharacteristic->setValue(data.c_str());
  pGlucoseDataCharacteristic->notify();
  delay(2000);


}



