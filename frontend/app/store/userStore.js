import { create } from "zustand";
import axios from 'axios'
import Cookies from "js-cookie";

const useUserStore = create((set) => ({
  loading: false,
  current_user: null,
  token: null,
  registerUser: async (user) => {
    set({ loading: true })
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_SRV}/api/users/register`, user)
      const userData = res.data
      set({ loading: false })
      return userData
    } catch (error) {
      set({ loading: false })
      return error
    }
  },
  userLogin: async (creds) => {
    set({ loading: true })
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_SRV}/api/users/login`, creds)
      const userData = res.data
      if (userData.status === 'Success') {
        Cookies.set('token', userData.token, { expires: 1 })
        set({
          current_user: userData.userDetails,
          token: userData.token,
        })
        set({ loading: false })
        return 'Success'
      } else if (userData.status === 'Failed') {
        set({ loading: false })
        return userData
      }
    } catch (error) {
      set({ loading: false })
      return error
    }
  },
  logoutUser: async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_SRV}/api/users/logout`)
      const loggedOut = res.data
      if (loggedOut.status === 'Success') {
        Cookies.remove('token')
        set({
          current_user: null,
          token: null,
        })
      }
      return loggedOut
    } catch (error) {
      return error
    }

  }
}))

export default useUserStore