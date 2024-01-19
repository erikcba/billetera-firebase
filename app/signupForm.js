import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {showMessage} from './showMessage'

const auth = getAuth();

const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signUpForm["signup-email"].value;
    const password = signUpForm["signup-password"].value;
    
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        
        const signUpModal = document.getElementById('signupModal')
        const modal = bootstrap.Modal.getInstance(signUpModal)
        modal.hide()

        Swal.fire({
            customClass: {
              confirmButton: 'swalBtnColor'
            },
            title: 'Cuenta creada',
            text: `Bienvenido ${userCredentials.user.email}` ,
            icon: 'success',
            confirmButtonText: 'Continuar'
          })
        
    } catch (error) {
        console.log()

        if (error.code === 'auth/email-already-in-use') {
            showMessage('Email en uso', 'error')
        } else if (error.code === 'auth/invalid-email'){
            showMessage('Mail invalido', 'error')
        } else if (error.code === 'auth/weak-password') {
            showMessage('La contraseña debe contener 6 caracteres', 'error')
        } else if (error.code) {
            showMessage('Algo fue mal', 'error')
        }
    }
})