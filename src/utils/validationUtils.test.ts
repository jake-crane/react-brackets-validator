import { describe, expect, it } from 'vitest';
import type { ValidationResult } from './validationUtils';
import { validateBrackets } from './validationUtils';

describe('validationUtils', () => {
    it('Should return Valid for matching brackets with none nested', () => {
        const result = validateBrackets('{}[][]');
        const expectedResult: ValidationResult = {
            valid: true,
            message: 'Valid'
        };
        expect(result).toStrictEqual(expectedResult);
    });

    it('Should return Valid for matching brackets with some nested', () => {
        const result = validateBrackets('<{[]}<>>');
        const expectedResult: ValidationResult = {
            valid: true,
            message: 'Valid'
        };
        expect(result).toStrictEqual(expectedResult);
    });

    it('Should return an error for an extra trailing closing bracket', () => {
        const result = validateBrackets('<[]>>');
        const expectedResult: ValidationResult = {
            valid: false,
            message: 'Invalid closing bracket `>`, missing opening bracket `<`',
            errorIndex: 4
        };
        expect(result).toStrictEqual(expectedResult);
    });

    it('Should return an error for an extra trailing opening bracket', () => {
        const result = validateBrackets('<[]><');
        const expectedResult: ValidationResult = {
            valid: false,
            message: 'Invalid opening bracket `<`, missing closing bracket `>`',
            errorIndex: 4
        };
        expect(result).toStrictEqual(expectedResult);
    });

    it('Should return an error for mismatched brackets', () => {
        const result = validateBrackets('<[>]');
        const expectedResult: ValidationResult = {
            valid: false,
            message: 'Invalid closing bracket `>`, missing closing bracket `]`',
            errorIndex: 2
        };
        expect(result).toStrictEqual(expectedResult);
    });

    it('Should return an error for an extra trailing leading bracket', () => {
        const result = validateBrackets('><[]>');
        const expectedResult: ValidationResult = {
            valid: false,
            message: 'Invalid closing bracket `>`, missing opening bracket `<`',
            errorIndex: 0
        };
        expect(result).toStrictEqual(expectedResult);
    });

    it('Should return an error for an extra leading opening bracket', () => {
        const result = validateBrackets('<<[]>');
        const expectedResult: ValidationResult = {
            valid: false,
            message: 'Invalid opening bracket `<`, missing closing bracket `>`',
            errorIndex: 0
        };
        expect(result).toStrictEqual(expectedResult);
    });

    it('Should return an error for multiple extra leading opening brackets', () => {
        const result = validateBrackets('<<<[]>');
        const expectedResult: ValidationResult = {
            valid: false,
            message: 'Invalid opening bracket `<`, missing closing bracket `>`',
            errorIndex: 0
        };
        expect(result).toStrictEqual(expectedResult);
    });

    it('Should return an error for multiple extra leading opening brackets with extra chars', () => {
        const result = validateBrackets('a<<<[b]>z');
        const expectedResult: ValidationResult = {
            valid: false,
            message: 'Invalid opening bracket `<`, missing closing bracket `>`',
            errorIndex: 1
        };
        expect(result).toStrictEqual(expectedResult);
    });


    it('Should ignore non-bracket characters and return Valid for matching brackets with some nested', () => {
        const result = validateBrackets('a<{[b]}c<d>>e');
        const expectedResult: ValidationResult = {
            valid: true,
            message: 'Valid'
        };
        expect(result).toStrictEqual(expectedResult);
    });

    it('Should ignore non-bracket characters and return an error for an extra trailing leading bracket', () => {
        const result = validateBrackets('a>b<[c]d>e');
        const expectedResult: ValidationResult = {
            valid: false,
            message: 'Invalid closing bracket `>`, missing opening bracket `<`',
            errorIndex: 1
        };
        expect(result).toStrictEqual(expectedResult);
    });

    it('Should return the correct error and index for unclosed trailing open brackets', () => {
        const result = validateBrackets('{}[][]<<<');
        const expectedResult: ValidationResult = {
            valid: false,
            message: 'Invalid opening bracket `<`, missing closing bracket `>`',
            errorIndex: 6
        };
        expect(result).toStrictEqual(expectedResult);
    });

    it('Should return the correct error and index for unclosed trailing close brackets', () => {
        const result = validateBrackets('{}[][]>>>');
        const expectedResult: ValidationResult = {
            valid: false,
            message: 'Invalid closing bracket `>`, missing opening bracket `<`',
            errorIndex: 6
        };
        expect(result).toStrictEqual(expectedResult);
    });

});