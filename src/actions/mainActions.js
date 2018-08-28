import * as mainConstanst from '../reducers/constant'
import axios from "axios";
let mockUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
let mockID = ',test&APPID=b2a83818e8669b44cdf5ad3db4fce355';
export const getRecipe = (city) => async dispatch => {
  try {
    let url = mockUrl+city+mockID;
    let url2 = mockUrl+"New York"+mockID;
    let url3 = mockUrl+"London"+mockID;
    const city = await axios.get(url);
    const city1 = await axios.get(url2);
    const city2 = await axios.get(url3);
    let cities= [city.data,city1.data,city2.data];
    if(!city.data){
      throw new Error({'err':'response without data'});
    }
    const localUsers = JSON.parse(localStorage.getItem("cities"));
    if (!localStorage.getItem("cities" )) {
      dispatch({
        type: mainConstanst.FETCH_recipes_SUCCESS,
        payload:cities
      });
    } else {
      dispatch({
        type: mainConstanst.FETCH_LOCAL_RECIPES_SUCCESS,
        payload:cities
      });
    }
  }
  catch (err) {
    const localUsers = JSON.parse(localStorage.getItem("cities"));
    if (!localStorage.getItem("cities")) {
      dispatch({
        type: mainConstanst.FETCH_recipes_SUCCESS,
        cities:null
      });
    } else {
      dispatch({
        type: mainConstanst.FETCH_LOCAL_RECIPES_SUCCESS,
        recipes: localUsers
      });
    }

  }
};
export const searchRecipe = value => {
  return {
    type: mainConstanst.SEARCH_RECIPE,
    value
  };
};
export const removeRecipe = recipe => {
  return {
    type: mainConstanst.REMOVE_MY_RECIPE,
    recipe
  };
};
export const addRecipe = recipe => {
  return {
    type: mainConstanst.ADD_MY_RECIPE,
    recipe
  };
};

