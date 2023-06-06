const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.body.token ;
    // Check if token exists
    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token not provided.' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, jwt_secret);
  
      // Attach the decoded token payload to the request object
      req.user = decoded;
  
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
  };
  
  module.exports = authMiddleware; 