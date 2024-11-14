const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from the header
  const token = req.header('Authorization')?.split(' ')[1]; // Expected format: "Bearer <token>"

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add the decoded payload (e.g., user ID) to the request object

    next(); // Move on to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
