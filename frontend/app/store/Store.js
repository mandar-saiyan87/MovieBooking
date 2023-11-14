import { create } from "zustand";

const userStore = create((set) => ({
  current_user: null,
  setUser: (user) => set({ current_user: user })
}))

export default userStore