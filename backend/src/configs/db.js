const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://surajdevv1:Tv6Sov2ySxskNnyo@cluster0.xdfnvfy.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your application or perform database operations
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
