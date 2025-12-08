import AuthBanner from '@/components/Auth/AuthBanner';
import AuthContent from '@/components/Auth/AuthContent';
import AppSnackBar from '@/components/SnackBar';
import remUnit from '@/constants/Units';
import AuthService from '@/services/Auth';
import { RegisterService } from '@/types/type';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterPage() {
    const [confirmPassWdInput, setConfirmPassWdInput] = useState("");
    const [showPassWd, setShowPasswd] = useState(true);
    const { control, handleSubmit, formState: { errors }, reset } = useForm<RegisterService>();
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [content, setContent] = useState('');

    useEffect(() => {
        reset({
            nome: "",
            email: "",
            senha: ""
        })
        setConfirmPassWdInput("")
    }, []);

    const handleRegister = async (data: RegisterService) => {
        try {
            const { nome, email, senha } = data;

            setIsLoading(true);
            const result = await AuthService.register({ nome, email, senha });
            setIsLoading(false);

            if (result.status === 201) {
                onToggleSnackBar();
                setContent('Cadastro realizado com sucesso!');

                setTimeout(() => {
                    onDismissSnackBar();
                }, 1800);

                setTimeout(() => {
                    router.navigate('/auth/login');
                }, 2200);

                return;
            };
        } catch (error) {
            setIsLoading(false);
            setContent('Ocorreu um erro');
            console.log(error)
        }

        /*
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
                                                            icon="account"
                                                            color='#000'
                                                        />
                                                    }
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
                                        <View style={{ height: remUnit(1) }} />
                                        <TextInput
                                            label="Confirmar senha"
                                            value={confirmPassWdInput}
                                            mode='outlined'
                                            onChangeText={text => setConfirmPassWdInput(text)}
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
                                                    icon="lock-check"
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
                                    </View>

                                </View>

                                <View style={{ height: remUnit(3.25) }} />

                                <View>
                                    <Button
                                        mode="contained"
                                        onPress={handleSubmit(handleRegister)}
                                        style={{ borderRadius: remUnit(.75), backgroundColor: '#969696ff' }}
                                        textColor='#000'
                                    >{
                                            isLoading
                                                ?
                                                <ActivityIndicator animating={true} size={remUnit(.9)} color='#000' />
                                                :
                                                'Cadastrar'
                                        }</Button>
                                    <View style={{ height: remUnit(2) }} />
                                    <Text variant="bodySmall" style={{ color: '#797979ff', textAlign: 'center' }}>Já possui uma conta? <Link href={'/auth/login'}>Logue-se</Link></Text>
                                </View>
                            </View>
                        </>
                    }
                />
                <View>
                    <AppSnackBar
                        content={content}
                        visible={visible}
                        onDismissSnackBar={onDismissSnackBar}
                        icon={'close'}
                        elevation={4}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}