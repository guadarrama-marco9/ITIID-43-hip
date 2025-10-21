import React, {useEffect} from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { appTheme } from '../../themes/appTheme';
import { useContratoApi } from '../../hooks/useContratoApi';
import { BtnTouch } from '../../components/BtnTouch';
import { ContratoResponse } from '../../interfaces/contratoInterfaces';
import { ContratoCard } from '../../components/ContratoCard';

export const HomeContrato = () => {

    const { isLoading, loadContratos, listContrato } = useContratoApi();

    const focused = useIsFocused();

    const navigation = useNavigation();

    const create: ContratoResponse = {
        id_contrato:           0,
        usuario:               "",
        fecha_contratacion:    "",
        imagen1:               "",
        imagen2:               "",
        imagen3:               "",
    };

    useEffect(() => {
        (!isLoading) && loadContratos();
    },[focused]);

    return(
        <View
            style={ appTheme.marginGlobal }
        >
            <FlatList
                data={ Object.values(listContrato) }
                keyExtractor={ (item) => "#"+item.id_contrato }
                ListHeaderComponent={(
                    <View
                        style={ appTheme.container }
                    >
                        <Text
                            style={ appTheme.title }
                        >
                            Lista de Contratos
                        </Text>
                        <BtnTouch
                            titulo='Crear contrato'
                            color='blue'
                            action={ () => (navigation as any).navigate("FormContrato",{...create}) }
                        />
                    </View>
                )}
                refreshControl={(
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={ loadContratos }
                        colors={[ "yellow", "violet", "blue" ]}
                        progressBackgroundColor="black"
                    />
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={ ({item}) => (
                    <ContratoCard
                        contrato={ item }
                    />
                )}
            />
        </View>
    );
}
