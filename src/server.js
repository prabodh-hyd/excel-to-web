// server.js (Backend)
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Initialize Firebase Admin SDK with your service account credentials
admin.initializeApp({
  credential: admin.credential.cert(require('./path/to/serviceAccountKey.json')),
});

// Middleware to verify Firebase ID token
app.use(async (req, res, next) => {
  const idToken = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];

  if (!idToken) {
    return res.status(403).send('Authorization token missing');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach user info to the request object
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});

// Protected route
app.get('/protected', (req, res) => {
  res.send(`Hello, ${req.user.uid}! You are authenticated.`);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
