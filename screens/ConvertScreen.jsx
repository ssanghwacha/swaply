import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './ConvertScreen.styles';

// Mapping from currency code to ISO country code (for flag emoji)
const CURRENCY_TO_COUNTRY = {
  AED: 'AE', AFN: 'AF', AMD: 'AM', BDT: 'BD', BHD: 'BH',
  BND: 'BN', BTN: 'BT', CNY: 'CN', EGP: 'EG',  HKD: 'HK',
  IDR: 'ID', INR: 'IN', IQD: 'IQ', IRR: 'IR',  JOD: 'JO',
  JPY: 'JP', KHR: 'KH', KRW: 'KR', KWD: 'KW',  KZT: 'KZ',
  LAK: 'LA', LBP: 'LB', LKR: 'LK', MMK: 'MM',  MOP: 'MO',
  MVR: 'MV', MYR: 'MY', NPR: 'NP', OMR: 'OM',  PHP: 'PH',
  PKR: 'PK', QAR: 'QA', RUB: 'RU', SAR: 'SA',  SGD: 'SG',
  SYP: 'SY', THB: 'TH', TJS: 'TJ', TMT: 'TM',  TRY: 'TR',
  TWD: 'TW', UZS: 'UZ', VND: 'VN', YER: 'YE',
  CAD: 'CA',
};

// Convert an ISO country code to a flag emoji
function countryCodeToEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .split('')
    .map(char =>
      String.fromCodePoint(char.charCodeAt(0) - 0x41 + 0x1F1E6)
    )
    .join('');
}

// List of supported currency codes
const ASIAN_CURRENCIES = [
  'AED','AFN','AMD','BDT','BHD','BND','BTN','CNY','EGP',
  'HKD','IDR','INR','IQD','IRR','JOD','JPY','KHR','KRW',
  'KWD','KZT','LAK','LBP','LKR','MMK','MOP','MVR','MYR',
  'NPR','OMR','PHP','PKR','QAR','RUB','SAR','SGD','SYP',
  'THB','TJS','TMT','TRY','TWD','UZS','VND','YER',
  'CAD'
];

export default function ConvertScreen() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('CAD');
  const [toCurrency, setToCurrency] = useState('KRW');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // CurrencyFreaks API key
  const FREAKS_KEY = 'b890e7e7352d4376af7ad7054460ee89';

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Notice', 'Please enter a valid numeric amount.');
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(parseFloat(amount).toFixed(2));
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      //Fetch live rates from CurrencyFreaks
      const response = await fetch(
        `https://api.currencyfreaks.com/latest?apikey=${FREAKS_KEY}`
      );
      const data = await response.json();

      if (!data || !data.rates) {
        Alert.alert('Error', 'Unable to fetch exchange rate information.');
        setLoading(false);
        return;
      }

      //Retrieve “USD → FromCurrency” rate
      const usdToFromStr = data.rates[fromCurrency];
      if (!usdToFromStr) {
        Alert.alert('Error', `${fromCurrency} rate not found.`);
        setLoading(false);
        return;
      }
      const usdToFrom = parseFloat(usdToFromStr); 

      //Retrieve “USD → ToCurrency” rate
      const usdToTargetStr = data.rates[toCurrency];
      if (!usdToTargetStr) {
        Alert.alert('Error', `${toCurrency} rate not found.`);
        setLoading(false);
        return;
      }
      const usdToTarget = parseFloat(usdToTargetStr); 

      //Calculate “FromCurrency → ToCurrency” using USD as intermediary
      //    Because free-tier returns only USD-based rates, we must convert manually.
      //    1 unit of FromCurrency = (1 / (USD → FromCurrency)) × (USD → ToCurrency)
      const fromToTargetRate = (1 / usdToFrom) * usdToTarget;
      const finalValue = fromToTargetRate * parseFloat(amount);

      setResult(finalValue.toFixed(2));
    } catch (error) {
      console.error('ConvertScreen fetch error:', error);
      Alert.alert('Error', 'Network error occurred while fetching conversion.');
    } finally {
      setLoading(false);
    }
  };

  // Convert ISO code to flag emoji
  const fromFlag = countryCodeToEmoji(CURRENCY_TO_COUNTRY[fromCurrency] || '');
  const toFlag = countryCodeToEmoji(CURRENCY_TO_COUNTRY[toCurrency] || '');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>

        {/* From Picker */}
        <View style={[styles.box, { marginTop: 24 }]}>
          <Text style={styles.label}>From</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={fromCurrency}
              onValueChange={itemValue => setFromCurrency(itemValue)}
              mode="dropdown"
              style={styles.picker}
              dropdownIconColor="#666"
            >
              {ASIAN_CURRENCIES.map(code => {
                const iso = CURRENCY_TO_COUNTRY[code];
                const flag = iso ? countryCodeToEmoji(iso) + ' ' : '';
                return (
                  <Picker.Item
                    key={code}
                    label={`${flag}${code}`}
                    value={code}
                    color="#333"
                  />
                );
              })}
            </Picker>
          </View>
        </View>

        {/* To Picker */}
        <View style={[styles.box, { marginTop: 16 }]}>
          <Text style={styles.label}>To</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={toCurrency}
              onValueChange={itemValue => setToCurrency(itemValue)}
              mode="dropdown"
              style={styles.picker}
              dropdownIconColor="#666"
            >
              {ASIAN_CURRENCIES.map(code => {
                const iso = CURRENCY_TO_COUNTRY[code];
                const flag = iso ? countryCodeToEmoji(iso) + ' ' : '';
                return (
                  <Picker.Item
                    key={code}
                    label={`${flag}${code}`}
                    value={code}
                    color="#333"
                  />
                );
              })}
            </Picker>
          </View>
        </View>

        {/* Amount Input */}
        <View style={[styles.box, { marginTop: 16 }]}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="e.g. 100"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Convert Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleConvert}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Converting...' : 'Convert'}
          </Text>
        </TouchableOpacity>

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={{ marginTop: 12 }}
          />
        )}

        {/* Conversion Result */}
        {result !== null && !loading && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {fromFlag}{amount} {fromCurrency} ≈ {toFlag}{result} {toCurrency}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}