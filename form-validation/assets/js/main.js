class ValidForm {
    constructor() {
        this.form = document.querySelector('.formulary');
        this.events();

    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        const validatedForms = this.validatedForms();
    }

    validatedForms() {
        let valid = true;
        const regexUsername = /^[a-zA-Z0-9]+$/;
        
        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        };

        for(let field of this.form.querySelectorAll('.input-model')) {
            if(!field.value) {
                this.throwError(field,`${field.placeholder} can not be empty.`);
                valid = false; 
            }
            
            if(field.getAttribute('id') === 'input-username') {
                if(field.value.length < 6 || field.value.length > 12) {
                    this.throwError(field,`${field.placeholder} must be between 6 and 12 characters.`);
                }

                if(!regexUsername.test(field.value)) {
                    this.throwError(field,`${field.placeholder} must be characters and/or numbers.`);
                } 
            }

            if(field.getAttribute('id') === 'input-password') {
                if(field.value.length < 6 || field.value.length > 12) {
                    this.throwError(field,`${field.placeholder} must be between 6 and 12 characters.`);
                }
            }

            if(field.getAttribute('id') === 'input-repassword') {
                if(field.value.length < 6 || field.value.length > 12) {
                    this.throwError(field,`${field.placeholder} must be between 6 and 12 characters.`);
                }

               
            }

            if(field.getAttribute('id') === 'input-cpf') {
                if(!this.isValidCpf(field.value)) valid = false;
                const cleanCpf = field.value.replace(/\D+/g, '');
                if(this.isValidCpf(cleanCpf)) {
                    valid = true;  
                } else {
                    this.throwError(field,`${field.value} is not a valid CPF.`);
                }
            }
        };
    }

    isValidCpf(cleanCpf) {
        if(typeof cleanCpf !== 'string') return false;
        if(typeof cleanCpf === 'null') return false;
        if(cleanCpf.length !== 11) return false;
        const noDigitCpf = cleanCpf.slice(0, -2);
        const firstDigit = this.findDigit(noDigitCpf)
        const secondDigit = this.findDigit(noDigitCpf + firstDigit);
        const fullCpf = noDigitCpf + firstDigit + secondDigit;
        return fullCpf === cleanCpf;
    }

    findDigit(noDigitCpf) {
        const arrayNoDigitCpf = Array.from(noDigitCpf);
        let regressiveAuxCounter = arrayNoDigitCpf.length+1;
        const findCpfSum = arrayNoDigitCpf.reduce((accumulator, element) => {
            accumulator += Number(element) * regressiveAuxCounter;
            regressiveAuxCounter--;           
            return accumulator;
        }, 0);

        const foundDigit = 11 - (findCpfSum%11);
        return foundDigit > 9? '0' : String(foundDigit);
    }

    throwError(fieldName, message) {
        const divError = document.createElement('div');
        divError.classList.add('error-text');
        divError.innerHTML = message;
        fieldName.insertAdjacentElement('afterend', divError);
    }

}

const canSend = new ValidForm();
