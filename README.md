# 🚜🌻 ![#458a2c] AgroSync Mobile App 🍅🥕 `#458a2c`
![image](https://github.com/user-attachments/assets/cce68158-6796-4cc0-936f-9e0f00bac82c)

A React Native application designed to sync with the "AgroSync" web platform. This app enables users to upload and access agricultural data, ensuring seamless integration between mobile and web environments.

# UI Screenshot 📱
![Login](https://github.com/user-attachments/assets/89b06094-aee6-4e9c-926d-ef410fa328f8)
![pictures](https://github.com/user-attachments/assets/9bc97f21-96b0-4705-ad32-18aa3678331e)
![QRCODE](https://github.com/user-attachments/assets/402af84e-b1bf-4f19-a9da-97148ad27dee)
![Home](https://github.com/user-attachments/assets/bff2cbda-e25b-4bb1-91c2-b7ab140682a2)
![Load](https://github.com/user-attachments/assets/187fa656-94ae-47d8-8aac-772079ecbb6c)
![registerPicture](https://github.com/user-attachments/assets/62783cee-cd17-4f48-bb0d-8c80cf13c915)
![Scheduling](https://github.com/user-attachments/assets/ac668557-cb65-4a4a-a6e0-05007058e2e0)
![Search](https://github.com/user-attachments/assets/522070fd-24bb-4f0b-9b2c-4c489a5d0c07)
![cadastro](https://github.com/user-attachments/assets/cdf4e8d0-800f-4b6e-ab1f-a285f603a17c)

## Features 🛠️
- Real-Time Data Sync 🔄: Ensures that all information uploaded via the mobile app is instantly available on the web platform.
- User Authentication 🔐: Secure login and user management to protect user data.
- Photo Upload and Gallery 🖼️: Capture, upload, and view photos related to agricultural activities.
- Geolocation Services 📍: Track and visualize location data to analyze geographical trends.
- QRCode and Barcode Scan 📸: The app supports QR code scanning using the device camera. It recognizes QR code types such as QR, PDF-417, Aztec, and Data Matrix. Barcodes such as Code-128, Code-39, EAN-13, and UPC-E can also be scanned for agricultural product identification and inventory management.

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
- The Driver can Search Load manually or scanning a QRCode
- The Warehouse Operator can Search Schedulling the same way.

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
