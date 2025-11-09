# ContraSafe - Contraceptive Recommendation App

## 📱 Overview

ContraSafe is a comprehensive contraceptive recommendation mobile application built with Expo and React Native. The app implements the **WHO Medical Eligibility Criteria (MEC) 2015** guidelines to provide safe, evidence-based contraceptive recommendations tailored to individual medical conditions and personal preferences.

## ✨ Features

### 🏥 Medical Safety Assessment

- **36-question medical questionnaire** based on WHO MEC 2015 guidelines
- Conditional logic for complex medical scenarios (postpartum, breastfeeding, medical conditions)
- Real-time eligibility scoring with MEC categories (1-4 scale)
- Professional-grade safety recommendations

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
- Drawer navigation with 8 main sections
- Color-coded safety recommendations
- Progress tracking and validation
- Responsive design for all screen sizes

## 🛠 Technology Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **UI Library**: React Native Paper
- **State Management**: Redux Toolkit
- **Navigation**: Expo Router
- **Styling**: React Native StyleSheet
- **Medical Guidelines**: WHO MEC 2015

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

### 1. Medical Safety Assessment

1. Navigate to **"Medical Safety"** from the drawer menu
2. Complete the 36-question medical questionnaire
3. Questions adapt based on your previous answers
4. Receive WHO MEC-based safety recommendations

### 2. View Results

- **Safe (MEC 1)**: Green - No restrictions
- **Acceptable (MEC 2)**: Yellow - Generally safe with monitoring
- **Avoid (MEC 3-4)**: Red - Not recommended due to health risks

### 3. Personalize Your Choice

1. Click **"Personalize Your Choice"** from results
2. Answer preference questions about:
   - Pregnancy planning timeline
   - Period management preferences
   - Usage frequency preferences
3. Receive personalized recommendations

### 4. Explore Methods

- **"Know Your Contraceptive"**: Detailed method information
- **"Choose Your Contraceptive"**: Browse all available methods
- **"Compare Methods"**: Side-by-side comparison

## 🏥 WHO Medical Eligibility Criteria (MEC)

The app implements the WHO MEC 2015 guidelines with four categories:

- **Category 1**: No restrictions (method can be used)
- **Category 2**: Generally use (advantages generally outweigh risks)
- **Category 3**: Usually not recommended (risks usually outweigh advantages)
- **Category 4**: Should not be used (unacceptable health risk)

### Medical Conditions Assessed

- Cardiovascular conditions
- Reproductive health history
- Metabolic disorders
- Liver conditions
- Medication interactions
- Age-related factors
- Postpartum and breastfeeding status

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

#### Eligibility Engine (`src/services/eligibilityEngine.ts`)

- Implements WHO MEC scoring algorithm
- Handles complex medical condition logic
- Provides category-based recommendations

#### Personalization Engine (`src/services/personalizationEngine.ts`)

- Filters methods based on user preferences
- Considers lifestyle factors
- Provides tailored recommendations

#### Redux Store (`src/store/`)

- Manages questionnaire state
- Stores assessment results
- Handles navigation state

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain WHO MEC compliance
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

The WHO MEC guidelines are implemented as accurately as possible, but medical decisions should always involve healthcare professionals who can consider individual circumstances not captured in standardized questionnaires.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **World Health Organization** for the Medical Eligibility Criteria guidelines
- **Expo team** for the excellent development platform
- **React Native Paper** for the beautiful UI components
- **Redux Toolkit** team for simplified state management

## 📞 Support

For questions, issues, or suggestions:

- Create an issue on GitHub
- Contact the development team
- Review the FAQ section in the app

## 🔗 Resources

- [WHO MEC 2015 Guidelines](https://www.who.int/publications/i/item/9789241549158)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://reactnativepaper.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

**ContraSafe** - Empowering informed contraceptive choices through evidence-based technology 🌟
