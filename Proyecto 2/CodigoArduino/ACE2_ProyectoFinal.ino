// Modulo de Temperatura
#include "DHT.h"
#define DHTTYPE DHT11   // DHT 22  (AM2302), AM2321

// Modulo de MQ4 - Gas Metano
#define MQpin A1
int pct=0;

// Modulo de Temperatura
const int DHTPin9 = 9;     // what digital pin we're connected to
DHT dht9(DHTPin9, DHTTYPE);

// Modulo Bluetooth
char incomingValue = 0;
String cmd="";

// Modulo Electrovalvula
const int electrovalvula=13;
int val=0;


void setup() {
  Serial.begin(9600);
  // Modulo de Temperatura
  dht9.begin();
  // Modulo de Gas Metano
  pinMode(MQpin, INPUT_PULLUP);
  // Modulo de electrovalvula
  pinMode(electrovalvula,OUTPUT);
}

void loop() {
  delay(2000); 
  // Modulo de Botones para cerrar y abrir valvula
  electrovalvula_funcion();
  // Temperature module uses digital pins 9
  // Serial.print("TEMPERATURE MODULE: \n");
  String temp_contenedor = temperature_DHT9();
  String gas_contenedor = gasMetano_MQ4A1();
  String datos = "{\"temperatura\": " + temp_contenedor + "," + gas_contenedor + ",";
  Serial.print(datos);

  
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

String gasMetano_MQ4A1() {
  //Serial.println("Midiendo.....");
  int gas_value=analogRead(MQpin);
  //Serial.print("Medicion obtenida: ");
  //Serial.println(gas_value);
  pct=(gas_value-60)/9.64;
  //Serial.println(pct);
  
  return "\"cantidad_gas\": " + String(gas_value) + "," + "\"porcentaje_gas\": " + String(pct);
}

String electrovalvula_funcion() {
  cmd = "";
 //Read data from HC06
  while(Serial.available()>0){
    cmd+=(char)Serial.read();
  }

  /* ------- Analizando los valores que envía HC-06 ------- */
  if(cmd=="1a"){
    //Serial.println("Encender chispa");
    digitalWrite(electrovalvula,HIGH);
    digitalWrite(electrovalvula,LOW);
  }else if(cmd=="0a"){
    //Serial.println("Apagar chispa");
    digitalWrite(electrovalvula,HIGH);
    digitalWrite(electrovalvula,LOW);
  }else if(cmd=="1b"){
    //Serial.println("Abrir valvula");
    digitalWrite(electrovalvula,HIGH);
    digitalWrite(electrovalvula,LOW);
  }else if(cmd=="0b"){
    //Serial.println("Cerrar valvula");
    digitalWrite(electrovalvula,HIGH);
    digitalWrite(electrovalvula,LOW);
  }
}
