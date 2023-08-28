class ValidForm {
    contructor() {
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
    }
}

const canSend = new ValidForm();