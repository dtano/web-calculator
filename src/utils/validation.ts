interface ValidationResult {
    isValid: boolean,
    errorMessage: string | null
}

export const validateEmail = (email: string | null): ValidationResult => {
    let result: ValidationResult = {
        isValid: true,
        errorMessage: null
    };

    if(!email){
        result.isValid = false;
        result.errorMessage = 'Email field should not be empty'
    }


    return result;
}

export const validateNonEmptyFields = () => {

}