import { GET_DASHBOARD_DATA, DASHBOARD_LOADING, DASHBOARD_ERROR } from '../actions/types';

const initialState = {
  dashboardData: {
    activeRequests: [],
    completedRequests: [],
    pendingPayments: [],
    helperStats: {
      completionRate: 0,
      averageRating: 0,
      totalEarnings: 0,
      requestsCompleted: 0
    }
  },
  loading: false,
  error: null
};

export default function helperReducer(state = initialState, action) {
  switch (action.type) {
    case DASHBOARD_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: action.payload,
        loading: false,
        error: null
      };
    case DASHBOARD_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
} 