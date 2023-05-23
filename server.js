const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Secret key for JWT signing and verification
const secretKey = 'your-secret-key';

// In-memory user database (replace with a database in a real-world application)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Signup route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  
  // Check if the username already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Create a new user
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  
  res.json({ message: 'Signup successful' });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Find the user in the database
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected data' });
});

// Middleware to authenticate the JWT token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    
    req.user = user;
    next();
  });
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
