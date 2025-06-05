import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F4F7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  box: {
    height: 56,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 14,
    backgroundColor: '#fff',
    fontSize: 12,
    color: '#555',
    paddingHorizontal: 4,
  },
  inputBox: {
    fontSize: 16,
    color: '#333',
    height: 40,
    paddingLeft: 12,
    marginTop: 4,
  },
  pickerWrapper: {
    height: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  picker: {
    height: '100%',
    width: '100%',
    color: '#333',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#007AFF',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    width: '70%',       
    alignSelf: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#DCEEFE',
    borderRadius: 16,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
  },
});