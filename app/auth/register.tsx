import AuthBanner from '@/components/Auth/AuthBanner';
import AuthContent from '@/components/Auth/AuthContent';
import remUnit from '@/constants/Units';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Button, Checkbox, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterPage() {
    const [mailInput, setMailInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [passwdInput, setPasswdInput] = useState("");
    const [confirmPassWdInput, setConfirmPassWdInput] = useState("");
    const [showPassWd, setShowPasswd] = useState(true);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <AuthBanner />
                <AuthContent
                    context={
                        <>
                            <Text variant="displaySmall" style={{ color: '#000', textAlign: 'center' }}>Criar a sua conta</Text>
                            <View style={{ height: remUnit(3.3) }}></View>

                            <View style={{ width: '85%' }}>
                                <View role='form'>
                                    <View>
                                        <TextInput
                                            label="E-mail"
                                            value={mailInput}
                                            mode='outlined'
                                            onChangeText={text => setMailInput(text)}
                                            autoComplete='off'
                                            left={<TextInput.Icon icon="email" />}
                                        />
                                        <View style={{ height: remUnit(1) }} />
                                        <TextInput
                                            label="Nome"
                                            value={nameInput}
                                            mode='outlined'
                                            onChangeText={text => setNameInput(text)}
                                            autoComplete='off'
                                            left={<TextInput.Icon icon="account" />}
                                        />
                                        <View style={{ height: remUnit(1) }} />
                                        <TextInput
                                            label="Senha"
                                            value={passwdInput}
                                            mode='outlined'
                                            onChangeText={text => setPasswdInput(text)}
                                            autoComplete='off'
                                            secureTextEntry={showPassWd}
                                            left={<TextInput.Icon icon="lock" />}
                                            right={
                                                <TextInput.Icon
                                                    icon={showPassWd ? 'eye' : 'eye-closed'}
                                                    onPress={() => setShowPasswd(!showPassWd)} 
                                                />
                                            }
                                        />
                                        <View style={{ height: remUnit(1) }} />
                                        <TextInput
                                            label="Confirmar senha"
                                            value={confirmPassWdInput}
                                            mode='outlined'
                                            onChangeText={text => setConfirmPassWdInput(text)}
                                            autoComplete='off'
                                            secureTextEntry={showPassWd}
                                            left={<TextInput.Icon icon="lock-check" />}
                                            right={
                                                <TextInput.Icon
                                                    icon={showPassWd ? 'eye' : 'eye-closed'}
                                                    onPress={() => setShowPasswd(!showPassWd)}
                                                />
                                            }
                                        />
                                    </View>

                                </View>

                                <View style={{ height: remUnit(3.25) }} />

                                <View>
                                    <Button
                                        mode="contained"
                                        onPress={
                                            () => {
                                                router.navigate('/auth/login');
                                            }
                                        }
                                    >Cadastrar-se</Button>
                                    <View style={{ height: remUnit(2) }} />
                                    <Text variant="bodySmall" style={{ color: '#797979ff', textAlign: 'center' }}>Já possui uma conta? <Link href={'/auth/login'}>Logue-se</Link></Text>
                                </View>
                            </View>
                        </>
                    }
                />
            </ScrollView>
        </SafeAreaView>
    )
}