import axios from 'axios';
import {dropdownOptions} from '../../src/components/Global';
const url = 'https://www.alphavantage.co/query';



function getStockSearchValue(index){
  return dropdownOptions[index].value;
}
function getNewsSearchValue(index){
  return dropdownOptions[index].newsName;
}
export function fetchStockDetails(index){
    const params = {
      function: 'TIME_SERIES_DAILY',
      symbol: getStockSearchValue(index),
      interval: '5min',
      apikey: 'OQ9CGP8R8KIF0K30',
    };
    
    const config = {
      method: 'get',
      url: url,
      params: params,
      headers: {
        'User-Agent': 'request',
      },
    };
    
    return axios(config)
     
}



// news section

export const fetchNewsDetails = async (index) => {
  const url = 'https://newsapi.org/v2/everything';
  const params = {
    q: getNewsSearchValue(index),
    from: '2023-11-30',
    sortBy: 'publishedAt',
    apiKey: '19bcb9019abf4e90bb5dfe1d2cf0b3e7',
    language: 'en'

  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};