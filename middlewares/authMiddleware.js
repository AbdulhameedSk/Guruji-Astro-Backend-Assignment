const jwt = require("jsonwebtoken");

const  JWT_SECRET ="SECRET"

// Middleware function to authenticate requests
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  // Check if authorization header is present and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({}); // Return 403 Forbidden status if authentication fails
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the authorization header
  try {
      const decoded = jwt.verify(token, JWT_SECRET); // Verify the token using the secret key

      req.userId = decoded.userId; // Attach the decoded user ID to the request object
      next(); // Call the next middleware or route handler
  } catch (err) {
      return res.status(403).json({"message":"Middleware error", err}); // Return 403 Forbidden status with error message if verification fails
  }
};

module.exports = {
  authMiddleware
}