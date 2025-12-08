import AuthBanner from '@/components/Auth/AuthBanner';
import AuthContent from '@/components/Auth/AuthContent';
import remUnit from '@/constants/Units';
import AuthService from '@/services/Auth';
import { RegisterService } from '@/types/type';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterPage() {
    const [confirmPassWdInput, setConfirmPassWdInput] = useState("");
    const [showPassWd, setShowPasswd] = useState(true);

    const handleRegister = async (data: RegisterService) => {
        const { nome, email, senha } = data;
        const result = await AuthService.register({ nome, email, senha });

        if (result.status === 201) {
            setTimeout(() => {
                router.navigate('/auth/login');
            }, 2000);
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

        /*   setTimeout(() => {
             
          }, 3000); */
    }

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterService>();

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
                                                    autoComplete='off'
                                                    left={<TextInput.Icon icon="email" />}
                                                />
                                            )}
                                            name='email'
                                        />
                                        <View style={{ height: remUnit(1) }} />
                                        <Controller
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    label="Nome"
                                                    value={value}
                                                    mode='outlined'
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    autoComplete='off'
                                                    left={<TextInput.Icon icon="account" />}
                                                />
                                            )}
                                            name='nome'
                                        />
                                        <View style={{ height: remUnit(1) }} />
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
                                            )}
                                            name='senha'
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
                                        onPress={handleSubmit(handleRegister)}
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