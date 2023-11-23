import { create } from "zustand";

const userStore = create((set) => ({
  current_user: null,
  redirect_to : false,
  setUser: (user) => set({ current_user: user }),
  setRedirectTo: (value) => set({redirect_to: value})
}))

export default userStore