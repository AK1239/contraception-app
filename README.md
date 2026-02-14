# ContraSafe - Contraceptive Recommendation App

## 📱 Overview

ContraSafe is a comprehensive contraceptive recommendation mobile application built with Expo and React Native. The app provides evidence-based contraceptive recommendations tailored to individual preferences and lifestyle factors.

## ✨ Features

### 🎯 Personalized Recommendations

- **Personalization engine** based on individual preferences
- Pregnancy planning considerations
- Period management preferences
- Frequency and convenience factors
- BMI-based recommendations

### 📊 Comprehensive Method Coverage

- **11 contraceptive methods** supported:
  - Combined Oral Contraceptive (COC)
  - Progestogen-Only Pills (POP)
  - Injectable (DMPA)
  - Implant
  - Copper IUD
  - LNG IUD
  - Patch
  - Vaginal Ring
  - Barrier Methods
  - Sterilization
  - Emergency Contraception

### 🎨 User Interface

- Modern, intuitive design with React Native Paper
- Drawer navigation
- Progress tracking and validation
- Responsive design for all screen sizes

## 🛠 Technology Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **UI Library**: React Native Paper
- **State Management**: Redux Toolkit
- **Navigation**: Expo Router
- **Styling**: React Native StyleSheet

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ContraSafe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `a` for Android
   - Press `i` for iOS
   - Scan QR code with Expo Go app

## 🚀 Usage Guide

### 1. Personalize Your Choice

1. Navigate to **"Choose Your Contraceptive"** from the drawer menu
2. Answer preference questions about:
   - Pregnancy planning timeline
   - Period management preferences
   - Usage frequency preferences
3. Receive personalized recommendations

### 2. Explore Methods

- **"Know Your Contraceptive"**: Detailed method information
- **"Choose Your Contraceptive"**: Browse all available methods
- **"Compare Methods"**: Side-by-side comparison

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Start with specific platform
npm run android
npm run ios

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

### Key Components

#### Personalization Engine (`src/services/personalizationEngine.ts`)

- Filters methods based on user preferences
- Considers lifestyle factors
- Provides tailored recommendations

#### Redux Store (`src/store/`)

- Manages personalization state
- Handles navigation state

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation
- Follow existing code style

## 📋 Roadmap

- [ ] Offline mode support
- [ ] Multi-language support
- [ ] Healthcare provider portal
- [ ] Data export functionality
- [ ] Push notifications for reminders
- [ ] Integration with health tracking apps

## 🔒 Privacy & Security

- No personal health data is stored remotely
- All assessments are processed locally
- Follows healthcare data protection standards
- Option to export data for healthcare providers

## 📚 Medical Disclaimer

**Important**: This app is for educational and informational purposes only. It should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers before making contraceptive decisions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo team** for the excellent development platform
- **React Native Paper** for the beautiful UI components
- **Redux Toolkit** team for simplified state management

## 📞 Support

For questions, issues, or suggestions:

- Create an issue on GitHub
- Contact the development team
- Review the FAQ section in the app

## 🔗 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://reactnativepaper.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

**ContraSafe** - Empowering informed contraceptive choices through evidence-based technology 🌟
