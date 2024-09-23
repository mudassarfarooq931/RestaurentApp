import {Input, PrimaryHeader} from '@components';
import {colors, ScreenEnum} from '@constants';
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {navigate} from '../../../root-navigation';

interface IMessage {
  id: string;
  text: string;
  sender: 'user' | 'other';
}

const ChatScreen: React.FC = ({route}: any) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const flatListRef = useRef<FlatList<IMessage>>(null);
  const {username, profileImage} = route?.params?.item;
  console.log(username, profileImage);

  const sendMessage = () => {
    if (messageText.trim().length > 0) {
      const newMessage: IMessage = {
        id: (messages.length + 1).toString(),
        text: messageText,
        sender: 'user',
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);

      // Clear input after sending message
      setMessageText('');
      console.log('Message sent:', newMessage); // Add this to verify the message is sent
      console.log('Message text cleared:', messageText); // Ensure input is cleared

      // Dismiss the keyboard
      Keyboard.dismiss();

      // Scroll to the latest message
      setTimeout(() => flatListRef.current?.scrollToEnd({animated: true}), 100);
    }
  };

  const renderMessage = ({item}: {item: IMessage}) => {
    const isUser = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.otherMessage,
        ]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}>
      <PrimaryHeader
        imgShow={true}
        title={username}
        profileImage={profileImage}
        onPress={() => navigate(ScreenEnum?.Inbox)}
      />
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 10}}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({animated: true})
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message"
          multiline
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

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

export default ChatScreen;
