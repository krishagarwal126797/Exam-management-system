import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import routes from './routes/routes.js'; // Import routes
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for sessions
app.use(session({
  secret: "my secret key",
  saveUninitialized: true,
  resave: false
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

const __dirname = path.resolve(); // Ensure correct absolute path

app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use routes
app.use("", routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
