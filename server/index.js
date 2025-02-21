const express = require("express");
const cors = require("cors");
const {config} = require("dotenv");
const connectDB = require("./src/configs/db");
const taskRoute = require("./src/routes/task.route");
config();

const app = express();
const PORT = process.env.PORT || 9080
const DB_URL = process.env.MONGO_URL

app.use(cors());
app.use(express.json());
app.use('/api/task', taskRoute);

app.get('/', (req, res) => {
    res.send("This is a home route.");
})

app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    connectDB(DB_URL)
})
