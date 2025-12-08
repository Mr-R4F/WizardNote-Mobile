import { SnackBarActionsProps } from "@/types/type";
import { Snackbar } from 'react-native-paper';

export default function AppSnackBar({ content, visible, elevation, label, icon, onDismissSnackBar, onPress }: SnackBarActionsProps) {
    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            icon={icon}
            elevation={elevation}
            style={{ backgroundColor: 'grey' }}
        >
            {content}
        </Snackbar>
    );
}