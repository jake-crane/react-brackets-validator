import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Stack from '@mui/material/Stack';

interface StatusCellProps {
    status: string;
}

function StatusCell({ status }: StatusCellProps): JSX.Element {
    const isValid = status === 'Valid';
    return (
        <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{ color: isValid ? 'success.main' : 'error.main' }}
        >
            {isValid
                ? <CheckBoxIcon color="success" />
                : <IndeterminateCheckBoxIcon color="error" />}
            <span>{status}</span>
        </Stack>
    );
}

export default StatusCell;