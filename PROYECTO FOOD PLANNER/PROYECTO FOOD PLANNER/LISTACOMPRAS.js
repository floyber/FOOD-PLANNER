document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const newItemInput = document.getElementById('new-item');
    const categorySelect = document.getElementById('category');
    const addButton = document.getElementById('add-btn');
    const shoppingList = document.getElementById('shopping-list');
    const clearAllButton = document.getElementById('clear-all');
    const allFilterBtn = document.getElementById('all-filter');
    const pendingFilterBtn = document.getElementById('pending-filter');
    const completedFilterBtn = document.getElementById('completed-filter');

    // Estado de la aplicación
    let items = []; // Los ítems ahora se cargarán desde el backend
    let currentFilter = 'all';

    // --- API Endpoint ---
    const LISTACOMPRAS_API_URL = "http://localhost:3000/api/listacompras";

    // --- Funciones de comunicación con el Backend ---
    async function fetchItemsFromBackend() {
        try {
            const response = await fetch(LISTACOMPRAS_API_URL);
            if (!response.ok) {
                throw new Error(`Error al obtener ítems: ${response.statusText}`);
            }
            const data = await response.json();
            // Mapea los nombres de columna de la DB a los que usa tu frontend
            items = data.map(item => ({
                id: item.id,
                text: item.texto,
                category: item.categoria,
                completed: item.completado,
                date: item.fecha_creacion // O fecha_actualizacion si prefieres
            }));
            renderItems(); // Renderiza los ítems una vez cargados
            console.log('Ítems cargados desde el backend:', items);
        } catch (error) {
            console.error('Error al cargar ítems del backend:', error);
            alert('No se pudieron cargar los ítems de la lista de compras. Inténtalo de nuevo más tarde.');
        }
    }

    async function addItemToBackend(itemData) {
        try {
            const response = await fetch(LISTACOMPRAS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemData),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Error al añadir ítem.');
            }
            const newItem = await response.json();
            // Añadir el nuevo ítem a nuestro array local de ítems
            items.push({
                id: newItem.id,
                text: newItem.texto,
                category: newItem.categoria,
                completed: newItem.completado,
                date: new Date().toISOString() // La fecha de creación será la actual
            });
            renderItems();
            newItemInput.value = ''; // Limpiar input
        } catch (error) {
            console.error('Error al añadir ítem al backend:', error);
            alert(`Error al añadir ítem: ${error.message}`);
        }
    }

    async function toggleItemInBackend(id, completedStatus) {
        try {
            const response = await fetch(`${LISTACOMPRAS_API_URL}/${id}`, {
                method: 'PATCH', // Usamos PATCH para actualizar parcialmente (solo el estado 'completado')
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completado: completedStatus }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Error al actualizar ítem.');
            }
            // Si la actualización en el backend fue exitosa, actualiza el estado local
            items = items.map(item => {
                if (item.id === id) {
                    return { ...item, completed: completedStatus };
                }
                return item;
            });
            renderItems();
        } catch (error) {
            console.error('Error al actualizar ítem en el backend:', error);
            alert(`Error al actualizar ítem: ${error.message}`);
        }
    }

    async function deleteItemFromBackend(id) {
        try {
            const response = await fetch(`${LISTACOMPRAS_API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Error al eliminar ítem.');
            }
            // Si la eliminación en el backend fue exitosa, actualiza el estado local
            items = items.filter(item => item.id !== id);
            renderItems();
        } catch (error) {
            console.error('Error al eliminar ítem del backend:', error);
            alert(`Error al eliminar ítem: ${error.message}`);
        }
    }

    async function clearAllItemsInBackend() {
        if (confirm('¿Estás seguro de que quieres eliminar TODOS los elementos de la lista? Esta acción es irreversible.')) {
            try {
                const response = await fetch(LISTACOMPRAS_API_URL, {
                    method: 'DELETE', // DELETE a la URL base elimina todo
                });
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Error al limpiar la lista.');
                }
                items = []; // Limpiar el array local si el backend fue exitoso
                renderItems();
                alert('Todos los ítems de la lista han sido eliminados.');
            } catch (error) {
                console.error('Error al limpiar la lista en el backend:', error);
                alert(`Error al limpiar la lista: ${error.message}`);
            }
        }
    }

    // Funciones del frontend (modificadas para usar el backend)
    function addItem() {
        const text = newItemInput.value.trim();
        if (text === '') return;

        const itemData = {
            texto: text,
            categoria: categorySelect.value,
        };
        addItemToBackend(itemData); // Llama a la función que interactúa con el backend
    }

    function renderItems() {
        shoppingList.innerHTML = '';

        let filteredItems = items;

        if (currentFilter === 'pending') {
            filteredItems = items.filter(item => !item.completed);
        } else if (currentFilter === 'completed') {
            filteredItems = items.filter(item => item.completed);
        }

        // Ordenar por categoría
        filteredItems.sort((a, b) => {
            if (a.category < b.category) return -1;
            if (a.category > b.category) return 1;
            return 0;
        });

        filteredItems.forEach(item => {
            const li = document.createElement('li');
            li.className = `item ${item.completed ? 'checked' : ''}`;

            li.innerHTML = `
                <span class="category">${categoryToDisplay(item.category)}</span>
                <span>${item.text}</span>
                <div class="actions">
                    <button class="check-btn" data-id="${item.id}">
                        <i class="fas ${item.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                    </button>
                    <button class="delete-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            shoppingList.appendChild(li);
        });
    }

    function categoryToDisplay(categoryValue) {
        const categories = {
            frutas: 'Frutas',
            verduras: 'Verduras',
            carnes: 'Carnes',
            lacteos: 'Lácteos',
            cereales: 'Cereales',
            congelados: 'Congelados',
            limpieza: 'Limpieza',
            otros: 'Otros'
        };
        return categories[categoryValue] || categoryValue;
    }

    function toggleItem(id) {
        const itemToToggle = items.find(item => item.id === id);
        if (itemToToggle) {
            toggleItemInBackend(id, !itemToToggle.completed); // Invierte el estado y envía al backend
        }
    }

    function deleteItem(id) {
        deleteItemFromBackend(id); // Llama a la función que interactúa con el backend
    }

    function clearAllItems() {
        clearAllItemsInBackend(); // Llama a la función que interactúa con el backend
    }

    function setFilter(filter) {
        currentFilter = filter;

        // Actualizar botones de filtro
        allFilterBtn.classList.remove('active');
        pendingFilterBtn.classList.remove('active');
        completedFilterBtn.classList.remove('active');

        if (filter === 'all') {
            allFilterBtn.classList.add('active');
        } else if (filter === 'pending') {
            pendingFilterBtn.classList.add('active');
        } else if (filter === 'completed') {
            completedFilterBtn.classList.add('active');
        }

        renderItems();
    }

    // Event Listeners
    addButton.addEventListener('click', addItem);

    newItemInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    shoppingList.addEventListener('click', function(e) {
        const target = e.target.closest('button');
        if (!target) return;

        const id = Number(target.dataset.id);

        if (target.classList.contains('check-btn')) {
            toggleItem(id);
        } else if (target.classList.contains('delete-btn')) {
            deleteItem(id);
        }
    });

    clearAllButton.addEventListener('click', clearAllItems);

    allFilterBtn.addEventListener('click', () => setFilter('all'));
    pendingFilterBtn.addEventListener('click', () => setFilter('pending'));
    completedFilterBtn.addEventListener('click', () => setFilter('completed'));

    // Inicializar la aplicación - Cargar ítems desde el backend al inicio
    fetchItemsFromBackend();
});