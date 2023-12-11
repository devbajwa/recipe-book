/**
    File:  recipeService.js
    Author: Waqas Naeem Bajwa
*/ 
import axios from 'axios';

export const recipeService = {
  async getRecipes() {
    try {
      const response = await axios.get('https://devbajwa-server.onrender.com/api/getRecipes');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  async getRecipe(id) {
    try {
      const response = await axios.get(`https://devbajwa-server.onrender.com/api/getRecipe/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  async saveRecipe(data) {
    try {
      const response = await axios.post('https://devbajwa-server.onrender.com/api/saveRecipe', data);
      console.log('Server Response:', response.data.message);
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },
};