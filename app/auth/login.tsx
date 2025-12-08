import AuthBanner from '@/components/Auth/AuthBanner';
import AuthContent from '@/components/Auth/AuthContent';
import remUnit from '@/constants/Units';
import AuthService from '@/services/Auth';
import { LoginService } from '@/types/type';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from 'react-native';
import { Button, Checkbox, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginPage() {
    const [checked, setChecked] = useState(false);
    const [showPassWd, setShowPasswd] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (data: LoginService) => {
        const { email, senha } = data;
        const result = await AuthService.login({ email, senha });
        console.log(localStorage.getItem('auth_token'), 'autenticado!')

        if (result.status === 201) {
            setTimeout(() => {
                router.navigate('/(tabs)/notes')
            }, 500);
            return;
        };
        /*setIsLoading(true);
          setIsLoading(false);
  

        /* if(result?.code === 'ERR_NETWORK') {
           // setState({ vertical: 'top', horizontal: 'center', message: 'Ocorreu um erro ao logar', open: true });
            return;
        }
 
        //setState({ vertical: 'top', horizontal: 'center', message: result?.response.data.message, open: true });
    }

    /*  const handleClose = () => {
         setState({ ...state, open: false });
     }; */
    }

    const { control, handleSubmit, formState: { errors } } = useForm<LoginService>();

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
                                        <Controller
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    label="E-mail"
                                                    value={value}
                                                    mode='outlined'
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    style={{ backgroundColor: '#c2c2c2' }}
                                                    underlineColor="transparent"
                                                    activeUnderlineColor="transparent"
                                                    outlineColor="#c2c2c2"
                                                    activeOutlineColor="#000"
                                                    selectionColor="#000"
                                                    cursorColor="black"
                                                    textColor="#000"
                                                    placeholderTextColor='#6e6e6e'
                                                    theme={{
                                                        colors: {
                                                            onSurfaceVariant: 'black',
                                                            outline: 'transparent'
                                                        }
                                                    }}
                                                    autoComplete='off'
                                                    left={
                                                        <TextInput.Icon
                                                            icon="email"
                                                            color='#000'
                                                        />
                                                    }
                                                />
                                            )}
                                            name='email'
                                        />


                                        <View style={{ height: remUnit() }} />

                                        <Controller
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    label="Senha"
                                                    value={value}
                                                    mode='outlined'
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    style={{ backgroundColor: '#c2c2c2' }}
                                                    underlineColor="transparent"
                                                    activeUnderlineColor="transparent"
                                                    outlineColor="#c2c2c2"
                                                    activeOutlineColor="#000"
                                                    selectionColor="#000"
                                                    cursorColor="black"
                                                    textColor="#000"
                                                    placeholderTextColor='#6e6e6e'
                                                    theme={{
                                                        colors: {
                                                            onSurfaceVariant: 'black',
                                                            outline: 'transparent'
                                                        }
                                                    }}
                                                    autoComplete='off'
                                                    secureTextEntry={showPassWd}
                                                    left={
                                                        <TextInput.Icon
                                                            icon="lock"
                                                            color='#000'
                                                        />
                                                    }
                                                    right={
                                                        <TextInput.Icon
                                                            icon={showPassWd ? 'eye' : 'eye-closed'}
                                                            onPress={() => setShowPasswd(!showPassWd)}
                                                            color='#000'
                                                        />
                                                    }
                                                />
                                            )}
                                            name='senha'
                                        />
                                    </View>
                                    <View style={{ height: remUnit() }} />
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

                                    <View style={{ height: remUnit(3.25) }} />

                                    <View>
                                        <Button
                                            mode="contained"
                                            onPress={handleSubmit(handleLogin)}
                                            style={{ borderRadius: remUnit(.75), backgroundColor: '#969696ff' }}
                                            textColor='#000'
                                        >Login</Button>
                                        <View style={{ height: remUnit(2) }} />
                                        <Text variant="bodySmall" style={{ color: '#797979ff', textAlign: 'center' }}>Já possui uma conta? <Link href={'/auth/register'}>Cadastre-se</Link></Text>
                                    </View>
                                </View>
                            </View>
                        </>
                    }
                />
            </ScrollView>
        </SafeAreaView>
    )
}