#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

#define DHTPIN 16
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "Wokwi-GUEST";
const char* password = "";

// Direct connection from Wokwi to your Windows computer
const char* serverURL =
    "http://host.wokwi.internal:5000/api/readings";


void connectWiFi()
{
    Serial.println();
    Serial.println("Connecting to WiFi...");

    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password, 6);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println();
    Serial.println("WiFi connected!");

    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
}


void setup()
{
    Serial.begin(115200);
    delay(1000);

    Serial.println();
    Serial.println("================================");
    Serial.println("IoT Weather Monitoring System");
    Serial.println("================================");

    dht.begin();

    connectWiFi();

    Serial.print("Backend URL: ");
    Serial.println(serverURL);
}


void loop()
{
    if (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("WiFi disconnected.");
        connectWiFi();
    }

    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    if (isnan(temperature) || isnan(humidity))
    {
        Serial.println("ERROR: DHT22 reading failed");
        delay(5000);
        return;
    }

    Serial.println();
    Serial.println("Sensor Reading:");

    Serial.print("Temperature: ");
    Serial.print(temperature, 2);
    Serial.println(" °C");

    Serial.print("Humidity: ");
    Serial.print(humidity, 2);
    Serial.println(" %");


    String payload =
        "{\"temperature\":" +
        String(temperature, 2) +
        ",\"humidity\":" +
        String(humidity, 2) +
        "}";

    Serial.print("JSON: ");
    Serial.println(payload);


    WiFiClient client;
    HTTPClient http;

    http.setConnectTimeout(10000);
    http.setTimeout(10000);

    Serial.println("Connecting to backend...");
    Serial.println(serverURL);


    if (!http.begin(client, serverURL))
    {
        Serial.println("ERROR: HTTPClient.begin() failed");
        delay(5000);
        return;
    }


    http.addHeader("Content-Type", "application/json");

    Serial.println("Sending data to server...");

    int httpCode = http.POST(payload);

    Serial.print("HTTP Status: ");
    Serial.println(httpCode);


    if (httpCode > 0)
    {
        String response = http.getString();

        Serial.print("Server Response: ");
        Serial.println(response);

        if (httpCode == 201)
        {
            Serial.println("SUCCESS: Data received by backend!");
            Serial.println("SUCCESS: Data saved to MongoDB!");
        }
    }
    else
    {
        Serial.print("POST Error: ");
        Serial.println(http.errorToString(httpCode));
    }


    http.end();

    Serial.println("-------------------------------");

    delay(5000);
}