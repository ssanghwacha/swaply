import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bookmark from '../assets/bookmark.svg';
import BookmarkFill from '../assets/bookmark-fill.svg';
import styles from './HomeScreen.styles';

const CURRENCY_TO_COUNTRY = {
  AED: 'AE', AFN: 'AF', AMD: 'AM', BDT: 'BD', BHD: 'BH',
  BND: 'BN', BTN: 'BT', CNY: 'CN', EGP: 'EG', HKD: 'HK',
  IDR: 'ID', INR: 'IN', IQD: 'IQ', IRR: 'IR', JOD: 'JO',
  JPY: 'JP', KHR: 'KH', KRW: 'KR', KWD: 'KW', KZT: 'KZ',
  LAK: 'LA', LBP: 'LB', LKR: 'LK', MMK: 'MM', MOP: 'MO',
  MVR: 'MV', MYR: 'MY', NPR: 'NP', OMR: 'OM', PHP: 'PH',
  PKR: 'PK', QAR: 'QA', RUB: 'RU', SAR: 'SA', SGD: 'SG',
  SYP: 'SY', THB: 'TH', TJS: 'TJ', TMT: 'TM', TRY: 'TR',
  TWD: 'TW', UZS: 'UZ', VND: 'VN', YER: 'YE', CAD: 'CA',
};

function countryCodeToEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(char.charCodeAt(0) - 0x41 + 0x1F1E6))
    .join('');
}

export default function HomeScreen() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [favorites, setFavorites] = useState([]);

  const FREAKS_KEY = 'b890e7e7352d4376af7ad7054460ee89';

  useEffect(() => {
    fetchRates();
    loadFavorites();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await fetch(
        `https://api.currencyfreaks.com/latest?apikey=${FREAKS_KEY}`
      );
      const data = await response.json();

      const usdToCad = parseFloat(data.rates['CAD']);
      const codes = Object.keys(CURRENCY_TO_COUNTRY);

      const formatted = codes
        .map(code => {
          const usdToTarget = parseFloat(data.rates[code]);
          if (!isNaN(usdToTarget)) {
            const cadToTarget = (1 / usdToCad) * usdToTarget;
            return {
              currency: code,
              value: cadToTarget.toFixed(2),
            };
          }
          return null;
        })
        .filter(Boolean);

      setRates(formatted);
      setLastUpdated(data.date);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch exchange rates.');
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favoriteCurrencies');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.log('Error loading favorites:', e);
    }
  };

  const toggleFavorite = async (currency) => {
    let updated = [];
    if (favorites.includes(currency)) {
      updated = favorites.filter(item => item !== currency);
    } else {
      updated = [...favorites, currency];
    }
    setFavorites(updated);
    await AsyncStorage.setItem('favoriteCurrencies', JSON.stringify(updated));
  };

  //bookmark first
  const sortedRates = [...rates].sort((a, b) => {
    const aFav = favorites.includes(a.currency);
    const bFav = favorites.includes(b.currency);
    return aFav === bFav ? 0 : aFav ? -1 : 1;
  });

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

      {/* Header */}
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>💱 EXCHANGE LIST</Text>
        <Text style={styles.headerSubTitle}>Base Currency: CAD</Text>
      </View>

      {/* List */}
      <FlatList
        data={sortedRates}
        keyExtractor={item => item.currency}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No data available.</Text>}
        renderItem={({ item }) => {
          const iso = CURRENCY_TO_COUNTRY[item.currency];
          const flag = iso ? countryCodeToEmoji(iso) : '🏳';
          const isFav = favorites.includes(item.currency);

          return (
          <View style={styles.card}>
              {/* left*/}
              <View style={styles.cardLeft}>
                <Text style={styles.flagText}>{flag}</Text>
                <Text style={styles.currencyText}>{item.currency}</Text>
              </View>

              {/* right */}
              <View style={styles.cardRightRow}>
                <View style={styles.cardRightContent}>
                  <Text style={styles.valueText}>{item.value}</Text>
                  <Text style={styles.unitText}>{item.currency}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleFavorite(item.currency)}>
                  {isFav ? <BookmarkFill width={24} height={24} /> : <Bookmark width={24} height={24} />}
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.updatedText}>Last Updated: {lastUpdated}</Text>
      </View>
    </SafeAreaView>
  );
}