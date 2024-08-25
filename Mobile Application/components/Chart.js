import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

function Chart({ glucoselevel }) {
  return (
    <>
      <LineChart
        data={{
          // labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [94, 80, 82, 91, 92, 90, 94, 150],
            },
          ],
        }}
        width={Dimensions.get("window").width - 40} // from react-native
        height={160}
        // yAxisLabel="$"
        // yAxisSuffix="mg/dl"
        withVerticalLines={false}
        // withHorizontalLines={false}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#183086",
          backgroundGradientFrom: "#183086",
          backgroundGradientTo: "#0C1539",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
