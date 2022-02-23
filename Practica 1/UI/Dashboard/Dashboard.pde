
int temperaturaInterna = 0;
int temperaturaExterna = 0;
int cantidadLuz = 0;
int humedad = 0;
int medicionCO2=0;
int count;
Module[] mods;
int unit=40;

JSONObject json;           // se utiliza para recibir los datos a mostrar
int current;
int last;


void setup() {
  size(1280, 720);
  noStroke();
  background(0);
  ejecutar(40,0.5);
}

void draw() {
  fill (52, 73, 94 );
  rect(20, 20, 1240, 680, 20);
  setTitle();
  
  for (Module mod : mods) {
    mod.update(obtenerRepresentacionVelCo2(medicionCO2));
    //mod.setUnit(10);
    mod.display();
  }
  sensorLuz(cantidadLuz);
  graficoTemperatura(100, temperaturaInterna, "Temperatura del Interior");
  graficoTemperatura(400, temperaturaExterna, "Temperatura en el Ambiente");
  sensorHumedad(humedad);
  sensorCO2(medicionCO2);
  
  current = millis();
  if (current - last >= 5000) {
    obtenerMetricas();
    current = last = millis();
  }
}


void obtenerMetricas() {
  String[] test;
  try {
    test = loadStrings("http://localhost:5000/a");
    saveStrings("datos.json", test);
    json = loadJSONObject("datos.json");
    print(json);
    if (json.isNull("temperatura_interna") || json.isNull("temperatura_externa") || json.isNull("cantidad_luz") || json.isNull("humedad") || json.isNull("medicion_co2")) {
      println("No hay datos registrados");
      temperaturaInterna = 0;
      temperaturaExterna = 0;
      cantidadLuz = 0;
      humedad = 0;
      medicionCO2=0;
      
    } else {
      temperaturaInterna = json.getInt("temperatura_interna");
      temperaturaExterna =json.getInt("temperatura_externa");
      cantidadLuz = json.getInt("cantidad_luz");
      humedad = json.getInt("humedad");
      medicionCO2=json.getInt("medicion_co2");
      
    }
  }
  catch(Exception e) {
    println(e);
  }
}



void setTitle() {
  fill(0, 408, 612);
  textSize(64);
  textAlign(CENTER);
  text("PRACTICA 1 -- G4", 640, 70);
}


void sensorLuz(int luz) {
  textSize(16);
  text("Luz del ambiente", 200, 130);
  int cir=100;
  noStroke();
  float distance=abs(luz-cir-800);
  fill(distance, distance, 0);
  ellipse(100, 200, cir, cir);
  fill(255);
  textSize(48);
  text(luz +" Lumen",270, 220);
}


void graficoTemperatura(int posX, int temperatura, String titulo) {
  fill(0, 408, 612);
  textSize(16);
  text(titulo, posX+30, 430);
  int alturaVariable = temperatura;
  noFill();
  stroke(255, 255, 255);
  rect(posX, 450, 50, 150, 7);

  if (temperatura < 0 || temperatura > 70) {
    temperatura = 0;
    alturaVariable = 0;
  } else {
    alturaVariable = ((temperatura * 100) / 70);
    alturaVariable = alturaVariable * (-1);
  }
  colorRectangulo(temperatura);
  rect(posX, 600, 50, alturaVariable);
  noFill();

  fill(255);
  textSize(48);
  text(temperatura +" °c", posX+100, 550);
}

void colorRectangulo(int temperatura) {
  float temp = map(temperatura, 10, 40, 0, 255);
  fill(temp + 3, temp * -1 + 255, temp * -1 + 255);
}

void sensorHumedad(int humedad){
  fill(0, 408, 612);
  textSize(16);
  text("Humedad en el ambiente", 890, 130);
  fill(255);
  textSize(128);
  text(humedad +"%", 890, 300);
}


void sensorCO2(int co2){
  fill(0, 408, 612);
  textSize(16);
  text("Calidad del aire", 900, 430);
   fill(255);
  textSize(128);
  text(co2 +" ppm", 890, 550);
}


void ejecutar(int unit, float speed) {
  int wideCount = 400 / unit; //alto / cantidad
  int highCount = 200 / unit; // ancho / cantidad
  count = wideCount * highCount;
  mods = new Module[count];
  int index = 0;
  for (int y = 0; y < highCount; y++) {
    for (int x = 0; x < wideCount; x++) {
      mods[index++] = new Module(700+x*unit,430+y*unit, unit/2, unit/2, speed, unit);
    }
  }
}

float obtenerRepresentacionVelCo2(int ppm){
  float speed=0;
  if(ppm < 300) speed=0.56;
  else if(ppm >= 300 && ppm < 500) speed=0.8;
  else if(ppm >= 500 && ppm < 800) speed=5;
  else if(ppm >= 800 && ppm < 1200) speed=80;
  else if(ppm >= 1200) speed=200;
  
  return speed;
}


//float validarIntensidadLuz(int luz){
//  rerturn 0;
//}
