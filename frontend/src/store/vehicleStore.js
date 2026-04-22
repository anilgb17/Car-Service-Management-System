import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const API_URL = 'http://localhost:5000/api';

const useVehicleStore = create((set) => ({
  vehicles: [],
  isLoading: false,
  error: null,

  fetchVehicles: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.get(`${API_URL}/vehicles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ vehicles: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch vehicles', isLoading: false });
    }
  },

  addVehicle: async (vehicleData) => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.post(`${API_URL}/vehicles`, vehicleData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set((state) => ({ 
        vehicles: [...state.vehicles, response.data], 
        isLoading: false 
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to add vehicle', isLoading: false });
      return false;
    }
  },

  deleteVehicle: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      await axios.delete(`${API_URL}/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set((state) => ({
        vehicles: state.vehicles.filter((v) => v.vehicle_id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete vehicle', isLoading: false });
    }
  }
}));

export default useVehicleStore;
