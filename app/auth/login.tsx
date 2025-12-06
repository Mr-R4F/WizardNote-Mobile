import AuthBanner from '@/components/Auth/AuthBanner';
import AuthContent from '@/components/Auth/AuthContent';
import remUnit from '@/constants/Units';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginPage() {
    const [mailInput, setMailInput] = useState("");
    const [passwdInput, setPasswdInput] = useState("");
    const [checked, setChecked] = useState(false);
    const [showPassWd, setShowPasswd] = useState(true);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <AuthBanner />

                <AuthContent
                    context={
                        <>
                            <Text variant="displaySmall" style={{ color: '#000', textAlign: 'center' }}>Acessar a sua conta</Text>
                            <View style={{ height: remUnit(3.3) }}></View>

                            <View style={{ width: '85%' }}>
                                <View role='form'>
                                    <View>
                                        <TextInput
                                            label="E-mail"
                                            value={mailInput}
                                            mode='outlined'
                                            style={{ width: '100%' }}
                                            onChangeText={text => setMailInput(text)}
                                            autoComplete='off'
                                            left={<TextInput.Icon icon="email" />}
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
                                    </View>
                                    <View style={{ height: remUnit(1) }} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
                                        <Checkbox.Item
                                            style={{ padding: 0 }}
                                            color='#000'
                                            label='Lembrar de mim'
                                            labelVariant='bodySmall'
                                            position='leading'

                                            labelStyle={{ color: '#797979ff' }}
                                            status={checked ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setChecked(!checked);
                                            }}
                                        />

                                        <Text variant="bodySmall" style={{ color: '#797979ff' }}>Esqueceu a senha?</Text>

                                    </View>
                                </View>

                                <View style={{ height: remUnit(3.25) }} />

                                <View>
                                    <Button
                                        mode="contained"
                                        onPress={() => router.navigate('/(tabs)/notes')}
                                    >Login</Button>
                                    <View style={{ height: remUnit(2) }} />
                                    <Text variant="bodySmall" style={{ color: '#797979ff', textAlign: 'center' }}>Já possui uma conta? <Link href={'/auth/register'}>Cadastre-se</Link></Text>
                                </View>
                            </View>
                        </>
                    }
                />
            </ScrollView>
        </SafeAreaView>
    )
}