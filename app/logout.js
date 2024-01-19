import { signOut } from 'firebase/auth';
import { auth } from './firebase.js'

const logout = document.getElementById('logout')

logout.addEventListener('click', async () => {
    await signOut(auth)
    Swal.fire({
        title: 'Sesión cerrada',
        text: `Te has deslogueado con éxito`,
        icon: 'success',
        showConfirmButton: false
    })
    
    setTimeout(() => {
        location.reload()
    }, 2000)

})