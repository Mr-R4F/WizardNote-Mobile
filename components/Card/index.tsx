import AppModal from '@/components/Modal';
import remUnit from "@/constants/Units";
import { CardContentProps } from '@/types/type';
import { JSX, useState } from "react";
import { View } from "react-native";
import { Button, Card, IconButton, Text, TextInput, TouchableRipple } from 'react-native-paper';

export default function AppCard({ content }: CardContentProps) {

    return (
        <Card elevation={4} style={{ padding: 16, borderRadius: remUnit() }}>
            {content}
        </Card>
    );
}