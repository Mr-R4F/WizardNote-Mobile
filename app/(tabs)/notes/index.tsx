import AuthInfo from '@/components/Auth/AuthBanner';
import AuthContent from '@/components/Auth/AuthContent';
import remUnit from '@/constants/Units';
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Button, Text, } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotesPage() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<div>teste</div>
			</ScrollView>
		</SafeAreaView>
	);
}