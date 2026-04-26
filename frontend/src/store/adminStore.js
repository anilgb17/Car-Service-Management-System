import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const API_URL = 'http://localhost:5000/api/admin';

const useAdminStore = create((set) => ({
  dashboardData: null,
  allBookings: [],
  allCustomers: [],
  allServices: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.get(`${API_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ dashboardData: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch dashboard data', isLoading: false });
    }
  },

  fetchAllBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.get(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ allBookings: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch bookings', isLoading: false });
    }
  },

  updateBookingStatus: async (bookingId, status) => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      await axios.put(`${API_URL}/bookings/${bookingId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      set((state) => ({
        allBookings: state.allBookings.map(b => 
          b.booking_id === bookingId ? { ...b, status } : b
        ),
        isLoading: false
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update booking', isLoading: false });
      return false;
    }
  },

  fetchAllCustomers: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.get(`${API_URL}/customers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ allCustomers: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch customers', isLoading: false });
    }
  },

  deleteCustomer: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      await axios.delete(`${API_URL}/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set((state) => ({
        allCustomers: state.allCustomers.filter(c => c.user_id !== id),
        isLoading: false
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete customer', isLoading: false });
      return false;
    }
  },

  fetchAllServices: async () => {
    set({ isLoading: true, error: null });
    try {
      // Services are public to view, but we can fetch them here for admin management
      const response = await axios.get(`http://localhost:5000/api/services`);
      set({ allServices: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch services', isLoading: false });
    }
  },

  createService: async (serviceData) => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.post(`http://localhost:5000/api/services`, serviceData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set((state) => ({ 
        allServices: [...state.allServices, response.data], 
        isLoading: false 
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create service', isLoading: false });
      return false;
    }
  },

  updateService: async (id, serviceData) => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.put(`http://localhost:5000/api/services/${id}`, serviceData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set((state) => ({
        allServices: state.allServices.map(s => s.service_id === id ? response.data : s),
        isLoading: false
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update service', isLoading: false });
      return false;
    }
  },

  deleteService: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      await axios.delete(`http://localhost:5000/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set((state) => ({
        allServices: state.allServices.filter(s => s.service_id !== id),
        isLoading: false
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete service', isLoading: false });
      return false;
    }
  },

  allStaff: [],
  fetchAllStaff: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.get(`${API_URL}/staff`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ allStaff: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch staff', isLoading: false });
    }
  },

  createStaff: async (staffData) => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const response = await axios.post(`${API_URL}/staff`, staffData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set((state) => ({ 
        allStaff: [...state.allStaff, response.data], 
        isLoading: false 
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create staff', isLoading: false });
      return false;
    }
  },

  deleteStaff: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      await axios.delete(`${API_URL}/staff/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set((state) => ({
        allStaff: state.allStaff.filter(s => s.user_id !== id),
        isLoading: false
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete staff', isLoading: false });
      return false;
    }
  }
}));

export default useAdminStore;
