import AuthInfo from '@/components/Auth/AuthBanner';
import AuthContent from '@/components/Auth/AuthContent';
import remUnit from '@/constants/Units';
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Button, Text, } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainPage() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<AuthInfo />

				<AuthContent
					context={
						<>
							<Text variant="displaySmall" style={{ color: '#000' }}>Começar por</Text>

							<View style={{ height: remUnit(4) }} />

							<View style={{ width: '75%' }}>
								<Button mode="contained" onPress={() => router.navigate('/auth/login')}>Login</Button>
								<View style={{ height: remUnit(1) }} />
								<Button mode="contained" onPress={() => router.navigate('/auth/register')}>Cadastro</Button>
							</View>
						</>
					} />
			</ScrollView>
		</SafeAreaView>
	);
}