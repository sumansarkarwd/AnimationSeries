import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InShort from './src/components/InShort';
import AppleMusic from './src/components/AppleMusic';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="InShort" onPress={() => navigation.navigate('InShort')} />
      <Button
        title="AppleMusic"
        onPress={() => navigation.navigate('AppleMusic')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InShort"
          component={InShort}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AppleMusic"
          component={AppleMusic}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
