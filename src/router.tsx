export const ROUTER = {
  MAIN: '',
  HOME: {
    MAIN: 'home'
  },
  UNAUTHORIZED: 'denegado',
  LOGIN: () => window.location.href = import.meta.env.VITE_APP_URL
};