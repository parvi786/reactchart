import React, { useEffect } from "react";
import data from "./db.json";
import { useState } from "react";
import ReactECharts from "echarts-for-react";

function ScatterChart() {
  const [socialFirst, setsocialFirst] = useState();
  const [socialSecond, setsocialSecond] = useState();
  useEffect(() => {
    const selectChart = () => {
      //creating two arryas to put the values of colorintensity and hue of all class.
      let colorintensityName = [];
      let hueName = [];
      //pushing values of colorintensity and hue of all class in the arrays.
      data.forEach((element) => {
        colorintensityName.push(element.Colorintensity);
        hueName.push(element.Hue);
      });
      setsocialSecond(colorintensityName);
      setsocialFirst(hueName);
    };

    selectChart();
  }, []);
  // creating options for using in ReactEChart.
  const options = {
    grid: {},
    xAxis: {
      type: "category",
      data: socialSecond,
      name: "Color Intensity",
      nameLocation: "center",
      nameTextStyle: { fontSize: 20, padding: 30 },
    },
    yAxis: {
      type: "value",
      name: "Hue",
      nameLocation: "center",
      nameTextStyle: { fontSize: 20, padding: 30 },
    },
    series: [
      {
        data: socialFirst,
        type: "scatter",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return (
    <div>
      <div>
        <ReactECharts option={options} />
      </div>
    </div>
  );
}

export default ScatterChart;
