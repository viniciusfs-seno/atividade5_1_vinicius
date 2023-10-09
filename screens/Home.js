import * as React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC300',
  },
});

export default function Home({ navigation, route }) {
  const { name } = route.params;

  const handleLogout = async () => {
    // Clear the stored user data when logging out.
    await SecureStore.deleteItemAsync('userData');
    navigation.replace('Login'); // Navigate back to the "Login" screen.
  };
  


  return (
    <View style={styles.container}>
      <Text>Tela Home</Text>
      <Text>Olá {name}, seja bem-vindo!</Text>

      <Button title="Logout" onPress={handleLogout} color="#D26900" />
    </View>
  );
}
