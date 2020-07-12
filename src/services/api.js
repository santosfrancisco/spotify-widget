import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.BASE_URL}/api`
})

export const getUser = async (id) => {
  const { data } = await api.get(`/user/${id}`,)
  return data
}

export const createUser = async (userData) => {
  const {data} = await api.post('/user', userData)
  return data
}

export const updateUser = async (userId, userData) => {
  const { data } = await api.patch(`/user/${userId}`, userData)
  return data
}
