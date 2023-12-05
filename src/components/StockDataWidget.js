import React, { useState } from 'react';
import './StockDataWidget.css';
// ... (your existing imports and component definition)

const StockDataWidget = ({ data }) => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const dates = data.map(obj => obj.date);

  // Sort data by date in ascending order
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const [currentDateIndex, setCurrentDateIndex] = useState(sortedData.length - 1);

  const formatDate = date => {
    const formattedDate = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return formattedDate.toLocaleDateString(undefined, options);
  };

  const handleNextClick = () => {
    if (currentDateIndex < dates.length - 1) {
      setIsDataChanged(true);
      setTimeout(() => {
        setIsDataChanged(false);
        setCurrentDateIndex(currentDateIndex + 1);
      }, 300); // Adjust the timeout duration as needed
    }
  };

  const handlePrevClick = () => {
    if (currentDateIndex > 0) {
      setIsDataChanged(true);
      setTimeout(() => {
        setIsDataChanged(false);
        setCurrentDateIndex(currentDateIndex - 1);
      }, 300); // Adjust the timeout duration as needed
    }
  };

  return (
    <div className="stock-widget">
      {dates.length > 0 && (
        <>
          <div className={`stock-entry${isDataChanged ? ' data-change' : ''}`}>
            <h2>{formatDate(sortedData[currentDateIndex].date)}</h2>
            <table>
              <tbody>
                <tr>
                  <td className="label">Open:</td>
                  <td>{sortedData[currentDateIndex]['1. open']} $</td>
                </tr>
                <tr>
                  <td className="label">High:</td>
                  <td>{sortedData[currentDateIndex]['2. high']} $</td>
                </tr>
                <tr>
                  <td className="label">Low:</td>
                  <td>{sortedData[currentDateIndex]['3. low']} $</td>
                </tr>
                <tr>
                  <td className="label">Close:</td>
                  <td>{sortedData[currentDateIndex]['4. close']} $</td>
                </tr>
                <tr>
                  <td className="label">Volume:</td>
                  <td>{ Number( sortedData[currentDateIndex]['5. volume']).toLocaleString()  }</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="navigation-buttons">
            <button className="button button-prev" onClick={handlePrevClick}>
              Previous
            </button>
            <button className="button button-next" onClick={handleNextClick}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StockDataWidget;
