import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'
import { showMessage } from './showMessage.js'

const signInForm = document.getElementById('login-form')

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signInForm["login-email"].value;
    const password = signInForm["login-password"].value;

    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password)

        const modal = bootstrap.Modal.getInstance(signInForm.closest('.modal'));
        modal.hide();

        signInForm.reset();

        // show welcome message
        showMessage(`Bienvenido ${credentials.user.email}`, 'succes' );
       

    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            showMessage("Wrong password", "error")
        } else if (error.code === 'auth/user-not-found') {
            showMessage("User not found", "error")
        } else {
            showMessage("Something went wrong", "error")
        }
    }

})