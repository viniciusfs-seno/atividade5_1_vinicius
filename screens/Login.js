import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Separator from '../components/Separator';

export default function Login({ navigation, route }) {
  const [registeredState, setRegisteredState] = React.useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [haveAccount, setHaveAccount] = React.useState(false);

  async function getUserData() {
    let userData = await SecureStore.getItemAsync('userData');
    if (userData) {
      const userDataObject = JSON.parse(userData);
      setEmail(userDataObject.email);
      setRegisteredState({ ...userDataObject });
      setHaveAccount(true);
    } else {
      setHaveAccount(false);
    }
  }

  async function handleDeleteRegister() {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await SecureStore.deleteItemAsync('userData');
            // Add any additional cleanup or navigation logic here if needed.
          },
          style: 'destructive',
        },
      ]
    );
  }

  React.useEffect(() => {
    getUserData();

    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });

    return () => {
      unsubscribe.remove();
    };
  }, [navigation]);

  function handleLogin() {
    if (email === registeredState.email && password === registeredState.password) {
      setPassword('');
      navigation.replace('Home', { name: registeredState.name });
    } else {
      Alert.alert(
        'Erro ao tentar efetuar o login: ',
        'Informe o e-mail e a senha corretos!'
      );
    }
  }

  function handleRegister() {
    setEmail('');
    setPassword('');
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Secure Store App</Text>
      <TextInput
        style={styles.input}
        defaultValue={email}
        value={email}
        onChangeText={(value) => setEmail(value)}
        placeholder={'E-mail'}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(value) => setPassword(value)}
        placeholder={'Senha'}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <Separator marginVertical={10} key="separator1" />
      {!haveAccount ? (
        <>
          <Text style={styles.textSimple}>É a primeira vez aqui e ainda não se cadastrou?</Text>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastre-se</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.textSimple}>Já possui uma conta, mas...</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Alert.alert(
                'Informação: ',
                `A sua senha foi enviada para o email cadastrado: ${registeredState.email} ${registeredState.password}`
              )
            }
          >
            <Text style={styles.buttonText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </>
      )}
      <Separator marginVertical={30} />
      <Text style={styles.textSimpleJustify}>
        Este aplicativo faz uso de armazenamento local com SecureStore e fará também com AsyncStorage
      </Text>

      <TouchableOpacity style={styles.saveButton} onPress={handleDeleteRegister}>
        <Text style={styles.saveButtonText}>Deletar chave</Text>
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
  button: {
    backgroundColor: '#E37D00',
    padding: 5,
    borderRadius: 5,
  },
  loginButton: {
    width: '50%',
    height: 40,
    backgroundColor: '#E37D00',
    padding: 5,
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#730000',
    textAlign: 'center',
  },
  buttonText: {
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
    borderRadius: 5,
    marginBottom: 10,
  },
  textSimple: {
    color: '#730000',
  },
  textSimpleJustify: {
    color: '#730000',
    width: '95%',
    textAlign: 'justify',
  },
  saveButton: {
    backgroundColor: '#E37D00',
    padding: 5,
    borderRadius: 5,
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: '#730000',
    textAlign: 'center',
  },
});
