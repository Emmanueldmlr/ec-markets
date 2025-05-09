# AAPL Market Data React Native App

## Table of Contents

1. [Project Name](#project-name)
2. [Table of Contents](#table-of-contents)
3. [Key Dependencies](#key-dependencies)
4. [Installation](#installation)
5. [Features](#features)
6. [Codebase Structure](#codebase-structure)
7. [Key Dependencies](#key-dependencies)

## Project Name

AAPL Market Data React Native App

## Key Dependencies

- react-native-gifted-charts: This is a charting library for React Native that is used to create the chart. Version 1.4.61 was used and it requires Node version v20.18.1

- Gluestack UI: This is a UI library for React Native that is used to create the UI. Version 0.1.22 was used.

- Expo: This is a framework for building React Native apps. Version 53.0.8 was used.

- React Native: This is a framework for building native apps. Version 0.74.3 was used.



## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```
2. Install dependencies:
   ```ba
   npm install
   # or
   yarn install
   ```
3. Run the app:
   ```bash
   npx expo start
   # or for bare React Native
   npx react-native run-ios
   npx react-native run-android
   ```

## Features

- Interactive line chart for AAPL market data (Open, Close, High, Low)
- Pinch-to-zoom and reset zoom
- Dark mode toggle
- Dynamic chart key selection (show/hide Open, Close, High, Low)
- Error handling and loading states

## Codebase Structure

```
├── app/
│   └── index.tsx                # Main entry point and screen
├── components/
│   └── ui/
│       ├── chart/               # ChartComponent and related UI
│       ├── box.tsx
│       ├── card.tsx
│       ├── hstack.tsx
│       ├── vstack.tsx
│       ├── text.tsx
│       ├── image.tsx
│       ├── checkbox.tsx
│       └── ...
├── constants/
│   ├── ChartData.ts             # Chart spacing and constants
│   ├── ChartKeys.ts             # Chart key names and color pairs
│   └── Colors.ts                # Theme colors
├── services/
│   └── MarketDataSrv.ts         # FetchMarketData service
├── types/
│   └── marketDataType.ts        # TypeScript types for market data
├── utils/
│   └── marketDataFormatter.ts   # Data formatting utilities
└── ...
```

# App folder contains the main screen of the app.

# Components 

The components folder contains all the reusable UI components used throughout the app. These are modular building blocks such as buttons, cards, checkboxes, charts, and layout helpers (like HStack and VStack). Organizing UI elements here promotes reusability and maintainability, allowing you to build complex screens by composing these smaller components.
`ui/chart/`: Contains the chart component and related logic for rendering market data.
`ui/box.tsx`, `ui/card.tsx`, etc.: Individual UI primitives for layout and display.

# Constants folder 

The constants folder holds reusable constant values that are used across the app. This includes things like chart configuration values (e.g., spacing), color palettes, and key names for chart data. Keeping these values in a dedicated folder makes it easy to update and manage them in one place.
`ChartData.ts`: Chart spacing and configuration constants.
`ChartKeys.ts`: Key names and color mappings for chart lines.
`Colors.ts`: Theme color definitions for light and dark modes.

# Services folder 

The services folder contains modules responsible for handling external data fetching and business logic. For example, `MarketDataSrv.ts` is responsible for fetching market data from the API or mock server. This separation keeps your data logic decoupled from your UI components, making the codebase easier to test and maintain.

# Types folder 

The types folder defines TypeScript types and interfaces used throughout the app. This ensures type safety and better developer experience by providing clear contracts for data structures, such as market data objects and API responses.
`marketDataType.ts`: Type definitions for market data and related structures.

# Utils folder 

The utils folder contains utility functions and helpers that perform data transformation, formatting, or other generic tasks. For example, `marketDataFormatter.ts` is used to process and format raw market data into a structure suitable for charting. Utilities are kept separate to promote code reuse and clarity.
# ec-markets
