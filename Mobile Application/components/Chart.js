import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

function Chart({ glucoselevel }) {
  const [glucosedatas, setGlucosedats] = useState([70, 110, 120, 80]);
  console.log(glucoselevel, "LEVEL IN CHART");
  useEffect(() => {
    if (glucosedatas.length >= 8) {
      setGlucosedats([...glucosedatas.slice(1), glucoselevel]);
    } else {
      setGlucosedats([...glucosedatas, glucoselevel]);
    }
  }, [glucoselevel]);

  return (
    <>
      <LineChart
        data={{
          // labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: glucosedatas,
            },
          ],
        }}
        width={Dimensions.get("window").width - 40} // from react-native
        height={208}
        // yAxisLabel="$"
        // yAxisSuffix="mg/dl"
        withVerticalLines={false}
        // withHorizontalLines={false}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `#9A89FF`,
          labelColor: (opacity = 1) => `#000`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#0C1539",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
}

export default Chart;
