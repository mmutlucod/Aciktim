const axios = require('axios');

const apiUrl = 'https://api.example.com/menuItems';

axios.get(apiUrl)
  .then(response => {
    const menuItems = response.data; 
    console.log(menuItems); 
  })
  .catch(error => {
    console.error('Hata var!!!!:', error);
  });
