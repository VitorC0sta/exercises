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
        console.log(`Form don't sended.`);
        const validatedForms = this.validatedForms();
    }

    validatedForms() {
        let valid = true;
        
        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        };

        for(let field of this.form.querySelectorAll('.input-model')) {
            if(!field.value) {
                this.throwError(field,`${field.placeholder} can not be empty.`);
                valid = false; 
            }

            if(field.classList.contains('cpf')) {

            }
        };
    }

    throwError(fieldName, message) {
        const divError = document.createElement('div');
        divError.classList.add('error-text');
        divError.innerHTML = message;
        fieldName.insertAdjacentElement('afterend', divError);
    }

}

const canSend = new ValidForm();