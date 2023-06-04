

const openingBrackets: Readonly<string[]> = ['[', '(', '{', '<'];
const closingBrackets: Readonly<string[]> = [']', ')', '}', '>'];

type OpenBracketStackItem = { index: number; bracket: string };

export type SuccessValidationResult = { valid: true; message: 'Valid' };
export type ErrorValidationResult = { valid: false; message: string; errorIndex: number }
export type ValidationResult = SuccessValidationResult | ErrorValidationResult;

function handleClosingBracket(
    previousOpeningBracket: string | undefined,
    index: number,
    char: string
): ValidationResult | null {
    if (!previousOpeningBracket) {
        const matchingOpeningIndex = closingBrackets.indexOf(char);
        const missingOpeningBracket = openingBrackets[matchingOpeningIndex];
        return {
            valid: false,
            message: `Invalid closing bracket \`${char}\`, missing opening bracket \`${missingOpeningBracket}\``,
            errorIndex: index
        };
    }
    if (openingBrackets.indexOf(previousOpeningBracket) !== closingBrackets.indexOf(char)) {
        const matchingOpeningBracketIndex = openingBrackets.indexOf(previousOpeningBracket);
        const missingClosingBracket = closingBrackets[matchingOpeningBracketIndex];
        return {
            valid: false,
            message: `Invalid closing bracket \`${char}\`, missing closing bracket \`${missingClosingBracket}\``,
            errorIndex: index
        };
    }
    return null;
}

function handleMismatchedBrackets(openBracketStack: Array<OpenBracketStackItem>): ValidationResult {
    const openingBracketIndex = openingBrackets.indexOf(openBracketStack[0].bracket);
    const missingClosingBracket = closingBrackets[openingBracketIndex];
    return {
        valid: false,
        message: `Invalid opening bracket \`${openBracketStack[0].bracket}\`, missing closing bracket \`${missingClosingBracket}\``,
        errorIndex: openBracketStack[0].index
    };
}

export function validateBrackets(input: string): ValidationResult {
    const openBracketStack: Array<OpenBracketStackItem> = [];

    let i = 0;
    for (; i < input.length; i++) {
        const char = input[i];
        if (openingBrackets.includes(char)) {
            openBracketStack.push({ bracket: char, index: i });
        } else if (closingBrackets.includes(char)) {
            const result = handleClosingBracket(openBracketStack.pop()?.bracket, i, char);
            if (result) {
                return result;
            }
        }
    }

    if (openBracketStack.length > 0) {
        return handleMismatchedBrackets(openBracketStack);
    }

    return { valid: true, message: 'Valid' };
}