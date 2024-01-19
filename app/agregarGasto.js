import { auth, db } from './firebase.js'
import { collection, addDoc, doc } from "firebase/firestore";
import { obtenerDatos } from './obtenerDatos.js';

const fechaActual = new Date();
const today = fechaActual.getDay() - 1;

console.log(today)

export const agregarGasto = btnAgregar.addEventListener('click', async function (e) {

    e.preventDefault()

    const gastoNumero = parseFloat(document.getElementById('gastoNumero').value)
    const user = auth.currentUser;
    
    if (user) {

        try {
            
            if (user && gastoNumero > 0) {
                const userId = user.uid
                const docRef = await addDoc(collection(db, 'gastos-usuarios'), {
                    Gasto: gastoNumero,
                    Dia: today,
                    Total: gastoNumero,
                    UserId: userId
                })

                Swal.fire({
                    customClass: {
                        confirmButton: 'swalBtnColor'
                    },
                    title: 'Gasto agregado!',
                    text: 'Ya puedes visualizar tus gastos',
                    icon: 'success',
                    confirmButtonText: 'Entendido'
                })
                document.getElementById('gastoNumero').value = '';
                await obtenerDatos()

            } else {
                Swal.fire({
                    customClass: {
                        confirmButton: 'swalBtnColor'
                    },
                    title: 'Error!',
                    text: 'Debes agregar un gasto',
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                })
            }
        }
        catch (error) {
            console.log(error)
        }

    } else {
        Swal.fire({
            customClass: {
                confirmButton: 'swalBtnColor'
            },
            title: 'Error!',
            text: 'Debes iniciar sesión',
            icon: 'error',
            confirmButtonText: 'Entendido'
        })
    } 
    }

)
