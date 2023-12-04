import React, {useEffect,useState} from 'react'
import NavMenu from '../Navbar/NavMenu'
import Dropdown from '../Dropdown/Dropdown'
import Graph from '../Graph'
import Wrapper from '../Wrapper'
import News from '../News/News'
import Footer from '../Footer/Footer'
import {fetchStockDetails, fetchNewsDetails} from '../../actions/utilities'
import StockDataWidget from '../StockDataWidget'
import{dropdownOptions, dt, mockNewsDt} from '../Global';


const HomePage = () => {




  const [stockData, setStockData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [selectedDropdownIndex, setSelectedDropdownIndex] = useState(0);

  const fetchData = async (selectedDropdownIndex) => {
    try {
      const response = await fetchStockDetails(selectedDropdownIndex);
      console.log(response.data["Time Series (Daily)"]);
      const formattedData = Object.keys(response.data["Time Series (Daily)"]).map(date => ({
        date,
        ...response.data["Time Series (Daily)"][date]
      }));


      //  const formattedData = Object.keys(dt).map(date => ({
      //   date,
      //   ...dt[date]
      // }));


      setStockData(formattedData);

    const newsDt = await  fetchNewsDetails(selectedDropdownIndex);
      setNewsData(newsDt.articles)

    //  setNewsData(mockNewsDt);
   
 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedDropdownIndex); 
   
  }, [selectedDropdownIndex]);

  return (
    <Wrapper>
      <NavMenu />
      <Dropdown selectedDropdownIndex = {selectedDropdownIndex} onChange={(event)=>{
       const index = dropdownOptions.findIndex(item => item['value'] === event.target.value);
        setSelectedDropdownIndex(index);
      }}/>
      <Graph data = {stockData} />
      {
        stockData.length > 0 && 
        <StockDataWidget data={stockData} />
      }
  {
    newsData.length > 0 && 
    <News data={newsData} />
  }
      <Footer />
    </Wrapper>
  )
}

export default HomePage