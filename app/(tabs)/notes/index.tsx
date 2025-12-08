import AppCard from '@/components/Card';
import AppModal from '@/components/Modal';
import AppModalActions from '@/components/Modal/Actions';
import remUnit from '@/constants/Units';
import NoteService from '@/services/Note';
import { CreateNoteService, UpdateNoteService } from '@/types/type';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { AnimatedFAB, Card, IconButton, Text, TextInput, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotesPage() {
	const [showCardActions, setShowCardActions] = useState(true);
	const [activeCardId, setActiveCardId] = useState<number | null>(null);

	const [visible, setVisible] = useState(false);

	const [onShow, setOnShow] = useState(false);
	const [onCreate, setOnCreate] = useState(false);
	const [onEdit, setOnEdit] = useState(false);
	const [onDelete, setOnDelete] = useState(false);

	const [selectedNote, setSelectedNote] = useState<any>(null);
	const [req, setReq] = useState('');

	const queryClient = useQueryClient();

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

	const handleCreate = async (data: CreateNoteService) => {
		const { titulo, conteudo } = data;
		console.log(data)
		await NoteService.create({ id_categoria: 1, titulo, conteudo });
		console.log('certow!')
	}

	async function handleReq(data: any) {
		try {
			if (req === "edit") {
				const { titulo, conteudo } = data;

				await NoteService.update({
					noteId: selectedNote.id_nota,
					titulo,
					conteudo,
				});
				console.log('editado!!')
			}

			if (req === "delete") {
				await deleteNoteMutation.mutateAsync(selectedNote.id_nota);
				console.log('deletado!')

			}

			if (req === "create") {
				const { titulo, conteudo } = data;
				console.log(data)
				await NoteService.create({ id_categoria: 1, titulo, conteudo });
				console.log('certow!')

			}

			setVisible(false);
			queryClient.invalidateQueries();
		} catch (error) {
			console.log("Erro ao executar ação:", error);
		}
	}

	const { control, handleSubmit, formState: { errors } } = useForm<CreateNoteService | UpdateNoteService>();
	const [extended, setExtended] = useState(false);

	return (
		<SafeAreaView style={{ flex: 1, padding: 20 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<AnimatedFAB
					icon="plus"
					label="Nova Nota"
					extended={extended}
					onLongPress={() => {
						setExtended(!extended);
						console.log("Criar nota");
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
			</ScrollView>

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
								<Controller
									control={control}
									rules={{ required: true }}
									render={({ field: { onChange, onBlur, value } }) => (
										<TextInput
											label="Titulo"
											value={value}
											mode='outlined'
											onChangeText={onChange}
											onBlur={onBlur}
											autoComplete='off'
										/>
									)}
									name='titulo'
								/>
								<Controller
									control={control}
									rules={{ required: true }}
									render={({ field: { onChange, onBlur, value } }) => (
										<TextInput
											label="Conteudo"
											value={value}
											mode='outlined'
											onChangeText={onChange}
											onBlur={onBlur}
											autoComplete='off'
										/>
									)}
									name='conteudo'
								/>
								<View>
									<TextInput
										label="Resumo"
										value='1'
										disabled={true}
										mode='outlined'
										autoComplete='off'
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
										<Controller
											control={control}
											rules={{ required: true }}
											render={({ field: { onChange, onBlur, value } }) => (
												<TextInput
													label="Titulo"
													value={value}
													mode='outlined'
													onChangeText={onChange}
													onBlur={onBlur}
													autoComplete='off'
												/>
											)}
											name='titulo'
										/>
										<Controller
											control={control}
											rules={{ required: true }}
											render={({ field: { onChange, onBlur, value } }) => (
												<TextInput
													label="Conteudo"
													value={value}
													mode='outlined'
													onChangeText={onChange}
													onBlur={onBlur}
													autoComplete='off'
												/>
											)}
											name='conteudo'
										/>
									</>
								)}

								{onDelete && (
									<>
										<Text variant="titleLarge" style={{ color: '#000', textAlign: 'center' }}>Remover a nota selecionada?</Text>
										<Text variant="bodySmall" style={{ color: '#b1b1b1ff', textAlign: 'center' }}> Esta ação não poderá ser desfeita </Text>

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
		</SafeAreaView>
	);
}
