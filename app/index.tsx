import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ChartComponent from "@/components/ui/chart";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { HStack } from "@/components/ui/hstack";
import { CheckIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { DEFAULT_SPACING } from "@/constants/ChartData";
import { CHART_KEYS } from "@/constants/ChartKeys";
import { Colors } from "@/constants/Colors";
import useMarketData from "@/hooks/useMarketData";
import { FetchMarketData } from "@/services/MarketDataSrv";
import { MarketDataArrayType } from "@/types/marketDataType";
import { formatMarketData } from "@/utils/marketDataFormatter";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, SafeAreaView, useColorScheme } from "react-native";
import colors from "tailwindcss/colors";

const index = () => {
  const { marketData, isFetchingData, error, setIsFetchingData } = useMarketData();
 const [selectedData, setSelectedData] = useState<MarketDataArrayType[] | null>(
   null
 );

  // State for the selected chart key OPEN, HIGH, LOW, CLOSE... All of them are selected by default
  const [selectedChartKey, setSelectedChartKey] = useState<string[]>([
    CHART_KEYS.CLOSE,
    CHART_KEYS.OPEN,
    CHART_KEYS.HIGH,
    CHART_KEYS.LOW,
  ]);

  // State for the spacing of the chart
  const [spacing, setSpacing] = useState(DEFAULT_SPACING);
  const baseSpacing = useRef(DEFAULT_SPACING);

  // State for the dark mode
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);

  const effectiveScheme = darkMode ? "dark" : colorScheme;
  const theme = Colors[effectiveScheme === "dark" ? "dark" : "light"];

  useEffect(() => {
    if (marketData && marketData.length > 0) {
      setSelectedData(
        marketData.filter((d) => selectedChartKey.includes(d.key))
      );
      setIsFetchingData(false);
    }
  }, [marketData, selectedChartKey]);
 
  // Effect to set the selected data to be used in the chart

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Box className="py-5 px-6"
      style={{
        marginTop: Platform.OS === "ios" ? 0 : 20,
      }}
      >
        {isFetchingData && (
          <Box className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
          </Box>
        )}
        {!isFetchingData && error && (
          <Box className="items-center justify-center mt-5">
            <Text className="text-red-500 text-lg text-center">{error}</Text>
          </Box>
        )}
        {!isFetchingData && !error && (
          <>
            <HStack space="lg" className="items-center">
              <Image
                source={
                  effectiveScheme === "dark"
                    ? require("@/assets/images/apple_logo_light.png")
                    : require("@/assets/images/apple_logo_dark.png")
                }
                alt="Apple Logo"
                className="w-12 h-12"
              />
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "400",
                  lineHeight: 48,
                  color: theme.text,
                  fontFamily: "Actor",
                }}
              >
                AAPL Market Data
              </Text>
            </HStack>
            <Box className="mt-5">
              {selectedData && selectedData.length > 0 && (
                <Card
                  className="rounded-lg"
                  style={{ backgroundColor: theme.card }}
                >
                  <ChartComponent
                    selectedData={selectedData}
                    selectedChartKey={selectedChartKey}
                    spacing={spacing}
                    setSpacing={setSpacing}
                    baseSpacing={baseSpacing}
                    theme={theme}
                  />
                </Card>
              )}
            </Box>
            <Box className="mt-5">
              <HStack className="justify-between ">
                <Text
                  className="font-bold text-lg"
                  style={{ color: theme.text }}
                >
                  Display
                </Text>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  onPress={() => {
                    setSpacing(DEFAULT_SPACING);
                  }}
                >
                  <Text>Reset Zoom</Text>
                </Button>
              </HStack>
              <VStack className="mt-2">
                {Object.values(CHART_KEYS).map((item) => (
                  <Checkbox
                    key={item}
                    size="md"
                    isChecked={selectedChartKey.includes(item)}
                    onChange={() => {
                      setSelectedChartKey((prev) => {
                        if (prev.includes(item)) {
                          if (prev.length === 1) return prev;
                          return prev.filter((k) => k !== item);
                        } else {
                          return [...prev, item];
                        }
                      });
                    }}
                    value={item}
                  >
                    <CheckboxIndicator
                      style={{
                        backgroundColor: selectedChartKey.includes(item)
                          ? theme.checkbox
                          : undefined,
                        borderColor: selectedChartKey.includes(item)
                          ? theme.checkbox
                          : undefined,
                      }}
                    >
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel
                      className="text-lg"
                      style={{ color: theme.text }}
                    >
                      {item}
                    </CheckboxLabel>
                  </Checkbox>
                ))}
              </VStack>
              <VStack className="mt-5">
                <Text
                  className="font-bold text-lg"
                  style={{ color: theme.text }}
                >
                  Preferences
                </Text>
                <HStack space="md" className="items-center mt-3">
                  <Switch
                    size="md"
                    isDisabled={false}
                    value={darkMode}
                    onValueChange={setDarkMode}
                    trackColor={{
                      false: colors.neutral[300],
                      true: colors.neutral[600],
                    }}
                    thumbColor={colors.neutral[50]}
                    ios_backgroundColor={colors.neutral[300]}
                  />
                  <Text
                    className="text-lg font-medium"
                    style={{ color: theme.text }}
                  >
                    Dark Mode
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </>
        )}
      </Box>
    </SafeAreaView>
  );
};

export default index;
