import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { MAX_SPACING, MIN_SPACING } from "@/constants/ChartData";
import { CHART_KEYS_COLORS_PAIRS } from "@/constants/ChartKeys";
import { Colors } from "@/constants/Colors";
import React from "react";
import { Dimensions } from "react-native";
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  PinchGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import { LineChart } from "react-native-gifted-charts";
import { Box } from "@/components/ui/box";

const screenWidth = Dimensions.get("window").width;
const cardHorizontalPadding = 100; 
const chartWidth = screenWidth - cardHorizontalPadding;

const ChartComponent = ({
  selectedData,
  selectedChartKey,
  spacing,
  setSpacing,
  baseSpacing,
  theme,
}: {
  selectedData: Array<{
    key: string;
    data: Array<{ value: number; label: string }>;
    color: string;
    dataPointsColor: string;
    startFillColor: string;
  }>;
  selectedChartKey: string[];
  spacing: number;
  setSpacing: (spacing: number) => void;
  baseSpacing: React.MutableRefObject<number>;
  theme: typeof Colors.light & typeof Colors.dark;
}) => {

  // Pinch event to zoom in and out of the chart
  const onPinchEvent = (event: PinchGestureHandlerGestureEvent) => {
    const scale = event.nativeEvent.scale;
    let newSpacing = Math.max(
      MIN_SPACING,
      Math.min(MAX_SPACING, baseSpacing.current * scale)
    );
    setSpacing(newSpacing);
  };

  // Pinch state change to reset the spacing
  const onPinchStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.END) {
      baseSpacing.current = spacing;
    }
  };

  // Render the chart
  return (
    <>
      <HStack className="mb-5 mt-5 justify-center" space="lg">
        {selectedChartKey.map((item) => (
          <Box key={item} className="flex-row items-center">
            <Box
              style={{
                backgroundColor: CHART_KEYS_COLORS_PAIRS[item],
              }}
              className="h-3 w-3 rounded-full mr-2"
            />
            <Text
              style={{ color: CHART_KEYS_COLORS_PAIRS[item] }}
              className="font-bold"
            >
              {item}
            </Text>
          </Box>
        ))}
      </HStack>

      {/* Pinch gesture handler to zoom in and out of the chart */}
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}
      >
        <Box style={{ width: "100%" }}>
          <LineChart
            width={chartWidth}
            areaChart
            stepValue={100}
            curved
            height={200}
            showVerticalLines
            spacing={spacing}
            initialSpacing={0}
            hideDataPoints
            startOpacity={0.8}
            endOpacity={0.3}
            xAxisLabelTextStyle={{ fontSize: 10, color: theme.text }}
            yAxisLabelPrefix={"$"}
            noOfSections={5}
            showYAxisIndices
            xAxisLength={chartWidth}
            {...(selectedData[0] && {
              data: selectedData[0].data,
              color1: selectedData[0].color,
              dataPointsColor1: selectedData[0].dataPointsColor,
              startFillColor1: selectedData[0].startFillColor,
            })}
            {...(selectedData[1] && {
              data2: selectedData[1].data,
              color2: selectedData[1].color,
              dataPointsColor2: selectedData[1].dataPointsColor,
              startFillColor2: selectedData[1].startFillColor,
            })}
            {...(selectedData[2] && {
              data3: selectedData[2].data,
              color3: selectedData[2].color,
              dataPointsColor3: selectedData[2].dataPointsColor,
              startFillColor3: selectedData[2].startFillColor,
            })}
            {...(selectedData[3] && {
              data4: selectedData[3].data,
              color4: selectedData[3].color,
              dataPointsColor4: selectedData[3].dataPointsColor,
              startFillColor4: selectedData[3].startFillColor,
            })}
            yAxisTextStyle={{
              color: theme.text,
            }}
            rulesLength={chartWidth}
            rulesColor={theme.text}
            xAxisColor={theme.text}
            yAxisColor={theme.text}
          />
        </Box>
      </PinchGestureHandler>
    </>
  );
};

export default ChartComponent;
