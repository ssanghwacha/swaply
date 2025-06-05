# Swaply

Swaply is a simple currency exchange app built with React Native and Expo.  
It uses the free CurrencyFreaks API to fetch real-time USD-based exchange rates and converts them to CAD-based rates for viewing major Asian currencies or performing conversions.


---
## Project Structure
Swaply/
│
├─ assets/
│   ├─ swaply.png                # App logo
│   └─ swaply_screenshot_1.png   # Example screenshot
│   └─ swaply_screenshot_2.png   # Example screenshot
│
├─ screens/
│   ├─ HomeScreen.jsx            # Exchange list screen
│   ├─ HomeScreen.styles.js      # HomeScreen styles
│   ├─ ConvertScreen.jsx         # Currency converter screen
│   └─ ConvertScreen.styles.js   # ConvertScreen styles
│
├─ App.js                        # Navigation setup and custom header
├─ package.json                  # Project metadata and dependencies
└─ README.md                     # This file

### 📋 Key Features

1. **Exchange Rate List (Home Screen)**
   - Displays real-time exchange rates of major Asian currencies relative to 1 CAD (Canadian Dollar).
   - Shows flag emoji, currency code, and rate (formatted to two decimal places).
   - Displays the last updated date and a loading indicator.

2. **Currency Converter (Convert Screen)**
   - Allows user to select a “From” currency and a “To” currency from a dropdown list of Asian currencies plus CAD.
   - Defaults: From = CAD, To = KRW (South Korean Won).
   - User enters an amount; upon pressing **Convert**, the app fetches rates and displays a result like “🇨🇦100 CAD ≈ 🇰🇷119,664 KRW”.
   - Shows a loading indicator and disables the button while fetching.

3. **Shared Navigation and Header**
   - Uses React Navigation’s Bottom Tab Navigator for Home ↔ Convert screen switching.
   - Custom header displays the Swaply logo at center with a drop shadow at the bottom.

4. **Client-Side Conversion Logic**
   - The free tier of CurrencyFreaks only returns USD-based rates.
   - App calculates CAD-based rates using the formula:  
     ```
     1 unit of FromCurrency = (1 / (USD → FromCurrency)) × (USD → ToCurrency)
     ```
   - For “1 CAD → Target,” it fetches `USD→CAD` and `USD→Target`, then computes  
     ```
     CAD → Target = (1 / (USD→CAD)) × (USD→Target)
     ```

---

#### 🛠 Installation & Setup
expo install expo react-native \
  @react-navigation/native \
  @react-navigation/bottom-tabs \
  react-native-screens \
  react-native-safe-area-context \
  react-native-gesture-handler \
  @expo/vector-icons \
  @react-native-picker/picker

npm install expo react-native \
  @react-navigation/native \
  @react-navigation/bottom-tabs \
  react-native-screens \
  react-native-safe-area-context \
  react-native-gesture-handler \
  @expo/vector-icons \
  @react-native-picker/picker

##### Requirements
- Node.js (v14+ recommended)
- npm or Yarn
- Expo CLI (install globally)
- Android/iOS emulator or physical device (with Expo Go app)

##### Clone & Install
```bash
# 1. Clone the repository
git clone https://github.com/YourUsername/Swaply.git
cd Swaply

# 2. Install dependencies (Expo CLI recommended)
expo install



** References

- CurrencyFreaks API – https://currencyfreaks.com/documentation.html
- React Navigation Docs – https://reactnavigation.org/docs/getting-started
- Picker – https://github.com/react-native-picker/picker
- Icons – https://docs.expo.dev/guides/icons/
- Example code snippets adapted from official documentation (React Navigation, Picker, Expo Icons)

**Note:**  
The formula to convert USD-based rates to CAD-based rates was derived using ChatGPT. The student reviewed and tested the implementation manually to ensure accuracy.