import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import type { ValidationEntry } from '../types/ValidationEntry';
import type { ErrorValidationResult } from '../utils/validationUtils';
import { validateBrackets } from '../utils/validationUtils';

interface BracketFormPRops {
    onValidate: (entry: ValidationEntry) => void;
}

function BracketForm({ onValidate }: BracketFormPRops): JSX.Element {
    const [bracketInput, setBracketInput] = useState('');
    const ref = useRef<HTMLTextAreaElement | null>(null);

    /*
        The selection range was used to highlight the error to save time.
        Given more time I would try making the textarea background transparent 
        and utilize a div behind the textarea to have more control over the highlighting.
    */
    const highlightError = (result: ErrorValidationResult) => {
        // textarea must be focused before it can be highlighted
        ref.current?.focus();
        // If the error is at the end, highlight the last char
        const selectionStart = result.errorIndex === bracketInput.length
            ? result.errorIndex - 1
            : result.errorIndex;
        ref.current?.setSelectionRange(selectionStart, selectionStart + 1);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = validateBrackets(bracketInput);
        if (!result.valid) {
            highlightError(result);
        }
        onValidate({
            submitted: Date.now(),
            text: bracketInput,
            status: result.message
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <Container maxWidth="sm">
                <Stack spacing={2} textAlign="center">
                    <FormLabel htmlFor="bracket-textarea">Enter your text for bracket validation</FormLabel>
                    <TextareaAutosize
                        id="bracket-textarea"
                        ref={ref}
                        minRows={10}
                        maxRows={10}
                        value={bracketInput}
                        onChange={e => setBracketInput(e.target.value)}
                    />
                    <div>
                        <Button type="submit" variant="contained">Submit</Button>
                    </div>
                </Stack>
            </Container>
        </form>
    );
}

export default BracketForm;