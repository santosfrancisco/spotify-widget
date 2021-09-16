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
        await User.find({ user: req.body.user }, async (err, users) => {
          if (!err && users.length > 1) {
            await User.deleteMany({ user: req.body.user })
            const user = await User.create(req.body)
            res.status(201).json({ success: true, data: user })
          } else if (!err && users.length == 1) {
            const user = await User.findOneAndUpdate({user: req.body.user}, req.body)
            res.status(201).json({ success: true, data: user })
          } else if (!err && users.length == 0) {
            const user = await User.create(req.body)
            res.status(201).json({ success: true, data: user })
          }
        });
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
