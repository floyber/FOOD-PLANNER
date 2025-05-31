// FAVORITOS.js - Script para manejar las recetas favoritas
document.addEventListener('DOMContentLoaded', function() {
    console.log('Documento cargado, iniciando script de favoritos');
    
    // Mostrar indicador de carga
    const cargandoIndicador = document.getElementById('cargando');
    const errorContainer = document.getElementById('error-container');
    const favoritosContainer = document.getElementById('favoritos-container');
    
    if (cargandoIndicador) {
        cargandoIndicador.style.display = 'block';
    }
    
    if (errorContainer) {
        errorContainer.style.display = 'none';
    }
    
    // Verificar si la carpeta de imágenes está disponible
    crearDirectorioImagenes();
    
    // Intentar cargar con un pequeño retraso para permitir la visualización del indicador de carga
    setTimeout(function() {
        try {
            // Primero cargar datos de ejemplo si es necesario, luego mostrar favoritos
            inicializarDatos();
            
            // Ocultar indicador de carga después de inicializar datos
            if (cargandoIndicador) {
                cargandoIndicador.style.display = 'none';
            }
            
            // Mostrar el contenedor de favoritos
            if (favoritosContainer) {
                favoritosContainer.style.display = 'grid';
            }
        } catch (e) {
            console.error('Error crítico al cargar la página:', e);
            
            // Mostrar mensaje de error y ocultar cargando
            if (cargandoIndicador) {
                cargandoIndicador.style.display = 'none';
            }
            
            if (errorContainer) {
                const errorMensaje = document.getElementById('error-mensaje');
                if (errorMensaje) {
                    errorMensaje.textContent = 'Hubo un problema al cargar tus recetas favoritas. Intenta recargar la página.';
                }
                errorContainer.style.display = 'block';
            }
            
            // Intentar cargar datos de ejemplo de todos modos
            try {
                cargarDatosEjemplo();
            } catch (innerError) {
                console.error('No se pudieron cargar datos de respaldo:', innerError);
            }
        }
    }, 500);
    
    // Añadir event listeners a los botones dinámicos
    document.addEventListener('click', function(event) {
        // Eliminar de favoritos
        if (event.target.classList.contains('btn-eliminar') || 
            event.target.parentElement.classList.contains('btn-eliminar')) {
            
            const card = event.target.closest('.favorito-card');
            if (card && card.dataset.id) {
                const recetaId = card.dataset.id;
                eliminarDeFavoritos(recetaId);
            }
        }
        
        // Ver detalles de receta
        if (event.target.classList.contains('btn-detalles') || 
            event.target.parentElement.classList.contains('btn-detalles')) {
            
            const card = event.target.closest('.favorito-card');
            if (card && card.dataset.id) {
                const recetaId = card.dataset.id;
                verDetallesReceta(recetaId);
            }
        }
    });
});

// Función para asegurar que existe el directorio de imágenes
function crearDirectorioImagenes() {
    console.log('Verificando directorio de imágenes para las recetas...');
    // Esta función es simbólica ya que JavaScript del navegador no puede crear directorios
}

// Función para inicializar datos
function inicializarDatos() {
    console.log('Inicializando datos de favoritos...');
    
    try {
        // Intentar obtener datos existentes
        let favoritos = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];
        
        // Si no hay datos o el array está vacío, cargar ejemplos
        if (!favoritos || favoritos.length === 0) {
            console.log('No se encontraron datos, cargando ejemplos...');
            cargarDatosEjemplo();
        } else {
            console.log('Datos encontrados en localStorage:', favoritos.length);
            cargarFavoritos();
        }
    } catch(e) {
        console.error('Error al inicializar datos:', e);
        // Si hay algún error, cargar los datos de ejemplo
        console.log('Cargando datos de ejemplo tras error...');
        cargarDatosEjemplo();
    }
}

// Función para cargar favoritos desde localStorage
function cargarFavoritos() {
    console.log('Cargando favoritos...');
    const favoritosContainer = document.getElementById('favoritos-container');
    const mensajeVacio = document.getElementById('mensaje-vacio');
    
    if (!favoritosContainer || !mensajeVacio) {
        console.error('No se encontraron los elementos necesarios en el DOM');
        // Intentar recuperar mostrando un mensaje
        mostrarNotificacion('Hubo un problema al cargar la página. Intenta recargar.');
        return;
    }
    
    // Obtener favoritos del localStorage
    let favoritos = [];
    try {
        favoritos = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];
        console.log('Favoritos cargados:', favoritos.length);
    } catch(e) {
        console.error('Error al cargar favoritos:', e);
        favoritos = [];
        // Si hay error en la carga, intentar cargar datos de ejemplo
        cargarDatosEjemplo();
        return; // Salir de esta función ya que cargarDatosEjemplo llamará a cargarFavoritos nuevamente
    }
    
    // Limpiar el contenedor de favoritos
    favoritosContainer.innerHTML = '';
    
    // Mostrar mensaje si no hay favoritos y cargar datos de ejemplo
    if (favoritos.length === 0) {
        console.log('No se encontraron favoritos, cargando datos de ejemplo...');
        cargarDatosEjemplo();
        return; // Salir de esta función ya que cargarDatosEjemplo llamará a cargarFavoritos nuevamente
    }
    
    // Ocultar mensaje si hay favoritos
    mensajeVacio.style.display = 'none';
    
    // Ocultar el indicador de carga si existe
    const cargandoIndicador = document.getElementById('cargando');
    if (cargandoIndicador) {
        cargandoIndicador.style.display = 'none';
    }
    
    // Mostrar el contenedor de favoritos
    favoritosContainer.style.display = 'grid';
    
    // Precargar todas las imágenes para evitar parpadeos
    const fragment = document.createDocumentFragment();
    
    // Crear tarjetas para cada receta favorita
    favoritos.forEach(receta => {
        // Asegurarse de que cada receta tiene datos válidos
        if (!receta || !receta.id) {
            console.warn('Se encontró una receta inválida:', receta);
            return; // Saltar esta receta
        }
        
        const card = crearTarjetaReceta(receta);
        fragment.appendChild(card);
    });
    
    // Verificar que haya tarjetas creadas
    if (fragment.childElementCount === 0) {
        console.warn('No se crearon tarjetas de recetas. Cargando datos de ejemplo...');
        cargarDatosEjemplo();
        return;
    }
    
    // Añadir todas las tarjetas de una vez para mejorar rendimiento
    favoritosContainer.appendChild(fragment);
    
    // Ocultar el indicador de carga si existe (doble verificación)
    if (cargandoIndicador) {
        cargandoIndicador.style.display = 'none';
    }
    
    // Mostrar mensaje de éxito
    console.log('Favoritos mostrados correctamente:', favoritos.length);
}

// Función para crear tarjeta de receta
function crearTarjetaReceta(receta) {
    const cardElement = document.createElement('div');
    cardElement.className = 'favorito-card';
    cardElement.dataset.id = receta.id;
    
    // Verificar si receta.nombre existe, de lo contrario usar un valor predeterminado
    const nombreReceta = receta.nombre || 'Receta sin nombre';
    
    // Determinar la imagen a mostrar, usando la imagenUrl definida o una imagen local según el id
    let imagenSrc;
    // Asignar imágenes específicas basadas en el ID de la receta
    switch(receta.id) {
        case '1':
            imagenSrc = 'https://cdn.pixabay.com/photo/2017/08/11/00/32/salad-2629262_1280.jpg';
            break;
        case '2':
            imagenSrc = 'https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_1280.jpg';
            break;
        case '3':
            imagenSrc = 'https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-1238248_1280.jpg';
            break;
        case '4':
            imagenSrc = 'https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_1280.jpg';
            break;
        case '5':
            imagenSrc = 'https://cdn.pixabay.com/photo/2020/06/08/16/49/pizza-5275191_1280.jpg';
            break;
        case '6':
            imagenSrc = 'https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_1280.jpg';
            break;
        case '7':
            imagenSrc = 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg';
            break;
        case '8':
            imagenSrc = 'https://cdn.pixabay.com/photo/2019/04/14/03/08/paella-4125786_1280.jpg';
            break;
        default:
            imagenSrc = receta.imagenUrl || 'https://cdn.pixabay.com/photo/2017/06/01/18/46/cook-2364221_1280.jpg';
    }
    
    // Asegurar que tiempo y calorías tengan valores válidos
    const tiempo = receta.tiempo || 'N/A';
    const calorias = receta.calorias || 'N/A';
    
    // Asegurar que existe una descripción
    const descripcion = receta.descripcion || 'Sin descripción disponible para esta receta.';
    
    cardElement.innerHTML = `
        <div class="img-container">
            <img src="${imagenSrc}" alt="${nombreReceta}" class="favorito-imagen" 
                 onerror="this.onerror=null; this.src='https://cdn.pixabay.com/photo/2017/06/01/18/46/cook-2364221_1280.jpg';">
        </div>
        <div class="favorito-info">
            <h3 class="favorito-titulo">${nombreReceta}</h3>
            <div class="favorito-meta">
                <span><i class="far fa-clock"></i> ${tiempo} min</span>
                <span><i class="fas fa-fire"></i> ${calorias} kcal</span>
            </div>
            <p>${descripcion.substring(0, 100) + (descripcion.length > 100 ? '...' : '')}</p>
            <div class="favorito-acciones">
                <button class="btn btn-primary btn-detalles">
                    <i class="fas fa-eye"></i> Ver receta
                </button>
                <button class="btn btn-secondary btn-eliminar">
                    <i class="fas fa-heart-broken"></i> Eliminar
                </button>
            </div>
        </div>
    `;
    
    return cardElement;
}

// Función para eliminar receta de favoritos
function eliminarDeFavoritos(recetaId) {
    console.log('Eliminando receta:', recetaId);
    
    // Obtener favoritos actuales
    let favoritos = [];
    try {
        favoritos = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];
    } catch(e) {
        console.error('Error al cargar favoritos para eliminar:', e);
        return;
    }
    
    // Filtrar para eliminar la receta seleccionada
    favoritos = favoritos.filter(receta => receta.id !== recetaId);
    
    // Guardar favoritos actualizados
    localStorage.setItem('recetasFavoritas', JSON.stringify(favoritos));
    
    // Encontrar y eliminar la tarjeta con animación para evitar parpadeo
    const card = document.querySelector(`.favorito-card[data-id="${recetaId}"]`);
    if (card) {
        // Animar la eliminación
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        // Después de la animación, recargamos todo
        setTimeout(() => {
            cargarFavoritos();
            mostrarNotificacion('Receta eliminada de favoritos');
        }, 300);
    } else {
        // Si no se encuentra la tarjeta, recargar directamente
        cargarFavoritos();
        mostrarNotificacion('Receta eliminada de favoritos');
    }
}

// Función para ver detalles de receta
function verDetallesReceta(recetaId) {
    console.log('Ver detalles de receta:', recetaId);
    // Obtener receta seleccionada
    let favoritos = [];
    try {
        favoritos = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];
    } catch(e) {
        console.error('Error al cargar favoritos para ver detalles:', e);
        return;
    }
    
    let receta = favoritos.find(r => r.id === recetaId);
    
    if (receta) {
        // Crear un modal con los detalles
        crearModalDetalles(receta);
    } else {
        mostrarNotificacion('No se pudo encontrar la receta solicitada');
    }
}

// Función para crear un modal con detalles de la receta
function crearModalDetalles(receta) {
    // Crear el contenedor del modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    // Verificar y establecer valores por defecto para evitar undefined
    const nombreReceta = receta.nombre || 'Receta sin nombre';
    const tiempo = receta.tiempo || 'N/A';
    const calorias = receta.calorias || 'N/A';
    const descripcion = receta.descripcion || 'No hay descripción disponible para esta receta.';
    
    // Determinar la imagen a mostrar, usando la misma lógica de asignación que en la tarjeta
    let imagenSrc;
    switch(receta.id) {
        case '1':
            imagenSrc = 'https://cdn.pixabay.com/photo/2017/08/11/00/32/salad-2629262_1280.jpg';
            break;
        case '2':
            imagenSrc = 'https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_1280.jpg';
            break;
        case '3':
            imagenSrc = 'https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-1238248_1280.jpg';
            break;
        case '4':
            imagenSrc = 'https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_1280.jpg';
            break;
        case '5':
            imagenSrc = 'https://cdn.pixabay.com/photo/2020/06/08/16/49/pizza-5275191_1280.jpg';
            break;
        case '6':
            imagenSrc = 'https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_1280.jpg';
            break;
        case '7':
            imagenSrc = 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg';
            break;
        case '8':
            imagenSrc = 'https://cdn.pixabay.com/photo/2019/04/14/03/08/paella-4125786_1280.jpg';
            break;
        default:
            imagenSrc = receta.imagenUrl || 'https://cdn.pixabay.com/photo/2017/06/01/18/46/cook-2364221_1280.jpg';
    }
    
    // Crear el contenido del modal
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Crear el HTML del modal
    let ingredientesHTML = '';
    if (receta.ingredientes && receta.ingredientes.length) {
        ingredientesHTML = `
            <h4>Ingredientes:</h4>
            <ul>
                ${receta.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        `;
    } else {
        ingredientesHTML = `
            <h4>Ingredientes:</h4>
            <p>No hay ingredientes disponibles para esta receta.</p>
        `;
    }
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h2 style="margin: 0;">${nombreReceta}</h2>
            <button class="modal-close" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
        </div>
        <div style="display: flex; margin-bottom: 10px; color: #666;">
            <div style="margin-right: 20px;"><i class="far fa-clock"></i> ${tiempo} minutos</div>
            <div><i class="fas fa-fire"></i> ${calorias} calorías</div>
        </div>
        <img src="${imagenSrc}" 
             alt="${nombreReceta}" 
             style="width: 100%; height: 250px; object-fit: cover; border-radius: 6px; margin-bottom: 15px;"
             onerror="this.onerror=null; this.src='https://cdn.pixabay.com/photo/2017/06/01/18/46/cook-2364221_1280.jpg'">
        <div style="margin-bottom: 15px;">
            <h4>Descripción:</h4>
            <p>${descripcion}</p>
        </div>
        ${ingredientesHTML}
    `;
    
    // Añadir el modal al DOM
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Animar la aparición del modal
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Manejar el cierre del modal
    const closeBtn = modalContent.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modalOverlay.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    });
    
    // Cerrar al hacer clic fuera del modal
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeBtn.click();
        }
    });
    
    // Añadir cierre con tecla Escape
    const handleKeyUp = (e) => {
        if (e.key === 'Escape') {
            closeBtn.click();
            document.removeEventListener('keyup', handleKeyUp);
        }
    };
    document.addEventListener('keyup', handleKeyUp);
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    
    // Añadir al DOM
    document.body.appendChild(notificacion);
    
    // Animar la aparición
    setTimeout(() => {
        notificacion.style.opacity = '1';
        notificacion.style.transform = 'translateY(0)';
    }, 10);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.style.opacity = '0';
        notificacion.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (notificacion.parentNode) {
                document.body.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
}

// Datos de ejemplo para pruebas con imágenes actualizadas y estables de Pixabay
function cargarDatosEjemplo() {
    console.log('Cargando datos de ejemplo con imágenes optimizadas...');
    
    const ejemploRecetas = [
        {
            id: '1',
            nombre: 'Ensalada César',
            descripcion: 'Deliciosa ensalada César con pollo a la parrilla, croutones y aderezo casero. Perfecta como entrada o plato principal ligero.',
            tiempo: 20,
            calorias: 350,
            imagenUrl: 'https://cdn.pixabay.com/photo/2017/08/11/00/32/salad-2629262_1280.jpg',
            ingredientes: ['Lechuga romana', 'Pollo', 'Pan tostado', 'Queso parmesano', 'Aderezo César']
        },
        {
            id: '2',
            nombre: 'Pasta Alfredo',
            descripcion: 'Cremosa pasta con salsa Alfredo, perfecta para una cena rápida y deliciosa. Puedes añadir pollo o camarones para hacerla más sustanciosa.',
            tiempo: 25,
            calorias: 450,
            imagenUrl: 'https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_1280.jpg',
            ingredientes: ['Fettuccine', 'Crema', 'Mantequilla', 'Queso parmesano', 'Ajo']
        },
        {
            id: '3',
            nombre: 'Salmón a la Parrilla',
            descripcion: 'El salmón a la parrilla es un platillo de pescado cocido al fuego directo, con sabor ahumado y textura jugosa. Ideal para una cena saludable.',
            tiempo: 30,
            calorias: 320,
            imagenUrl: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-1238248_1280.jpg',
            ingredientes: ['Filete de salmón', 'Limón', 'Tomillo', 'Aceite de oliva', 'Sal y pimienta']
        },
        {
            id: '4',
            nombre: 'Tacos de Carne Asada',
            descripcion: 'Deliciosos tacos mexicanos con carne marinada a la parrilla, servidos con cebolla, cilantro y limón. Perfectos para cualquier ocasión.',
            tiempo: 35,
            calorias: 380,
            imagenUrl: 'https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_1280.jpg',
            ingredientes: ['Carne de res', 'Tortillas de maíz', 'Cebolla', 'Cilantro', 'Limón', 'Salsa']
        },
        {
            id: '5',
            nombre: 'Pizza Margherita',
            descripcion: 'Pizza clásica italiana con salsa de tomate, mozzarella fresca y albahaca. Simple pero deliciosa con masa casera.',
            tiempo: 40,
            calorias: 420,
            imagenUrl: 'https://cdn.pixabay.com/photo/2020/06/08/16/49/pizza-5275191_1280.jpg',
            ingredientes: ['Masa de pizza', 'Tomate', 'Mozzarella', 'Albahaca', 'Aceite de oliva']
        },
        {
            id: '6',
            nombre: 'Sushi Roll California',
            descripcion: 'Roll invertido con aguacate, pepino, palitos de cangrejo y semillas de sésamo. Un clásico del sushi occidental.',
            tiempo: 45,
            calorias: 300,
            imagenUrl: 'https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_1280.jpg',
            ingredientes: ['Arroz de sushi', 'Alga nori', 'Palitos de cangrejo', 'Aguacate', 'Pepino', 'Sésamo']
        },
        {
            id: '7',
            nombre: 'Hamburguesa Clásica',
            descripcion: 'Suculenta hamburguesa con carne de res, queso cheddar, lechuga, tomate y cebolla. Acompañada de papas fritas.',
            tiempo: 25,
            calorias: 550,
            imagenUrl: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg',
            ingredientes: ['Carne de res', 'Pan de hamburguesa', 'Queso cheddar', 'Lechuga', 'Tomate', 'Cebolla', 'Ketchup', 'Mostaza']
        },
        {
            id: '8',
            nombre: 'Paella Valenciana',
            descripcion: 'Tradicional plato español con arroz, azafrán, pollo, conejo y verduras. Una explosión de sabores mediterráneos.',
            tiempo: 60,
            calorias: 480,
            imagenUrl: 'https://cdn.pixabay.com/photo/2019/04/14/03/08/paella-4125786_1280.jpg',
            ingredientes: ['Arroz', 'Pollo', 'Conejo', 'Judías verdes', 'Tomate', 'Azafrán', 'Caldo']
        }
    ];
    
    try {
        localStorage.setItem('recetasFavoritas', JSON.stringify(ejemploRecetas));
        console.log('Datos de ejemplo cargados exitosamente. Total recetas:', ejemploRecetas.length);
    } catch(e) {
        console.error('Error al guardar datos de ejemplo:', e);
        mostrarNotificacion('Hubo un error al cargar los datos de ejemplo');
        
        // Intento alternativo de guardar los datos
        try {
            // Intentar guardar solo las primeras 3 recetas en caso de error de almacenamiento
            localStorage.setItem('recetasFavoritas', JSON.stringify(ejemploRecetas.slice(0, 3)));
            console.log('Se guardaron datos parciales como respaldo');
        } catch(innerError) {
            console.error('Error crítico de almacenamiento:', innerError);
        }
    }
        
    // Crear directamente las tarjetas en caso de error futuro
    const favoritosContainer = document.getElementById('favoritos-container');
    const mensajeVacio = document.getElementById('mensaje-vacio');
    
    if (favoritosContainer && mensajeVacio) {
        // Asegurarse de que se muestre el contenedor y se oculte el mensaje
        mensajeVacio.style.display = 'none';
        favoritosContainer.style.display = 'grid';
        
        // Cargar los favoritos correctamente
        cargarFavoritos();
    } else {
        console.error('Elementos del DOM no encontrados para mostrar datos de ejemplo');
    }
}