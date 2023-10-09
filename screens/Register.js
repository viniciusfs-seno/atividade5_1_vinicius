import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Separator from '../components/Separator';

export default function Register({ navigation }) {
  const [state, setState] = React.useState({
    userName: '',
    userPhone: '',
    userEmail: '',
    userPassword: '',
});

const [userPasswordConfirm, setUserPasswordConfirm] = React.useState('');

const saveUserData = (userData) => {
  return SecureStore.setItemAsync('userData', JSON.stringify(userData));
};

function handleRegister() {
  if (!state.userName || !state.userPhone || !state.userEmail || !state.userPassword || !userPasswordConfirm) {
    Alert.alert(
      'Erro ao tentar cadastrar usuário: ',
      'Preencha todos os campos corretamente!'
    );
  } else {
    if (state.userPassuord !== userPasswordConfirm) {
      Alert.alert(
        'Erro ao tentar cadastrar usuário: ',
        'Senha não confere com a confirmação da senha!'
      );
    } else {
      saveUserData({ name: state.userName, phone: state.userPhone, email: state.userEmail });
    }
  }
}

const handlerChangeText = (key, value) => {
  setState({ ...state, [key]: value})
}

return (
  <View style={styles.container}>
    <Text style={styles.titleText}>Dados do Usuário</Text>
    <TextInput
      style={styles.input}
      value={state.userName}
      onChangeText={(value) => handleChangeText('userName', value)}
      placeholder={'Dados do usuário'}
    />
    <TextInput
      style={styles.input}
      value={state.userPhone}
      onChangeText={(value) => handleChangeText('userPhone', value)}
      placeholder={'Telefone'}
      keyboardType="numeric"
    />
    <TextInput
      style={styles.input}
      value={state.userEmail}
      onChangeText={(value) => handleChangeText('userEmail', value)}
      placeholder={'Email'}
      keyboardType="email-address"
      textContentType="emailAddress"
      autoCapitalize="none"
    />
    <TextInput
      style={styles.input}
      value={state.userPassword}
      onChangeText={(value) => handleChangeText('userPassword', value)}
      placeholder={'Senha'}
      secureTextEntry={true}
    />
    <TouchableOpacity style={styles.saveButton} onPress={handleRegister}>
      <Text style={styles.saveButtonText}>Salver</Text>
    </TouchableOpacity>

    <Separator marginVertical={30} />
    <Text style={styles.textSimple}>Atenção!</Text>
    <Text style={styles.textSimple}>Informe um email válido!</Text>
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
    marginBotton: 20,
    textAlign: 'center',
  },
  saveButton: {
    width: '50%',
    height: 40,
    backgroundColor: '#E37D00',
    padding: 5,
    borderRadius: 5,
  },
  saveButtonText: {
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
    marginButton: 10,
  },
  textSimple: {
    color: '#730000',
    width: '95%',
    textAlign: 'justify'
  },
});