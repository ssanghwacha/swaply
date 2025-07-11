import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F4F7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },

  // Header
  headerTitleContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ECECEC',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#007AFF',
  },
  headerSubTitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },

  // List
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagText: {
    fontSize: 24,
    marginRight: 8,
  },
  currencyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
 cardRightRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
},
cardRightContent: {
  alignItems: 'flex-end',
},
  valueText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  unitText: {
    marginTop: 2,
    fontSize: 12,
    color: '#888',
  },
  bookmarkIcon: {
    marginTop: 8,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ECECEC',
  },
  updatedText: {
    fontSize: 12,
    color: '#888',
  },
});