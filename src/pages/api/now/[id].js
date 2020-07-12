import dbConnect from '../../../utils/db-connect'
import User from '../../../models/User'
import * as spotifyApi from '../../../services/spotify'
import { useCors } from '../../../middlewares/cors'

export default async function handler(req, res) {
  await useCors(req, res)

  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  const getCurrentSong = async (user) => {
    const data = await spotifyApi.getSong(user.access_token)
      if (data?.data?.error) {
        if(data?.data?.error?.message === "The access token expired" ) {
          const auth = await spotifyApi.refreshToken(user.refresh_token)
      
          await User.findOneAndUpdate({user: id}, {...auth})
      
          return getCurrentSong(auth.access_token)
        }
      }
      
      const song = data?.item?.name
      const artists = data?.item?.artists?.map(a => a.name).join(', ')

      if(data.hasOwnProperty('is_playing')) return 'Nothing is playing now.'

      if(song && artists) return `${song} - ${artists}`
      
      return `Error. Please, try again.`
  }

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne({user: id}, {'_id': 0})
        let song
        if(user) {
          song = await getCurrentSong(user)
        }
        res.status(200).send(song)
      } catch (error) {
        res.status(400).send('Error. Try again.')
      }
      break
    default:
      res.status(400).send('Invalid method. Use GET insted.')
      break
  }
}
