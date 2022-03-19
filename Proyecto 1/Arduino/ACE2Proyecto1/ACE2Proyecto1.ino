#include "DHT.h"
#include <infrarrojo.h>

/*Modulo HUMEDAD DE TIERRA*/
#define DHTTYPE DHT11   // DHT 22  (AM2302), AM2321

int LandPin = A2;
float LandLecture= 0;

/*Modulo de Sensor Hall*/
volatile int Hall_NumPulsos;        //variable para la cantidad de pulsos recibidos
int Hall_Pin = 2;                   //pin 2 digital
float Hall_FactorConversion = 7.15; //para convertir de frecuencia a caudal
float Hall_Volumen = 0;             //el volumen de agua que se filtro
long Hall_dt=0;                     //variación de tiempo por cada bucle
long Hall_t0=0;                     //millis() del bucle anterior


/*Modulo de Agua Sucia*/
infrarrojo estado_sucio(13);        //DEFINICION DEL PIN DEL ARDUINO A USA/VARIBLE QUE RECIBE EL DATOR
int VALOR_SUCIO;
//int led =12;                      //REDEFINICION DE PIN DE ARDUINO PARA LED INDICADOR DE PULSO(ESTO ES OPCIONAL)
int led_estado_sucio;               //VARIABLE

/*Modulo de Agua Limpia*/
infrarrojo estado_limpia(3);       //DEFINICION DEL PIN DEL ARDUINO A USA/VARIBLE QUE RECIBE EL DATOR
int VALOR_LIMPIA;
//int led =12;                      //REDEFINICION DE PIN DE ARDUINO PARA LED INDICADOR DE PULSO(ESTO ES OPCIONAL)
int led_estado_limpia;              //VARIABLE



void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); 

  /*Modulo Sensor Hall*/
  pinMode(Hall_Pin, INPUT); 
  attachInterrupt(0,ContarPulsos,RISING);//(Interrupción 0(Pin2),función,Flanco de subida) 
  Hall_t0=millis();
}

void loop() {
  // put your main code here, to run repeatedly:
  //Serial.println("MODULO SENSOR HALL");
  String hall_medition = Sensor_Hall();
  //Serial.println("MODULO AGUA SUCIA");
  String sucia_medition = Agua_Sucia();
  //Serial.println("MODULO AGUA LIMPIA");
  String limpia_medition = Agua_Limpia();

  //Serial.println("MODULO HUMEDAD DE TIERRA:");
  String land_medition = land_method();
  String datos = "{\"humedad\": " + land_medition + "," + "\"hall\": " + hall_medition + "," + "\"sucia\": " + sucia_medition + "," + "\"limpia\": " + limpia_medition + ",";
  Serial.print(datos + "\n");
  delay(2000);
}

/*Modulo de HUMEDAD DE TIERRA*/
String land_method(){
  LandLecture = analogRead(LandPin);
  int LandHumidity = map(LandLecture,1023,350,0,100);
  return String(LandHumidity);
}

/*Modulo Sensor Hall*/
void ContarPulsos ()  
{ 
  Hall_NumPulsos++;       //incrementamos la variable de pulsos
} 

int ObtenerFrecuecia() 
{
  int frecuencia;
  Hall_NumPulsos = 0;          //Ponemos a 0 el número de pulsos
  interrupts();                //Habilitamos las interrupciones
  delay(1000);  
  noInterrupts();              //Deshabilitamos  las interrupciones
  frecuencia=Hall_NumPulsos;   //Hz segundo
  return frecuencia;
}

String Sensor_Hall(){
  float frecuencia=ObtenerFrecuecia(); //frecuencia de los pulsos en Hz
  float caudal_L_m=frecuencia/Hall_FactorConversion; //caudal en L/m
  float caudal_Cm3_s= caudal_L_m*(1000/60); //conversion L/m -> cm3/s
  Hall_dt=millis()-Hall_t0; //calculamos la variación de tiempo
  Hall_t0=millis();
  Hall_Volumen=Hall_Volumen+(caudal_Cm3_s)*(Hall_dt/1000); // volumen(L)=caudal(cm3/s)*tiempo(s)
  /*Serial.println("************ MODULO HALL ************");
  Serial.print ("Caudal: "); 
  Serial.print (caudal_Cm3_s); 
  Serial.print ("cm3/s -- Volumen: "); 
  Serial.print (Hall_Volumen); 
  Serial.print (" cm3\n");*/
  return String(Hall_Volumen, 2);
}

/*Modulo de Agua Sucia*/

String Agua_Sucia(){
  led_estado_sucio = estado_sucio.lectura(VALOR_SUCIO);//LED QUE RECOGE EL ESTADO DEL SENSOR
  Serial.println("************ MODULO AGUA SUCIA ************");
  if(led_estado_sucio == 1)//ETAPA DE COMPARACION PARA ACTIVAR UN LED SEGUN EL ESTADO DEL SENSOR
  {
    Serial.print("NADA\n");
    //digitalWrite(led,HIGH);//PRENDE UN LED SI EL SENSOR DETECTA OBSTACULO
    return "1";
  }
  else
  {
    Serial.print("HAY ALGO FRENTE\n");
    //digitalWrite(led,LOW);
    return "0";
  }
  return "555";
}

String Agua_Limpia(){
  led_estado_limpia = estado_limpia.lectura(VALOR_LIMPIA);//LED QUE RECOGE EL ESTADO DEL SENSOR
  //Serial.println("************ MODULO AGUA LIMPIA ************");
  if(led_estado_limpia == 1)//ETAPA DE COMPARACION PARA ACTIVAR UN LED SEGUN EL ESTADO DEL SENSOR
  {
    //Serial.print("NADA\n");
    //digitalWrite(led,HIGH);//PRENDE UN LED SI EL SENSOR DETECTA OBSTACULO
    return "1";
  }
  else
  {
    //Serial.print("HAY ALGO FRENTE\n");
    //digitalWrite(led,LOW);
    return "0";
  }
  return "0";
}
