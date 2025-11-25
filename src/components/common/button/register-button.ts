export class RegisterButton extends HTMLButtonElement {
    private defaultHTML = "";
    private isLoading = false;

    constructor() {
        super();

        // default rendering
        this.defaultHTML = `
            <i>login</i>
            <span>Register</span>
        `;
        this.innerHTML = this.defaultHTML;

        this.type = "button"; // avoid form submission
    }

    /** Call when processing starts */
    start() {
        if (this.isLoading) return;

        this.isLoading = true;
        this.disabled = true;

        this.innerHTML = `
            <i>
                <div class="shape loading-indicator max"></div>
            </i>
            <span>Registering...</span>
        `;
    }

    /** Call when registration succeeds */
    success() {
        this.isLoading = false;
        this.disabled = false;
        this.innerHTML = `
            <i>check</i>
            <span>Success!</span>
        `;

        // reset to default after a moment
        setTimeout(() => this.reset(), 1200);
    }

    /** Call when registration fails */
    failure() {
        this.isLoading = false;
        this.disabled = false;

        this.innerHTML = `
            <i>error</i>
            <span>Failed</span>
        `;
        this.classList.add("error");

        // reset to default after a moment
        setTimeout(() => this.reset(), 1500);
    }

    /** Manually reset the button */
    reset() {
        this.isLoading = false;
        this.disabled = false;
        this.innerHTML = this.defaultHTML;
        this.classList.remove("error");
    }
}

// register as an extended <button>
customElements.define("register-button", RegisterButton, { extends: "button" });
