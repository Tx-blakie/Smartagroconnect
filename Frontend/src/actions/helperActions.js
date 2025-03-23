import axios from 'axios';
import { GET_DASHBOARD_DATA, DASHBOARD_LOADING, DASHBOARD_ERROR } from './types';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get dashboard data
export const getDashboardData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DASHBOARD_LOADING });
    
    const { token } = getState().auth;
    
    const response = await axios.get(`${API_URL}/helper/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    dispatch({
      type: GET_DASHBOARD_DATA,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: error.message
    });
  }
}; 