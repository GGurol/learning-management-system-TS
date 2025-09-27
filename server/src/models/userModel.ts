import dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const userSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: {
      name: 'emailIndex',
      global: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
  saveUnknown: false, // Prevents saving unknown properties
});

// Middleware in Dynamoose is handled differently.
// We will handle hashing in the controller before saving.
// The pre-save hook logic is removed from here.

const User = dynamoose.model('User', userSchema);

export default User;