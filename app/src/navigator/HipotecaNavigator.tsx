import { createStackNavigator } from "@react-navigation/stack";
import { HomeHipoteca } from "../screens/hipoteca/HomeHipoteca";
import { FormHipoteca } from "../screens/hipoteca/FormHipoteca";
import { HipotecaResponse } from "../interfaces/hipotecaInterfaces";

export type RootStackHipoteca = {
  HomeHipoteca: undefined;
  FormHipoteca: HipotecaResponse;
}

export const HipotecaNavigator = () => {
  const Stack = createStackNavigator<RootStackHipoteca>();
  return (
    <Stack.Navigator initialRouteName="HomeHipoteca" screenOptions={{ headerMode: 'float', headerShown: false }}>
      <Stack.Screen name="HomeHipoteca" component={ HomeHipoteca } />
      <Stack.Screen name="FormHipoteca" component={ FormHipoteca } />
    </Stack.Navigator>
  );
}
