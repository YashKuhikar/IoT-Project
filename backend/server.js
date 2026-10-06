require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Reading = require("./models/Reading");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "IoT Weather Monitoring API is running"
    });
});

// ESP32 sends data here
app.post("/api/readings", async (req, res) => {
    try {
        const { temperature, humidity } = req.body;

        if (
            typeof temperature !== "number" ||
            typeof humidity !== "number"
        ) {
            return res.status(400).json({
                message: "Temperature and humidity must be numbers"
            });
        }

        const reading = await Reading.create({
            temperature,
            humidity
        });

        console.log("New reading:", reading);

        res.status(201).json(reading);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to save reading"
        });
    }
});

// Dashboard gets data here
app.get("/api/readings", async (req, res) => {
    try {
        const readings = await Reading
            .find()
            .sort({ timestamp: -1 })
            .limit(50);

        res.json(readings.reverse());

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch readings"
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Wokwi endpoint: http://host.wokwi.internal:${PORT}`);
});