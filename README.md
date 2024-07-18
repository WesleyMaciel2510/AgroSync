# 🚜🌻 AgroSync Mobile App 🍅🥕
![image](https://github.com/user-attachments/assets/cce68158-6796-4cc0-936f-9e0f00bac82c)

A React Native application designed to sync with the "AgroSync" web platform. This app enables users to upload and access agricultural data, ensuring seamless integration between mobile and web environments.

## Features 🛠️
- Real-Time Data Sync 🔄: Ensures that all information uploaded via the mobile app is instantly available on the web platform.
- User Authentication 🔐: Secure login and user management to protect user data.
- Photo Upload and Gallery 🖼️: Capture, upload, and view photos related to agricultural activities.
- Geolocation Services 📍: Track and visualize location data to analyze geographical trends.

## Technologies Used 🛠️
- React Native ⚛️: Framework for building native mobile apps using React.
- Redux Toolkit 🛠️: State management library for predictable state changes.
- React Navigation 🌐: Routing and navigation for React Native apps.
- Axios 🌐: HTTP client for making API requests.
- Lottie 🎞️: Library for rendering animations.
- FontAwesome 🎨: Icon library for adding visual elements.
- Firebase 🔥: Backend services for real-time data synchronization and authentication.
- MMKV 🗄️: Efficient key-value storage library for React Native.
- OpenMeteo 🌦️: API for fetching weather data.
- React Native Vision Camera 📷: Camera library for capturing photos and videos.

## How It Works 🔄
- Taking a Picture 📸: Users use the device camera to capture photos of agricultural activities.
- Saving and Converting to Base64 💾: Captured photos are saved to the device's camera roll. They are then converted into Base64 format, allowing them to be efficiently transmitted over the network.
- Sending to App Server 🚀: The converted Base64 image data is sent securely to the AgroSync server via HTTP POST requests. This ensures that all uploaded photos are securely stored and accessible across devices and platforms.

## Benefits 🌟
- Accessibility 🌍: Access agricultural data from anywhere, whether on a mobile device or web platform.
- Collaboration 🤝: Multiple users can contribute and analyze agricultural data simultaneously.
- Enhanced Analysis 🔍: Utilize mobile tools to collect and analyze detailed agricultural data in real-time.

## Scripts 🚀
- Start Android App 📱: npm run android
- Start iOS App 🍎: npm run ios
- Lint 🚨: npm run lint
- Start Development Server 🖥️: npm run start
- Run Tests 🧪: npm run test
