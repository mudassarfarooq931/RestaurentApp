import {colors} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#e5e5e5',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    minHeight: 48,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
