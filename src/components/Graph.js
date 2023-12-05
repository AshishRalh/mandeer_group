import React, { useEffect, useRef } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Graph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const toggleDataSeries = (e) => {
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chartRef.current.render();
    };

    const mapDataToDataPoints = (dataArray, key) => {
      return dataArray.map(entry => ({
        x: new Date(entry.date),
        y: parseFloat(entry[key])
      }));
    };

    const options = {
      theme: "light2",
      animationEnabled: true,
      title: {
        text: "Stock Data"
      },
      subtitles: [{
        text: "Click Legend to Hide or Unhide Data Series"
      }],
      axisX: {
        title: "Date"
      },
      axisY: {
        title: "Price",
        titleFontColor: "#6D78AD",
        lineColor: "#6D78AD",
        labelFontColor: "#6D78AD",
        tickColor: "#6D78AD"
      },
      axisY2: {
        title: "Volume",
        titleFontColor: "#51CDA0",
        lineColor: "#51CDA0",
        labelFontColor: "#51CDA0",
        tickColor: "#51CDA0"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries
      },
      data: [
        {
          type: "spline",
          name: "Open Price",
          showInLegend: true,
          xValueFormatString: "MMM DD YYYY",
          yValueFormatString: "$#,##0.#",
          dataPoints: mapDataToDataPoints(data, '1. open')
        },
        {
          type: "spline",
          name: "Close Price",
          showInLegend: true,
          xValueFormatString: "MMM DD YYYY",
          yValueFormatString: "$#,##0.#",
          dataPoints: mapDataToDataPoints(data, '4. close')
        },
        {
          type: "column",
          name: "Volume",
          showInLegend: true,
          xValueFormatString: "MMM DD YYYY",
          yValueFormatString: "#,##0.#",
          axisYType: "secondary",
          dataPoints: mapDataToDataPoints(data, '5. volume')
        }
      ]
    };

    chartRef.current = new CanvasJS.Chart("chartContainer", options);
    chartRef.current.render();

    return () => {
      // Clean up chart on component unmount
      chartRef.current.destroy();
    };
  }, [data]);

  return (
    <div>
      <div id="chartContainer" style={{ height: "370px", width: "100%" }} />
    </div>
  );
};

export default Graph;
