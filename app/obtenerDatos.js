import { auth, db } from './firebase.js'
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { loginCheck } from './loginCheck.js'

const totalGasto = document.getElementById('totalGasto')
const fechaActual = new Date();
const diasSemana = [0, 1, 2, 3, 4, 5, 6];
const today = diasSemana[fechaActual.getDay() - 1];

const ctx = document.getElementById('myChart')
const defaultColor = 'hsl(10, 79%, 65%)';
const currentDayColor = 'hsl(200, 79%, 65%)';

export const dbGastos = await getDocs(collection(db, 'gastos-usuarios'))

let myChart;


export const obtenerDatos = async () => {
    const user = auth.currentUser;

    if (user) {
        loginCheck(user);

        try {
            const querySnapshot = await getDocs(collection(db, 'gastos-usuarios'));
            const datosJSON = JSON.stringify(querySnapshot.docs.map((doc) => doc.data()));
            const gasto = JSON.parse(datosJSON)[0];


            let i = 0


            const groupedExpenses = {};

            for (const gasto of JSON.parse(datosJSON)) {
                const dia = gasto["Dia"];
                const importe = gasto["Gasto"];
                const userId = gasto["UserId"];

                if (userId === user.uid) {
                    if (!groupedExpenses[dia]) {
                        groupedExpenses[dia] = 0;
                    }

                    groupedExpenses[dia] += importe;
                }
            }

            // Estructura de grafico

            if (myChart) {
                myChart.destroy();
            }

            const chartDatos = diasSemana.map(dayIndex => groupedExpenses[dayIndex] || 0);

            const chartLabels = diasSemana.map(dayIndex => {
                const day = (dayIndex) % 7;
                return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][day];
            });

            console.log(chartLabels)



            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartLabels,
                    datasets: [{
                        label: 'Gasto',
                        data: chartDatos,
                        backgroundColor: chartDatos.map((row, index) => index === today ? currentDayColor : defaultColor),
                        borderRadius: 6,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            display: false
                        }
                    },
                    legend: {
                        display: false
                    }

                }
            });



            let total = 0;

            querySnapshot.forEach((doc) => {

                const docData = doc.data()

                if (docData.UserId == user.uid) {
                    total += docData.Gasto || 0;
                    totalGasto.innerHTML = `$ ${total}`
                }
            });
        } catch (error) {
            console.error("Error in obtenerDatos:", error);
        }
    }
}

// Set up the onAuthStateChanged listener
onAuthStateChanged(auth, (user) => {
    obtenerDatos();
});