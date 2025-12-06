import remUnit from "@/constants/Units";
import { router } from "expo-router";
import { JSX } from "react";
import { View } from "react-native";
import { Button, Text} from 'react-native-paper';

export default function AuthContent(ContentProps: { context: JSX.Element }) {
    return (
        <View style={{
            backgroundColor: 'lightgray',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
            paddingVertical: 45
        }}>
            {ContentProps.context}
        </View>
    );
}