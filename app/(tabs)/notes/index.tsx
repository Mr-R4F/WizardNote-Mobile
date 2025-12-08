import AppCard from '@/components/Card';
import AppModal from '@/components/Modal';
import AppModalActions from '@/components/Modal/Actions';
import AppSnackBar from '@/components/SnackBar';
import remUnit from '@/constants/Units';
import NoteService from '@/services/Note';
import { CreateNoteService, UpdateNoteService } from '@/types/type';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { AnimatedFAB, Button, Card, IconButton, Text, TextInput, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotesPage() {
	const [activeCardId, setActiveCardId] = useState<number | null>(null);
	const [visible, setVisible] = useState(false);
	const [SnackBarVisible, setSnackBarVisible] = useState(false);
	const [onShow, setOnShow] = useState(false);
	const [onCreate, setOnCreate] = useState(false);
	const [onEdit, setOnEdit] = useState(false);
	const [onDelete, setOnDelete] = useState(false);
	const [selectedNote, setSelectedNote] = useState<any>(null);
	const [req, setReq] = useState('');

	const onToggleSnackBar = () => setSnackBarVisible(!SnackBarVisible);
	const onDismissSnackBar = () => setSnackBarVisible(false);
	const [content, setContent] = useState('');

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: ["nota"],
		queryFn: () => NoteService.index(),
	});

	const deleteNoteMutation = useMutation({
		mutationFn: (id: number) => NoteService.destroy(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["nota"] });
		}
	});


	const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateNoteService | UpdateNoteService>();
	const [extended, setExtended] = useState(false);

	useEffect(() => {
		if (!visible) {
			setTimeout(() => {
				setOnShow(false);
				setOnEdit(false);
				setOnDelete(false);
				setOnCreate(false);
				setReq('');
			}, 120);
		}
	}, [visible]);

	useEffect(() => {
		if (onEdit && selectedNote) {
			reset({
				titulo: selectedNote.titulo,
				conteudo: selectedNote.conteudo,
			});
		}
	}, [onEdit, selectedNote]);


	useEffect(() => {
		if (onCreate) {
			reset({
				titulo: "",
				conteudo: "",
				resumo_ia: "resumotopzera"
			});
		}
	}, [onCreate]);

	async function handleReq(data: any) {
		try {
			if (req === "edit") {
				const { titulo, conteudo } = data;

				const result = await NoteService.update({
					noteId: selectedNote.id_nota,
					titulo,
					conteudo,
				});

				if (result.status === 200) {
					onToggleSnackBar();
					setContent('Nota alterada com sucesso!');

					setTimeout(() => {
						onDismissSnackBar();
					}, 1800);
				}
			}

			if (req === "delete") {
				const result = await deleteNoteMutation.mutateAsync(selectedNote.id_nota);

				if (result.status === 200) {
					onToggleSnackBar();
					setContent('Nota removida com sucesso!');

					setTimeout(() => {
						onDismissSnackBar();
					}, 1800);
				}
			}

			if (req === "create") {
				const { titulo, conteudo, resumo_ia } = data;

				const result = await NoteService.create({ id_categoria: 1, titulo, conteudo, resumo_ia });


				if (result.status === 201) {
					onToggleSnackBar();
					setContent('Nota criada com sucesso!');

					setTimeout(() => {
						onDismissSnackBar();
					}, 1800);
				}
			}

			setVisible(false);
			queryClient.invalidateQueries();
		} catch (err) {
			console.log(err)
			onToggleSnackBar();
			setContent('Ocorreu um erro ao executar esta ação');
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, padding: 20 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<AnimatedFAB
					icon="plus"
					label="Nova Nota"
					extended={extended}
					onLongPress={() => {
						setExtended(!extended);
					}}
					onPress={() => {
						setReq('create');
						setOnCreate(true);
						setVisible(true);
					}}
					color='#000'
					visible={true}
					animateFrom="right"
					style={{
						position: 'absolute',
						right: 0,
						bottom: 0,
						/* 	borderStyle: 'dashed',
							borderWidth: 1, */
						backgroundColor: '#969696ff'
					}}
				/>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text variant="displaySmall" style={{ color: '#000' }}>Minhas Notas</Text>
				</View>

				<View style={{ height: remUnit(2) }} />

				<View>
					{isLoading ? (
						<Text variant="displaySmall" style={{ color: '#000' }}>carregando...</Text>
					) : data?.length === 0 ? (
						<Text variant="displaySmall" style={{ color: '#000' }}>Nenhuma</Text>
					) : (
						data?.map((item: any) => (
							<>
								<TouchableRipple
									key={item.id_nota}
									onPress={() => {
										setSelectedNote(item);
										setOnShow(true);
										setVisible(true);
									}}
									onLongPress={() => setActiveCardId(activeCardId === item.id_nota ? null : item.id_nota)}
									rippleColor="rgba(0, 0, 0, .32)"
								>
									<AppCard
										content={
											<>
												<Card.Title titleVariant="titleLarge" title={item.titulo} style={{ padding: 0, margin: 0, minHeight: 0 }} />
												<Card.Content style={{ padding: 0, alignSelf: 'flex-start' }}>
													<Text variant="bodyMedium" style={{ textAlign: 'justify' }}>
														{item.conteudo}
													</Text>
												</Card.Content>

												{activeCardId === item.id_nota && (
													<Card.Actions style={{ padding: 0, position: 'absolute', right: 0, bottom: -70 }}>
														<IconButton
															icon="pencil"
															size={20}
															onPress={() => {
																setSelectedNote(item);
																setReq('edit');
																setOnEdit(true);
																setVisible(true);
															}}
														/>

														<IconButton
															icon="trash-can-outline"
															size={20}
															onPress={() => {
																setSelectedNote(item);
																setReq('delete');
																setOnDelete(true);
																setVisible(true);
															}}
														/>
													</Card.Actions>
												)}
											</>
										}
									/>
								</TouchableRipple>
								<View style={{ height: remUnit() }} />
							</>
						))
					)}
				</View>
				<AppModal
					visible={visible}
					onDismiss={() => setVisible(false)}
					content={
						<>
							<AppModalActions
								reqType={req}
								onReq={onShow || onDelete ? handleReq : handleSubmit(handleReq)}
								onClose={() => setVisible(false)}
							/>

							{onCreate && (
								<>
									<Text variant="titleLarge" style={{ color: '#000' }}>Criar a sua nota</Text>
									<View style={{ height: remUnit(1.5) }}></View>
									<View>
										<Text variant='labelLarge' style={{ color: '#000' }}>Título</Text>
										<View style={{ height: remUnit(.25) }}></View>
										<Controller
											control={control}
											rules={{ required: true }}
											render={({ field: { onChange, onBlur, value } }) => (
												<TextInput
													value={value}
													mode='outlined'
													placeholder='Insira o título de sua nota...'
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
												/>
											)}
											name='titulo'
										/>
									</View>
									<View style={{ height: remUnit() }}></View>

									<View>
										<Text variant='labelLarge' style={{ color: '#000' }}>Conteúdo</Text>
										<View style={{ height: remUnit(.25) }}></View>
										<Controller
											control={control}
											rules={{ required: true }}
											render={({ field: { onChange, onBlur, value } }) => (
												<TextInput
													value={value}
													mode='outlined'
													placeholder='Insira o conteúdo de sua nota...'
													multiline={true}
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
												/>
											)}
											name='conteudo'
										/>
									</View>

									<View style={{ height: remUnit(3) }}></View>

									<View>
										<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
											<Text variant='labelLarge' style={{ color: '#000' }}>Resumo gerado por I.A</Text>
											<Button icon="ray-start-arrow" mode="contained-tonal" onPress={() => console.log('')} style={{ borderRadius: remUnit(.75), backgroundColor: '#969696ff' }} textColor='#000'>Resumir nota</Button>
										</View>
										<View style={{ height: remUnit(.25) }}></View>
										<Controller
											control={control}
											rules={{ required: true }}
											render={({ field: { onChange, onBlur, value } }) => (
												<TextInput
													disabled={true}
													mode='outlined'
													value={value}
													placeholder='Seu resumo gerado aparece aqui...'
													multiline={true}
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
												/>
											)}
											name='resumo_ia'
										/>
									</View>
								</>
							)}

							{selectedNote && (
								<>
									{onShow && (
										<>
											<Text variant="bodySmall" style={{ color: '#b1b1b1ff' }}>Título da sua nota...</Text>
											<Text variant="titleLarge" style={{ color: '#000' }}>{selectedNote.titulo}</Text>

											<View style={{ height: remUnit(1.5) }} />

											<Text variant="bodySmall" style={{ color: '#b1b1b1ff' }}>Conteúdo da sua nota...</Text>
											<Text variant="titleLarge" style={{ color: '#000' }}>{selectedNote.conteudo}</Text>

											<View style={{ height: remUnit(1.5) }} />

											<Text variant="bodySmall" style={{ color: '#b1b1b1ff' }}>Resumo da sua nota...</Text>
											<Text variant="titleLarge" style={{ color: '#000' }}>{selectedNote.resumo_ia}</Text>
										</>
									)}

									{onEdit && (
										<>
											<Text variant="titleLarge" style={{ color: '#000' }}>Editar nota</Text>
											<View style={{ height: remUnit(1.5) }}></View>
											<View>
												<Text variant='labelLarge' style={{ color: '#000' }}>Título</Text>
												<View style={{ height: remUnit(.25) }}></View>
												<Controller
													control={control}
													rules={{ required: true }}
													render={({ field: { onChange, onBlur, value } }) => (
														<TextInput
															value={value}
															mode='outlined'
															placeholder='Insira o título de sua nota...'
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
														/>
													)}
													name='titulo'
												/>
											</View>
											<View style={{ height: remUnit() }}></View>

											<View>
												<Text variant='labelLarge' style={{ color: '#000' }}>Conteúdo</Text>
												<View style={{ height: remUnit(.25) }}></View>
												<Controller
													control={control}
													rules={{ required: true }}
													render={({ field: { onChange, onBlur, value } }) => (
														<TextInput
															value={value}
															mode='outlined'
															placeholder='Insira o conteúdo de sua nota...'
															multiline={true}
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
														/>
													)}
													name='conteudo'
												/>
											</View>

											<View style={{ height: remUnit(3) }}></View>

											<View>
												<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
													<Text variant='labelLarge' style={{ color: '#000' }}>Resumo gerado por I.A</Text>
													<Button icon="ray-start-arrow" mode="contained-tonal" onPress={() => console.log('')} style={{ borderRadius: remUnit(.75), backgroundColor: '#969696ff' }} textColor='#000'>Resumir nota</Button>
												</View>
												<View style={{ height: remUnit(.25) }}></View>
												<TextInput
													value={selectedNote.resumo_ia}
													disabled={true}
													mode='outlined'
													multiline={true}
													style={{ backgroundColor: '#c2c2c2' }}
													underlineColor="transparent"
													activeUnderlineColor="transparent"
													outlineColor="transparent"
													activeOutlineColor="transparent"
													selectionColor="transparent"
													cursorColor="black"
													textColor="#000"
													theme={{
														colors: {
															onSurfaceVariant: 'black',
															outline: '#000'
														}
													}}
													autoComplete='off'
												/>
											</View>
										</>
									)}

									{onDelete && (
										<>
											<Text variant="titleLarge" style={{ color: '#000', textAlign: 'center' }}>Remover a nota selecionada?</Text>
											<Text variant="bodySmall" style={{ color: '#6e6e6e', textAlign: 'center' }}> Esta ação não poderá ser desfeita </Text>

											<View style={{ height: remUnit(1.5) }} />

											<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
												<Text variant="titleLarge" style={{ color: '#000' }}>Nota #{selectedNote.id_nota}</Text>
												<View style={{ width: remUnit(1.5) }} />
												<Text variant="titleLarge" style={{ color: '#000' }}>{selectedNote.titulo}</Text>
											</View>
										</>
									)}
								</>
							)}
						</>
					}
				/>
			</ScrollView>

			<View>
				<AppSnackBar
					content={content}
					visible={SnackBarVisible}
					onDismissSnackBar={onDismissSnackBar}
					icon={'close'}
					elevation={4}
				/>
			</View>
		</SafeAreaView>
	);
}
