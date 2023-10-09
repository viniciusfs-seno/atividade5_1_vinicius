import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function Register({ navigation }) {
  const [state, setState] = React.useState({
    userName: '',
    userPhone: '',
    userEmail: '',
    userPassword: '',
  });

  const [userPasswordConfirm, setUserPasswordConfirm] = React.useState('');

  async function saveUserData(userData) {
    await SecureStore.setItemAsync('userData', JSON.stringify(userData));
  }

  function handleRegister() {
    if (!state.userName || !state.userPhone || !state.userEmail || !state.userPassword || !userPasswordConfirm) {
      Alert.alert(
        'Erro ao tentar cadastrar usuário: ',
        'Preencha todos os campos corretamente!'
      );
    } else {
      if (state.userPassword !== userPasswordConfirm) {
        Alert.alert(
          'Erro ao tentar cadastrar usuário: ',
          'Senha não confere com a confirmação da senha!'
        );
      } else {
        const userData = {
          name: state.userName,
          phone: state.userPhone,
          email: state.userEmail,
          password: state.userPassword, // Store the password as well
        };
        saveUserData(userData); // Save the user data
        navigation.navigate('Login'); // Redirect to login screen
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Dados do Usuário</Text>
      <TextInput
        style={styles.input}
        value={state.userName}
        onChangeText={(value) => setState({ ...state, userName: value })}
        placeholder={'Nome de usuário'}
      />
      <TextInput
        style={styles.input}
        value={state.userPhone}
        onChangeText={(value) => setState({ ...state, userPhone: value })}
        placeholder={'Telefone'}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={state.userEmail}
        onChangeText={(value) => setState({ ...state, userEmail: value })}
        placeholder={'Email'}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={state.userPassword}
        onChangeText={(value) => setState({ ...state, userPassword: value })}
        placeholder={'Senha'}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={userPasswordConfirm}
        onChangeText={(value) => setUserPasswordConfirm(value)}
        placeholder={'Confirme a senha'}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC300',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#730000',
    marginBottom: 20,
    textAlign: 'center',
  },
  registerButton: {
    width: '50%',
    height: 40,
    backgroundColor: '#E37D00',
    padding: 5,
    borderRadius: 5,
  },
  registerButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#730000',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#730000',
    borderRadius: 4,
    marginBottom: 10,
  },
});
