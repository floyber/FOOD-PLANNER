// Array con los datos de las recetas
const recetas = [
    {
        id: 1,
        titulo: "Ensalada con Pollo",
        descripcion: "La ensalada con pollo es un plato ligero y nutritivo que mezcla vegetales frescos con trozos de pollo cocido, ideal como comida balanceada y rica en proteínas.",
        categoria: "comida",
        tiempo: "25 min",
        calorias: 350,
        imagen: "https://conave.org/wp-content/uploads/2019/07/ensalada-cesar-con-pollo.jpg",
        favorito: false,
        ingredientes: [
            "1 pechuga de pollo",
            "1 lechuga romana",
            "50g de queso parmesano",
            "Croutones",
            "Aderezo César"
        ],
        instrucciones: [
            "Cocinar el pollo a la parrilla y cortarlo en tiras",
            "Lavar y cortar la lechuga",
            "Mezclar todos los ingredientes",
            "Añadir el aderezo y mezclar bien"
        ]
    },
    {
        id: 2,
        titulo: "Avena con Frutas",
        descripcion: "La avena con frutas es un desayuno saludable que combina avena cocida o remojada con frutas frescas, ofreciendo una mezcla nutritiva de fibra, vitaminas y energía natural.",
        categoria: "desayuno",
        tiempo: "10 min",
        calorias: 250,
        imagen: "https://images.mrcook.app/recipe-image/01923cbb-9ef3-706f-9049-6b0becc3a683",
        favorito: true,
        ingredientes: [
            "1/2 taza de avena",
            "1 taza de leche",
            "1 platano",
            "Frutos rojos",
            "Miel al gusto"
        ],
        instrucciones: [
            "Cocinar la avena con la leche",
            "Añadir el plátano en rodajas",
            "Decorar con frutos rojos",
            "Endulzar con miel al gusto"
        ]
    },
    {
        id: 3,
        titulo: "Salmón al Horno con Verduras",
        descripcion: "El salmón al horno con verduras es un plato saludable que combina filete de salmón asado con vegetales, ofreciendo una comida equilibrada, rica en ácidos grasos omega-3 y vitaminas.",
        categoria: "cena",
        tiempo: "30 min",
        calorias: 420,
        imagen: "https://recetarius.com/wp-content/uploads/2020/12/salmon-al-horno.jpg",
        favorito: false,
        ingredientes: [
            "200g de salmón",
            "1 calabacín",
            "1 pimiento rojo",
            "1 limon",
            "Aceite de oliva",
            "Sal y pimienta"
        ],
        instrucciones: [
            "Precalentar el horno a 180°C",
            "Colocar el salmón en una bandeja",
            "Añadir las verduras cortadas alrededor",
            "Aliñar con aceite, sal y pimienta",
            "Hornear por 20-25 minutos"
        ]
    },
    {
        id: 4,
        titulo: "Torta de Manzana",
        descripcion: "La torta de manzana es un postre casero que combina masa suave con trozos de manzana, ofreciendo un sabor dulce y frutal, ideal para acompañar con café o té.",
        categoria: "postre",
        tiempo: "50 min",
        calorias: 300,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJPHQ1dWBrz4yrRrd76HTCQtxXb5NTgzXZtg&s",
        favorito: false,
        ingredientes: [
            "3 manzanas",
            "1 masa para tarta",
            "1/2 taza de azúcar moreno",
            "1 cucharada de canela",
            "50g de mantequilla"
        ],
        instrucciones: [
            "Precalentar el horno a 180°C",
            "Forrar un molde con la masa",
            "Cortar las manzanas en láminas",
            "Colocar las manzanas sobre la masa",
            "Espolvorear con azúcar y canela",
            "Hornear por 40 minutos"
        ]
    },
    {
        id: 5,
        titulo: "Curry de Garbanzos",
        descripcion: "El curry de garbanzos es un plato vegetal especiado, elaborado con garbanzos cocidos en una salsa de curry, ideal como opción nutritiva y rica en proteínas vegetales.",
        categoria: "vegetariano",
        tiempo: "35 min",
        calorias: 380,
        imagen: "https://i0.wp.com/spiceandcolour.com/wp-content/uploads/2021/02/DSC_0878_editado.jpg?fit=1140%2C760&ssl=1",
        favorito: true,
        ingredientes: [
            "1 lata de garbanzos",
            "1 cebolla",
            "2 dientes de ajo",
            "1 lata de tomate triturado",
            "2 cucharadas de curry en polvo",
            "1 taza de arroz basmati"
        ],
        instrucciones: [
            "Sofreír la cebolla y el ajo",
            "Añadir el curry y cocinar por 1 minuto",
            "Agregar el tomate y los garbanzos",
            "Cocinar a fuego lento por 20 minutos",
            "Servir con arroz basmati cocido"
        ]
    },
    {
        id: 6,
        titulo: "Tortilla Española",
        descripcion: "Clásica tortilla española de patatas y cebolla es un plato típico de España hecho con huevos, patatas y, a veces, cebolla. Se cocina en sartén hasta que queda dorada por fuera y jugosa por dentro.",
        categoria: "comida",
        tiempo: "40 min",
        calorias: 320,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhXexTZn60G-tf9N8o1Wlc5Fq5EvhLeA-gXQ&s",
        favorito: false,
        ingredientes: [
            "5 patatas medianas",
            "1 cebolla grande",
            "6 huevos",
            "Aceite de oliva",
            "Sal"
        ],
        instrucciones: [
            "Pelar y cortar las patatas en rodajas finas",
            "Cortar la cebolla en juliana",
            "Freír las patatas y la cebolla a fuego lento",
            "Batir los huevos y mezclar con las patatas",
            "Cuajar la tortilla por ambos lados"
        ]
    }
];

function renderizarRecetas(recetasMostradas = recetas) {
    const contenedor = document.getElementById('recipe-container');
    contenedor.innerHTML = '';
    
    if(recetasMostradas.length === 0) {
        contenedor.innerHTML = '<div class="no-results">No se encontraron recetas con los criterios seleccionados.</div>';
        return;
    }
    
    recetasMostradas.forEach(receta => {
        const recetaCard = document.createElement('div');
        recetaCard.className = 'recipe-card';
        recetaCard.setAttribute('data-id', receta.id);
        
        recetaCard.innerHTML = `
            <div class="recipe-image-container">
                <img src="${receta.imagen}" alt="${receta.titulo}" class="recipe-image">
            </div>
            <div class="recipe-content">
                <h3 class="recipe-title">${receta.titulo}</h3>
                <div class="recipe-meta">
                    <span class="recipe-time">⏱ ${receta.tiempo}</span>
                    <span class="recipe-calories">🔥 ${receta.calorias} kcal</span>
                </div>
                <p class="recipe-description">${receta.descripcion}</p>
                <div class="recipe-actions">
                    <button class="btn-ver-receta" onclick="verReceta(${receta.id})">
                        <span class="btn-icon">👁️</span>
                        <span class="btn-text">Ver Receta</span>
                    </button>
                    <button class="btn-eliminar" onclick="eliminarReceta(${receta.id})">
                        <span class="btn-icon">🗑️</span>
                        <span class="btn-text">Eliminar</span>
                    </button>
                </div>
            </div>
        `;
        
        contenedor.appendChild(recetaCard);
    });
    
    // Añadir estilos mejorados para los botones si no existen
    if (!document.getElementById('improved-button-styles')) {
        const styles = document.createElement('style');
        styles.id = 'improved-button-styles';
        styles.textContent = `
            .recipe-actions {
                display: flex;
                gap: 12px;
                margin-top: 1.5rem;
            }
            
            .btn-ver-receta,
            .btn-eliminar {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 12px 18px;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-size: 0.9rem;
                font-weight: 600;
                transition: all 0.3s ease;
                flex: 1;
                text-align: center;
                position: relative;
                overflow: hidden;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .btn-ver-receta {
                background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
                color: white;
                box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            }
            
            .btn-ver-receta:hover {
                background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
            }
            
            .btn-ver-receta:active {
                transform: translateY(0);
                box-shadow: 0 2px 10px rgba(76, 175, 80, 0.3);
            }
            
            .btn-eliminar {
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
                color: white;
                box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
            }
            
            .btn-eliminar:hover {
                background: linear-gradient(135deg, #ff5252 0%, #e53935 100%);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
            }
            
            .btn-eliminar:active {
                transform: translateY(0);
                box-shadow: 0 2px 10px rgba(255, 107, 107, 0.3);
            }
            
            .btn-icon {
                font-size: 1.1em;
                filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
            }
            
            .btn-text {
                font-weight: 600;
                text-shadow: 0 1px 2px rgba(0,0,0,0.1);
            }
            
            /* Efecto de ondas al hacer click */
            .btn-ver-receta::before,
            .btn-eliminar::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }
            
            .btn-ver-receta:active::before,
            .btn-eliminar:active::before {
                width: 300px;
                height: 300px;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .recipe-actions {
                    flex-direction: column;
                    gap: 8px;
                }
                
                .btn-ver-receta,
                .btn-eliminar {
                    padding: 10px 16px;
                    font-size: 0.85rem;
                }
                
                .btn-icon {
                    font-size: 1em;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

function filtrarPorCategoria(categoria) {
    const botonesCategoria = document.querySelectorAll('.filter-btn');
    botonesCategoria.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === categoria) {
            btn.classList.add('active');
        }
    });
    
    if (categoria === 'todos') {
        renderizarRecetas();
    } else {
        const recetasFiltradas = recetas.filter(receta => receta.categoria === categoria);
        renderizarRecetas(recetasFiltradas);
    }
}

function buscarRecetas() {
    const terminoBusqueda = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (terminoBusqueda === '') {
        renderizarRecetas();
        return;
    }
    
    // Verificar si la búsqueda es por ingrediente (prefijo "i:" o "ingrediente:")
    const esBusquedaPorIngrediente = terminoBusqueda.startsWith('i:') || terminoBusqueda.startsWith('ingrediente:');
    
    let recetasFiltradas = [];
    
    if (esBusquedaPorIngrediente) {
        // Extraer el ingrediente quitando el prefijo
        let ingredienteBuscado = terminoBusqueda;
        if (terminoBusqueda.startsWith('i:')) {
            ingredienteBuscado = terminoBusqueda.substring(2).trim();
        } else if (terminoBusqueda.startsWith('ingrediente:')) {
            ingredienteBuscado = terminoBusqueda.substring(12).trim();
        }
        
        // Filtrar por ingrediente
        recetasFiltradas = recetas.filter(receta => {
            return receta.ingredientes.some(ingrediente => 
                ingrediente.toLowerCase().includes(ingredienteBuscado)
            );
        });
    } else {
        // Búsqueda normal por título o descripción
        recetasFiltradas = recetas.filter(receta => {
            return receta.titulo.toLowerCase().includes(terminoBusqueda) ||
                   receta.descripcion.toLowerCase().includes(terminoBusqueda) ||
                   // También incluir búsqueda por ingredientes en modo normal
                   receta.ingredientes.some(ingrediente => 
                       ingrediente.toLowerCase().includes(terminoBusqueda)
                   );
        });
    }
    
    renderizarRecetas(recetasFiltradas);
}

// Función para ver los detalles de la receta
function verReceta(id) {
    const receta = recetas.find(r => r.id === id);
    if (!receta) return;
    
    // Crear modal para mostrar la receta completa
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${receta.titulo}</h2>
                <button class="modal-close" onclick="cerrarModal()">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${receta.imagen}" alt="${receta.titulo}" class="modal-image">
                <div class="recipe-info-modal">
                    <div class="recipe-meta-modal">
                        <span><strong>Tiempo:</strong> ${receta.tiempo}</span>
                        <span><strong>Calorías:</strong> ${receta.calorias} kcal</span>
                        <span><strong>Categoría:</strong> ${receta.categoria}</span>
                    </div>
                    <p class="recipe-description-modal">${receta.descripcion}</p>
                    <div class="ingredients-section">
                        <h3>Ingredientes:</h3>
                        <ul>
                            ${receta.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="instructions-section">
                        <h3>Instrucciones:</h3>
                        <ol>
                            ${receta.instrucciones.map(instruccion => `<li>${instruccion}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Agregar estilos del modal si no existen
    if (!document.getElementById('modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .modal-content {
                background: white;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #eee;
                background-color: #5cb85c;
                color: white;
                border-radius: 10px 10px 0 0;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                color: white;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-body {
                padding: 20px;
            }
            .modal-image {
                width: 100%;
                height: 300px;
                object-fit: cover;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            .recipe-meta-modal {
                display: flex;
                gap: 20px;
                margin-bottom: 15px;
                flex-wrap: wrap;
            }
            .recipe-meta-modal span {
                background-color: #f8f9fa;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 14px;
            }
            .recipe-description-modal {
                margin-bottom: 20px;
                line-height: 1.6;
                color: #666;
            }
            .ingredients-section, .instructions-section {
                margin-bottom: 20px;
            }
            .ingredients-section h3, .instructions-section h3 {
                color: #5cb85c;
                margin-bottom: 10px;
            }
            .ingredients-section ul, .instructions-section ol {
                padding-left: 20px;
            }
            .ingredients-section li, .instructions-section li {
                margin-bottom: 5px;
                line-height: 1.5;
            }
        `;
        document.head.appendChild(styles);
    }
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Función para eliminar receta
function eliminarReceta(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
        const index = recetas.findIndex(r => r.id === id);
        if (index !== -1) {
            recetas.splice(index, 1);
            
            // Volver a renderizar las recetas
            const categoriaActiva = document.querySelector('.filter-btn.active');
            if (categoriaActiva) {
                filtrarPorCategoria(categoriaActiva.getAttribute('data-category'));
            } else {
                renderizarRecetas();
            }
        }
    }
}

// Función para marcar/desmarcar favoritos (mantenida para compatibilidad)
function toggleFavorito(id) {
    const index = recetas.findIndex(r => r.id === id);
    if (index !== -1) {
        recetas[index].favorito = !recetas[index].favorito;
        guardarFavoritos();
    }
}

// Función para buscar por múltiples ingredientes
function buscarPorIngredientes(ingredientes) {
    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
        return recetas;
    }
    
    const ingredientesLower = ingredientes.map(ing => ing.toLowerCase().trim());
    
    return recetas.filter(receta => {
        const ingredientesReceta = receta.ingredientes.map(ing => ing.toLowerCase());
        
        return ingredientesLower.some(ingredienteBuscado => 
            ingredientesReceta.some(ingredienteReceta => 
                ingredienteReceta.includes(ingredienteBuscado)
            )
        );
    });
}

// Función para guardar favoritos (sin localStorage por restricción)
function guardarFavoritos() {
    // Los favoritos se mantienen en memoria durante la sesión
    console.log('Favoritos actualizados');
}

// Función para cargar favoritos (sin localStorage por restricción)
function cargarFavoritos() {
    // Los favoritos se cargan desde el array inicial
    console.log('Favoritos cargados');
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Cargar favoritos guardados
    cargarFavoritos();
    
    // Renderizar recetas iniciales
    renderizarRecetas();
    
    // Event listeners
    document.getElementById('search-button').addEventListener('click', buscarRecetas);
    document.getElementById('search-input').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            buscarRecetas();
        }
    });
    
    // Event listeners para filtros
    const botonesCategoria = document.querySelectorAll('.filter-btn');
    botonesCategoria.forEach(btn => {
        btn.addEventListener('click', function() {
            filtrarPorCategoria(this.getAttribute('data-category'));
        });
    });
    
    // Cerrar modal al hacer click fuera de él
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            cerrarModal();
        }
    });
});