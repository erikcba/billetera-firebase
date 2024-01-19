import { obtenerDatos } from './app/obtenerDatos.js'


import './app/firebase.js';
import './app/signupForm.js';
import './app/logout.js'
import './app/signinForm.js'
import './app/googleLogin.js'
import './app/obtenerDatos.js'
import './app/agregarGasto.js'
//import './app/activeUser.js'


// Seleccion de elementos HTML

const ctx = document.getElementById('myChart')
const defaultColor = 'hsl(10, 79%, 65%)';
const currentDayColor = 'hsl(200, 79%, 65%)';
const btnAgregar = document.getElementById('btnAgregar');
const totalGasto = document.getElementById('totalGasto')



// Traer datos guardados en base de datos

window.addEventListener("DOMContentLoaded", () => {
  obtenerDatos()
  totalGasto.innerHTML = `$ ${total}`;
}
)
