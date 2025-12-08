import remUnit from "@/constants/Units";
import { JSX } from "react";
import { View } from "react-native";

export default function AuthContent(ContentProps: { context: JSX.Element }) {
    return (
        <View style={{
            backgroundColor: 'lightgray',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
            paddingVertical: 45,
            borderTopRightRadius: remUnit(2.5),
            borderTopLeftRadius: remUnit(2.5),
        }}>
            {ContentProps.context}
        </View>
    );
}