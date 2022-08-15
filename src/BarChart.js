import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import data from "./db.json";
import { useState } from "react";
function BarChart() {
  const [socialFirst, setsocialFirst] = useState();
  const [socialSecond, setsocialSecond] = useState();
  const [socialThird, setsocialThird] = useState();
  useEffect(() => {
    const selectChart = () => {
      //creating two arryas to put the values of alcohol and malic acid of all class.
      let alcoholName = [];
      let malicacidName = [];
      //pushing values of alcohol and malic acid of all class in the arrays.
      data.forEach((element) => {
        alcoholName.push(element.Alcohol);
        malicacidName.push(element.Malicacid);
      });
      //separating each class in a separate array to calculate the average of malic acid of each class.
      let p1 = malicacidName.slice(0, 59);
      let p2 = malicacidName.slice(59, 130);
      let p3 = malicacidName.slice(130);
      //calculating the average of malic acid of each class.
      const getAvg = (array) => {
        const avg =
          array.reduce((sum, curr) => sum + Number(curr), 0) / array.length;
        return parseFloat(avg).toFixed(3);
      };
      //putting average of malic acid of each class in a separate array,
      let p4 = [getAvg(p1), getAvg(p2), getAvg(p3)];

      const newArray = [];
      malicacidName.forEach((str) => {
        newArray.push(Number(str));
      });
      setsocialSecond(alcoholName);
      setsocialFirst(p4);
      setsocialThird(newArray);
    };

    selectChart();
  }, []);
  // creating options for using in ReactEChart.
  const options = {
    title: {
      text: "Barchart between Alcohol and Malic Acid",
    },
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {},
    xAxis: [
      {
        type: "category",
        data: socialSecond,
        name: "Alcohol",
        nameLocation: "center",
        nameTextStyle: { fontSize: 20, padding: 30 },
      },
    ],
    yAxis: [
      {
        type: "category",
        data: socialFirst,
        name: "Malic Acid Average",
        nameLocation: "center",
        nameTextStyle: { fontSize: 20, padding: 30 },
      },
    ],
    series: [
      {
        type: "bar",
        barWidth: "60%",
        data: socialThird,
      },
    ],
  };

  return (
    <div>
      <div>
        <ReactECharts option={options} />
      </div>
    </div>
  );
}
export default BarChart;
