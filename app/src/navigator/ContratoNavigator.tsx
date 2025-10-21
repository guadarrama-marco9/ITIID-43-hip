import { createStackNavigator } from "@react-navigation/stack";
import { HomeContrato } from "../screens/contrato/HomeContrato";
import { FormContrato } from "../screens/contrato/FormContrato";
import { ContratoResponse } from "../interfaces/contratoInterfaces";

export type RootStackContrato = {
    HomeContrato:   undefined;
    FormContrato:   ContratoResponse;
}

export const ContratoNavigator = () => {

    const Stack = createStackNavigator<RootStackContrato>();

    return(
        <Stack.Navigator
            initialRouteName="HomeContrato"
            screenOptions={{
                headerMode: "float",
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="HomeContrato"
                component={ HomeContrato }
            />
            <Stack.Screen
                name="FormContrato"
                component={ FormContrato }
            />
        </Stack.Navigator>
    );
}
