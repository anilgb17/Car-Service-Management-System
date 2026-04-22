import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const API_URL = 'http://localhost:5000/api';

const useBookingStore = create((set) => ({
  bookings: [],
  services: [],
  isLoading: false,
  error: null,

  fetchServices: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/services`);
      set({ services: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch services', isLoading: false });
    }
  },

  fetchBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.get(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ bookings: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch bookings', isLoading: false });
    }
  },

  createBooking: async (bookingData) => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.post(`${API_URL}/bookings`, bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set((state) => ({ 
        bookings: [...response.data, ...state.bookings], 
        isLoading: false 
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create booking', isLoading: false });
      return false;
    }
  }
}));

export default useBookingStore;
