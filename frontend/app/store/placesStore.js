import { create } from "zustand";
import axios from 'axios'

const usePlacesStore = create((set) => ({
  loading: false,
  userPlaces: []
}))