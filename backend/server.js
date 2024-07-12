import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// Determine __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express();
const PORT = process.env.PORT || 7000; // Node.js server port

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static(path.join(__dirname, 'uploads')));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Serve React app
const frontendPath = path.join(__dirname, '../frontend/dist'); // Adjust path according to your structure
app.use(express.static(frontendPath));


app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});


// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server runnings at http://0.0.0.0:${PORT}/`);
});
