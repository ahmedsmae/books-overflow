import axios from 'axios';

export default () => {
  if (localStorage.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${
      localStorage.token
    }`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
