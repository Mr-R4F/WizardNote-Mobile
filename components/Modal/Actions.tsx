import remUnit from "@/constants/Units";
import { CardActionsProps } from "@/types/type";
import { View } from "react-native";
import { Button } from 'react-native-paper';

export default function AppModalActions({ reqType, onClose }: CardActionsProps) {
    return (
        <View style={{ position: 'absolute', right: 0, top: -70, flexDirection: 'row' }}>
            {reqType && (
                <>
                    <Button
                        mode="elevated"
                        style={{ borderRadius: remUnit(.75), backgroundColor: '#272727' }}
                        textColor='#FFF'
                    >
                        {
                            reqType === 'create'
                                ? 'Criar'
                                : reqType === 'edit'
                                    ? 'Editar'
                                    : 'Remover'
                        }
                    </Button>

                    <View style={{ width: remUnit() }} />

                </>

            )}

            <Button icon="close" mode="contained-tonal" onPress={onClose} style={{ borderRadius: remUnit(.75), backgroundColor: '#969696ff' }} textColor='#000'> Fechar</Button>
        </View>
    );
}