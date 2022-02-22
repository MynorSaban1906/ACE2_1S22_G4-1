#include "DHT.h"
// Uncomment whatever type you're using!
//#define DHTTYPE DHT11   // DHT 11
#define DHTTYPE DHT11   // DHT 22  (AM2302), AM2321
//#define DHTTYPE DHT21   // DHT 21 (AM2301)

// TEMPERATURE MODULE
const int DHTPin9 = 9;     // what digital pin we're connected to outside
const int DHTPin8 = 8;     // what digital pin we're connected to indoor
DHT dht9(DHTPin9, DHTTYPE);
DHT dht8(DHTPin8, DHTTYPE);

// CO2 (AIR QUALITY) MODULE
const int co2Pin = A1;

// LIGHT MODULE
const int ldrPin = A0;
int sensorValue = 0;

// LAND MODULE
int LandPin = A2;
float LandLecture= 0;

void setup() {
   Serial.begin(9600);
   //Serial.println("App Start!\n");

   // TEMPERATURE MODULE
   dht9.begin(); // outside temperature
   dht8.begin(); // indoor temperature

   // CO2 MODULE
   pinMode(co2Pin, INPUT);
   
   // LIGHT MODULE
   pinMode(ldrPin, INPUT);
}
void loop() {
   // Wait a few seconds between measurements.
   delay(2000); 
   
   // Temperature module uses digital pins 9 and 8.
   //Serial.print("TEMPERATURE MODULE: \n");
   String t_outside = temperature_DHT9();
   
   String t_inside = temperature_DHT8();
     
   //Serial.print("CO2 MODULE (Air Quality): \n");
   String co2_medition = co2_method();                
   
   //Serial.println("LIGHT MODULE:");
   String light_medition = light_method();

   //Serial.println("LAND MODULE:");
   String land_medition = land_method();
   
   String datos = "{\"temperatura_interna\": " + t_inside + ", \"temperatura_externa\": " + t_outside + ", \"cantidad_luz\": " + light_medition + ", \"humedad\": " + land_medition + ", \"medicion_co2\": " + co2_medition + ",";
   Serial.print(datos + "\n");
   
}

String temperature_DHT9() {
   // Reading temperature or humidity takes about 250 milliseconds!
   float h9 = dht9.readHumidity();
   float t9 = dht9.readTemperature();
   if (isnan(h9) || isnan(t9)) {
      //Serial.println("Failed to read from DHT9 sensor!");
      return "-1";
   }
   /*Serial.print("==========================");
   Serial.print("Humidity OUTSIDE: ");
   Serial.print(h9);
   Serial.print(" %\t");
   Serial.print("Temperature OUTSIDE: ");
   Serial.print(t9);
   Serial.print(" *C");
   Serial.print("==========================\n");*/
   
   return String(t9, 2);
}

String temperature_DHT8() {
   // Reading temperature or humidity takes about 250 milliseconds!
   float h8 = dht8.readHumidity();
   float t8 = dht8.readTemperature();
   if (isnan(h8) || isnan(t8)) {
      //Serial.println("Failed to read from DHT8 sensor!");
      return "-2";
   }
   /*Serial.print("-------------------------");
   Serial.print("Humidity INDOOR: ");
   Serial.print(h8);
   Serial.print(" %\t");
   Serial.print("Temperature INDOOR: ");
   Serial.print(t8);
   Serial.print(" *C");
   Serial.print("-------------------------\n");*/
   return String(t8, 2);
}

String co2_method() {
  int sensorValue = analogRead(co2Pin);
  //Serial.print("AirQuality=");
  //Serial.print(sensorValue, DEC);
  //Serial.println(" PPM");
  return String(sensorValue);  
}

String light_method() {
  sensorValue = analogRead(ldrPin);
  //Serial.print(sensorValue);
  //Serial.println(" unidades");
  return String(sensorValue);
}

String land_method(){
  LandLecture = analogRead(LandPin);
  int LandHumidity = map(LandLecture,1023,350,0,100);
  //Serial.println(LandLecture);
  //Serial.print(LandHumidity);
  //Serial.println(" %");
  return String(LandHumidity);
}
