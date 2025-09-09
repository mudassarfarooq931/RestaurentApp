import {PrimaryHeader} from '@components';
import {appEnums} from '@constants';
import React, {useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';

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
      <PrimaryHeader title={username} />
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
          placeholder={appEnums.FormPlaceholder.TYPE_MESSAGE}
          multiline
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>{appEnums.ButtonLabel.SEND}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
