import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './firebase.js'
import { showMessage } from './showMessage.js'

const googleButton = document.getElementById('googleLogin')
const signInForm = document.getElementById('login-form')

googleButton.addEventListener('click', async () => {

    const provider = new GoogleAuthProvider()

    try {
        const credentials = await signInWithPopup(auth, provider)
        console.log(credentials)

        const modal = bootstrap.Modal.getInstance(signInForm.closest('.modal'));
        modal.hide();

        showMessage(`Bienvenido ${credentials.user.displayName}`, 'succes');

    } catch (error) {
        console.error(error)
    }
})