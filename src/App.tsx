import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useCallback, useState } from 'react';
import AppDialog from './components/AppDialog';
import BracketForm from './components/BracketForm';
import ValidationHistoryTable from './components/ValidationHistoryTable';
import type { ValidationEntry } from './types/ValidationEntry';

function App() {
  const [textToView, setTextToView] = useState<string | null>(null);
  const [validationHistory, setValidationHistory] = useState<ValidationEntry[]>([]);

  const onValidate = (entry: ValidationEntry) => {
    setValidationHistory(prev => [entry, ...prev]);
  };

  // Wrap in useCallback since this is a dependency of the table columns in ValidationHistoryTable
  const onViewText = useCallback((text: string) => setTextToView(text), []);

  return (
    <Container>
      <Stack spacing={4}>
        <Box display="flex" justifyContent="center">
          <h1>Ultimate Bracket Validator</h1>
        </Box>
        <BracketForm onValidate={onValidate} />
        {validationHistory.length > 0
          ? (
            <ValidationHistoryTable
              validationHistory={validationHistory}
              onViewText={onViewText}
            />
          )
          : <Typography align="center">No history to display.</Typography>
        }
        <AppDialog title="Text" open={textToView !== null} onClose={() => setTextToView(null)}>
          {textToView}
        </AppDialog>
      </Stack>
    </Container>
  );
}

export default App;
