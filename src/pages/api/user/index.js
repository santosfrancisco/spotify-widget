import dbConnect from '../../../utils/db-connect'
import User from '../../../models/User'
import { useCors } from '../../../middlewares/cors'

export default async function handler(req, res) {
  await useCors(req, res)
  
  const {
    method,
  } = req

  await dbConnect()

  switch (method) {

    case 'POST':
      try {
        const user = await User.create(req.body) 
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
