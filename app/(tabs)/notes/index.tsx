import AppCard from '@/components/Card';
import AppModal from '@/components/Modal';
import AppModalActions from '@/components/Modal/Actions';
import remUnit from '@/constants/Units';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, IconButton, Text, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotesPage() {
	const [showCardActions, setShowCardActions] = useState(true);

	const [visible, setVisible] = useState(false);

	const [onShow, setOnShow] = useState(false);
	const [onCreate, setOnCreate] = useState(false);
	const [onEdit, setOnEdit] = useState(false);
	const [onDelete, setOnDelete] = useState(false);

	const [req, setReq] = useState('');

	useEffect(() => {
		if (!visible) {
			// aguarda 100ms para a animação do modal terminar
			setTimeout(() => {
				setOnEdit(false);
				setOnDelete(false);
				setOnShow(false);
				setReq('');
			}, 120);
		}
	}, [visible]);

	return (
		<SafeAreaView style={{ flex: 1, padding: 20 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View>
					<Text variant="displaySmall" style={{ color: '#000' }}>Minhas Notas</Text>
				</View>
				<View style={{ height: remUnit(2) }} />
				<View>
					<TouchableRipple
						onPress={() => {
							setOnShow(!onShow)
							setVisible(!visible)
						}}
						onLongPress={() => setShowCardActions(!showCardActions)}
						rippleColor="rgba(0, 0, 0, .32)"
					>
						<AppCard content={
							<>
								<Card.Title titleVariant="titleLarge" title="Conceito de IA" style={{ padding: 0, margin: 0, minHeight: 0 }} />
								<Card.Content style={{ padding: 0, alignSelf: 'flex-start' }}>
									<Text variant="bodyMedium" style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam sit deleniti odio alias ipsum laborum in ex perferendis fugiat, doloribus fuga nemo provident autem omnis cumque nam temporibus error expedita?</Text>
								</Card.Content>
								{
									showCardActions &&

									<Card.Actions style={{ padding: 0, position: 'absolute', right: 0, bottom: -70 }}>
										<IconButton
											icon="pencil"
											size={20}
											onPress={() => {
												setVisible(!visible);
												setOnEdit(!onEdit);
												setReq('edit');
											}}
										/>
										<IconButton
											icon="trash-can-outline"
											size={20}
											onPress={() => {
												setVisible(!visible);
												setOnDelete(!onDelete);
												setReq('delete');
											}}
										/>
									</Card.Actions>
								}
							</>
						} />
					</TouchableRipple>

					<AppModal
						visible={visible}
						onDismiss={() => setVisible(false)}
						content={
							<>
								<AppModalActions
									reqType={req}
									onClose={() => setVisible(false)}
								/>
								{
									onShow ?
										<Text variant="titleLarge" style={{ color: '#000' }}>Views</Text>
										: onCreate ?
											<>
												<View>
													<Text variant="titleLarge" style={{ color: '#000' }}>Criar a nota selecionada?</Text>
													<Text variant="bodySmall" style={{ color: '#b1b1b1ff', textAlign: 'center' }}>Esta ação não poderá ser desfeita</Text>
												</View>
												<View style={{ height: remUnit(1.5) }}></View>
												<View>
													<Text variant="titleLarge" style={{ color: '#000' }}>Conceito de IA</Text>
												</View>
											</>
											: onEdit ?
												<>
													<Text variant="titleLarge" style={{ color: '#000' }}>Edit</Text>
													<View style={{ height: remUnit(1.5) }}></View>
													<Text variant="bodyMedium" style={{ color: '#000', textAlign: 'justify' }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam sit deleniti odio alias ipsum laborum in ex perferendis fugiat, doloribus fuga nemo provident autem omnis cumque nam temporibus error expedita?</Text>
												</>
												:
												<>
													<View>
														<Text variant="titleLarge" style={{ color: '#000', textAlign: 'center' }}>Remover a nota selecionada?</Text>
														<Text variant="bodySmall" style={{ color: '#b1b1b1ff', textAlign: 'center' }}>Esta ação não poderá ser desfeita</Text>
													</View>
													<View style={{ height: remUnit(1.5) }}></View>
													<View>
														<Text variant="titleLarge" style={{ color: '#000' }}>Conceito de IA</Text>
													</View>
												</>
								}

							</>
						}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}