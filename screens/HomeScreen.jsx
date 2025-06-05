import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import styles from './HomeScreen.styles';

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

// change country code to emoji
function countryCodeToEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .split('')
    .map(char =>
      String.fromCodePoint(char.charCodeAt(0) - 0x41 + 0x1F1E6)
    )
    .join('');
}

export default function HomeScreen() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  // CurrencyFreaks
  const FREAKS_KEY = 'b890e7e7352d4376af7ad7054460ee89';
  const BASE = 'CAD';

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://api.currencyfreaks.com/latest?apikey=${FREAKS_KEY}`
        );
        const data = await response.json();

        if (!data || !data.rates) {
          Alert.alert('Error', 'Unable to fetch exchange rate information.');
          setLoading(false);
          return;
        }

        // Since this is the free plan of CurrencyFreaks, the “base=CAD” parameter is ignored.
        // The API always returns rates relative to USD, so we must manually convert USD-based rates to CAD-based rates.
        const usdToCadStr = data.rates['CAD'];
        if (!usdToCadStr) {
          Alert.alert('Error', 'CAD exchange rate data not found.');
          setLoading(false);
          return;
        }
        const usdToCad = parseFloat(usdToCadStr);

        const ASIAN_CURRENCIES = Object.keys(CURRENCY_TO_COUNTRY);
        const formatted = ASIAN_CURRENCIES
          .map(code => {
            const usdToTargetStr = data.rates[code];
            if (usdToTargetStr !== undefined) {
              const usdToTarget = parseFloat(usdToTargetStr);
              const cadToTarget = (1 / usdToCad) * usdToTarget;
              return {
                currency: code,
                value: cadToTarget.toFixed(2),
              };
            }
            return null;
          })
          .filter(item => item !== null);

        setRates(formatted);
        setLastUpdated(data.date);
      } catch (err) {
        console.error('Error fetching rates from Freaks:', err);
        Alert.alert('Error', 'Network error occurred while fetching exchange rates.');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading exchange rates...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Exchange List */}
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>💱 EXCHANGE LIST</Text>
        <Text style={styles.headerSubTitle}>Base Currency: {BASE}</Text>
      </View>

      {/* Each country currency*/}
      <FlatList
        data={rates}
        keyExtractor={item => item.currency}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No rates available.</Text>
        }
        renderItem={({ item }) => {
          const iso = CURRENCY_TO_COUNTRY[item.currency];
          const flag = iso ? countryCodeToEmoji(iso) : '🏳';

          return (
            <View style={styles.card}>
              <View style={styles.cardLeft}>
                <Text style={styles.flagText}>{flag}</Text>
                <Text style={styles.currencyText}>{item.currency}</Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.valueText}>{item.value}</Text>
                <Text style={styles.unitText}>{item.currency}</Text>
              </View>
            </View>
          );
        }}
      />

      {/*  Footer  */}
      <View style={styles.footer}>
        <Text style={styles.updatedText}>Last Updated: {lastUpdated}</Text>
      </View>
    </SafeAreaView>
  );
}