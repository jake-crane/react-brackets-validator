import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { ReactNode } from 'react';

interface AppModalProps {
    open: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
}

function AppDialog({ open, title, children, onClose }: AppModalProps): JSX.Element {
    return (
        <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                <DialogContentText sx={{ wordBreak: 'break-word' }}>
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AppDialog;
