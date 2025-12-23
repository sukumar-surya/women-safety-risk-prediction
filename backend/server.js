import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.ML_API_URL}/predict`,
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Prediction failed" });
  }
});

app.listen(5000, () => {
  console.log("Node server running on port 5000");
});
