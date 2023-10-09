import * as React from 'react';
import { Text, View, Button, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

const Stack = createStackNavigator();


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FEF3BA' }}>
      <StatusBar style="auto" backgroundColor="#AD6200" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#E37D00' },
            headerTintColor: '#FFFFFF',
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login',
              headerTitleStyle: { fontWeight: 'bold', textAlign: 'center' },
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: 'Cadastre-se',
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              title: 'Home',
              headerRight: () => (
                <Button
                  onPress={() => {
                    Alert.alert(
                      'Atenção!',
                      'Deseja sair do aplicativo?',
                      [
                        {
                          text: 'Sim',
                          onPress: () => navigation.replace('Login'),
                        },
                        {
                          text: 'Não',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                  title="Sair"
                  color="#D26900"
                />
              ),
              headerTitleStyle: { fontWeight: 'bold', textAlign: 'center' },
              titleStyle: { padding: 10, color: '#D26900' }, // Estilo para o título do botão
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
