import remUnit from "@/constants/Units";
import { ModalContentProps } from "@/types/type";
import { JSX, useState } from "react";
import { View } from "react-native";
import { Button, Card, IconButton, Text, TextInput, TouchableRipple, Portal, Modal } from 'react-native-paper';

export default function AppModal({ visible, onDismiss, content }: ModalContentProps) {
    return (
        <Portal>
            <Modal 
                visible={visible} 
                onDismiss={onDismiss}
                contentContainerStyle={{ backgroundColor: '#FFF', width: '92%', padding: 15, borderRadius: remUnit()}}
                style={{alignItems: 'center'}}
            >
                {content}
            </Modal>
        </Portal>
    );
}