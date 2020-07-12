import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
   access_token: {
    type: String,
  },
  refresh_token: {
    type: String,
  },
  user: {
    type: String,
  },
})

export default mongoose.models.User || mongoose.model('User', UserSchema, 'users')
