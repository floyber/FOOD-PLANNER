document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const calendarBody = document.getElementById('calendar-body');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const viewShoppingListButton = document.getElementById('view-shopping-list');
    const mealModal = document.getElementById('meal-modal');
    const closeModalButton = document.querySelector('.close');
    const addMealForm = document.getElementById('add-meal-form');
    const mealDateInput = document.getElementById('meal-date');
    const mealTypeInput = document.getElementById('meal-type'); // Nuevo
    const mealNameInput = document.getElementById('meal-name');   // Nuevo
    const mealIngredientsInput = document.getElementById('meal-ingredients'); // Nuevo
    const mealNotesInput = document.getElementById('meal-notes'); // Nuevo

    // Estado del calendario
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Datos de comidas (ahora se cargarán desde el backend)
    let meals = {}; // Ahora será un objeto que contendrá arrays de comidas por fecha

    // --- API Endpoints ---
    const CALENDARIO_API_URL = "http://localhost:3000/api/calendario"; // Usamos la URL base para el calendario

    // Inicializar calendario - Cargar desde el backend
    async function initCalendar() {
        await fetchMealsFromBackend(); // Primero carga los datos
        generateCalendar(currentMonth, currentYear); // Luego genera el calendario
        updateMonthDisplay();
    }

    // --- Funciones de comunicación con el Backend ---
    async function fetchMealsFromBackend() {
        try {
            const response = await fetch(CALENDARIO_API_URL);
            if (!response.ok) {
                throw new Error(`Error al obtener comidas: ${response.statusText}`);
            }
            const data = await response.json();
            // Transforma los datos del backend a la estructura que tu frontend espera:
            // { 'YYYY-MM-DD': [{ id, mealType, mealName, ingredients, notes }, ...] }
            meals = {}; // Reinicia el objeto de comidas
            data.forEach(meal => {
                const dateStr = meal.fecha.substring(0, 10); // Formato YYYY-MM-DD
                if (!meals[dateStr]) {
                    meals[dateStr] = [];
                }
                meals[dateStr].push({
                    id: meal.id, // Es importante mantener el ID para eliminar
                    mealType: meal.tipo_comida,
                    mealName: meal.nombre_comida,
                    ingredients: JSON.parse(meal.ingredientes || '[]'), // Parsea el JSON string
                    notes: meal.notas
                });
            });
            console.log('Comidas cargadas desde el backend:', meals);
        } catch (error) {
            console.error('Error al cargar comidas del backend:', error);
            alert('No se pudieron cargar las comidas del calendario. Inténtalo de nuevo más tarde.');
        }
    }

    async function saveMealToBackend(mealData) {
        try {
            const response = await fetch(CALENDARIO_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mealData),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Error al guardar comida.');
            }
            const data = await response.json();
            alert(`¡Comida "${data.nombre_comida}" guardada exitosamente!`);
            return data; // Retorna los datos de la comida guardada (incluye ID)
        } catch (error) {
            console.error('Error al guardar comida en el backend:', error);
            alert(`Error al guardar comida: ${error.message}`);
            return null;
        }
    }

    async function deleteMealFromBackend(mealId) {
        try {
            const response = await fetch(`${CALENDARIO_API_URL}/${mealId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Error al eliminar comida.');
            }
            const data = await response.json();
            alert(data.message);
            return true;
        } catch (error) {
            console.error('Error al eliminar comida del backend:', error);
            alert(`Error al eliminar comida: ${error.message}`);
            return false;
        }
    }

    // Event Listeners
    prevMonthButton.addEventListener('click', goToPreviousMonth);
    nextMonthButton.addEventListener('click', goToNextMonth);
    viewShoppingListButton.addEventListener('click', viewShoppingList);
    closeModalButton.addEventListener('click', closeModal);
    addMealForm.addEventListener('submit', saveMeal);

    // Funciones para manejar el calendario (mismas que tenías)
    function generateCalendar(month, year) {
        calendarBody.innerHTML = '';

        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let daysInPrevMonth = new Date(year, month, 0).getDate();

        let date = 1;
        let nextMonthDate = 1;

        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('td');
                let dayNumber = document.createElement('div');
                dayNumber.className = 'day-number';

                let dateStr; // Variable para la fecha en formato YYYY-MM-DD

                // Celdas del mes anterior
                if (i === 0 && j < firstDay) {
                    let prevMonthDay = daysInPrevMonth - firstDay + j + 1;
                    dayNumber.textContent = prevMonthDay;
                    cell.appendChild(dayNumber);
                    cell.className = 'other-month';

                    let prevMonth = month - 1 < 0 ? 11 : month - 1;
                    let prevYear = month - 1 < 0 ? year - 1 : year;
                    dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(prevMonthDay).padStart(2, '0')}`;

                    addMealButtonAndItems(cell, dateStr);
                }
                // Celdas del mes actual
                else if (date <= daysInMonth) {
                    dayNumber.textContent = date;
                    cell.appendChild(dayNumber);

                    let today = new Date();
                    if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        cell.className = 'today';
                    }

                    dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;

                    addMealButtonAndItems(cell, dateStr);

                    date++;
                }
                // Celdas del mes siguiente
                else {
                    dayNumber.textContent = nextMonthDate;
                    cell.appendChild(dayNumber);
                    cell.className = 'other-month';

                    let nextMonth = month + 1 > 11 ? 0 : month + 1;
                    let nextYear = month + 1 > 11 ? year + 1 : year;
                    dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(nextMonthDate).padStart(2, '0')}`;

                    addMealButtonAndItems(cell, dateStr);

                    nextMonthDate++;
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);

            if (date > daysInMonth && i > 3) {
                break;
            }
        }
    }

    function addMealButtonAndItems(cell, dateStr) {
        let addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.className = 'add-meal';
        addButton.onclick = function() {
            openMealModal(dateStr);
        };
        cell.appendChild(addButton);

        if (meals[dateStr]) {
            meals[dateStr].forEach(meal => {
                let mealItem = document.createElement('div');
                mealItem.className = 'meal-item';
                mealItem.textContent = `${getMealTypeLabel(meal.mealType)}: ${meal.mealName}`;

                // Agrega un listener para eliminar la comida al hacer clic
                mealItem.addEventListener('click', async function() {
                    if (confirm(`¿Deseas eliminar "${meal.mealName}"?`)) {
                        const success = await deleteMealFromBackend(meal.id); // Pasa el ID al backend
                        if (success) {
                            // Actualiza la vista después de eliminar
                            await fetchMealsFromBackend(); // Vuelve a cargar los datos del backend
                            generateCalendar(currentMonth, currentYear);
                        }
                    }
                });

                cell.appendChild(mealItem);
            });
        }
    }

    function getMealTypeLabel(mealType) {
        const labels = {
            'desayuno': '🍳 Desayuno',
            'almuerzo': '🍲 Almuerzo',
            'cena': '🍽️ Cena',
            'merienda': '🍰 Merienda'
        };
        return labels[mealType] || mealType;
    }

    function updateMonthDisplay() {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        currentMonthElement.textContent = `${months[currentMonth]} ${currentYear}`;
    }

    async function goToPreviousMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        await initCalendar(); // Vuelve a cargar y generar
    }

    async function goToNextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        await initCalendar(); // Vuelve a cargar y generar
    }

    function openMealModal(dateStr) {
        mealDateInput.value = dateStr;

        const [year, month, day] = dateStr.split('-');
        const dateObj = new Date(year, month - 1, day);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('es-ES', options);

        document.querySelector('.modal-content h2').textContent = `Añadir comida para ${formattedDate}`;

        mealModal.style.display = 'block';
    }

    function closeModal() {
        mealModal.style.display = 'none';
        addMealForm.reset();
    }

    async function saveMeal(event) {
        event.preventDefault();

        const dateStr = mealDateInput.value;
        const mealType = mealTypeInput.value;
        const mealName = mealNameInput.value;
        const ingredients = mealIngredientsInput.value; // Esto es un string, lo convertimos a array
        const notes = mealNotesInput.value;

        // Prepara el objeto de comida para enviar al backend
        const mealData = {
            fecha: dateStr,
            tipo_comida: mealType,
            nombre_comida: mealName,
            ingredientes: ingredients.split(',').map(item => item.trim()).filter(item => item), // Convierte a array y limpia
            notes: notes
        };

        const savedMeal = await saveMealToBackend(mealData); // Guarda en el backend
        if (savedMeal) {
            // Si se guardó exitosamente, actualiza el frontend
            await fetchMealsFromBackend(); // Vuelve a cargar los datos
            generateCalendar(currentMonth, currentYear); // Regenera el calendario
            closeModal();
            // La alerta ya se muestra en saveMealToBackend
        }
    }

    // La función removeMeal ya no se usa directamente en el frontend,
    // ahora llamamos a deleteMealFromBackend que luego recarga el calendario.
    // function removeMeal(dateStr, mealToRemove) { ... }

    function viewShoppingList() {
        // Redireccionar a la página de lista de compras
        window.location.href = 'LISTACOMPRASindex.html';
    }

    // Función para generar lista de compras basada en el plan de comidas
    // ¡IMPORTANTE! Esta función debe ir después de que meals[] se haya cargado del backend
    async function generateShoppingList() {
        // Asegúrate de que las comidas estén cargadas antes de generar la lista
        await fetchMealsFromBackend(); // Asegura que 'meals' tenga los datos más recientes

        const ingredients = {};

        Object.values(meals).forEach(dailyMeals => {
            dailyMeals.forEach(meal => {
                // Asegúrate de que meal.ingredients sea un array
                if (Array.isArray(meal.ingredients) && meal.ingredients.length) {
                    meal.ingredients.forEach(ingredient => {
                        const cleanedIngredient = ingredient.toLowerCase(); // Normaliza
                        if (ingredients[cleanedIngredient]) {
                            ingredients[cleanedIngredient]++;
                        } else {
                            ingredients[cleanedIngredient] = 1;
                        }
                    });
                }
            });
        });

        localStorage.setItem('shoppingList', JSON.stringify(ingredients));
        console.log('Lista de compras generada y guardada en localStorage:', ingredients);
    }

    // Inicializar el calendario cuando el DOM esté completamente cargado
    initCalendar();
    // Generar lista de compras inicial (después de que initCalendar haya cargado las comidas)
    generateShoppingList();
});