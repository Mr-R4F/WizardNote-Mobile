import remUnit from "@/constants/Units";
import { View, Image } from "react-native";
import { Button, Text, TextInput } from 'react-native-paper';

export default function AuthBanner() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
                <Text variant="displayMedium" style={{ textAlign: 'center', color: '#000' }}>
                    Bem Vindo!!
                </Text>
                <Text variant="bodyLarge" style={{ textAlign: 'center', color: '#000' }}>
                    Aproveite o que a WizardNote tem de melhor!
                </Text>
            </View>

            <View style={{ height: remUnit(3) }} />

            <Text variant="displayMedium">
             <Text variant="displayMedium">
                <Image
                    source={require('../../assets/images/logo.jpg')}
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 10
                    }}
                />
            </Text>
            </Text>
        </View>
    );
}
