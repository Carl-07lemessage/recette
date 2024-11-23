let recipes = [];

// Ajouter des recettes d'exemple si aucune recette n'existe
function addExampleRecipes() {
    if (recipes.length === 0) {
        const exampleRecipes = [
            {
                id: 1,
                name: "Tarte aux Pommes Traditionnelle",
                ingredients: "6 pommes\n150g de farine\n100g de beurre\n1 œuf\nSucre vanillé",
                instructions: "1. Préparer la pâte\n2. Éplucher et couper les pommes\n3. Assembler la tarte\n4. Cuire 45 minutes",
                prepTime: 45,
                date: new Date().toLocaleDateString(),
                image: "https://images.unsplash.com/photo-1619841547829-1a7fb0710f06?auto=format&fit=crop&w=600&h=400"
            },
            {
                id: 2,
                name: "Soupe de Légumes Maison",
                ingredients: "Carottes\nPommes de terre\nPoireaux\nOignon\nBouillon de légumes",
                instructions: "1. Couper les légumes\n2. Faire revenir les oignons\n3. Ajouter le bouillon\n4. Mijoter 30 minutes",
                prepTime: 30,
                date: new Date().toLocaleDateString(),
                image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&h=400"
            },
            {
                id: 3,
                name: "Poulet Rôti aux Herbes",
                ingredients: "1 poulet\nThym\nRomarin\nAil\nCitron",
                instructions: "1. Préchauffer le four\n2. Préparer le poulet\n3. Ajouter les herbes\n4. Cuire 1h30",
                prepTime: 90,
                date: new Date().toLocaleDateString(),
                image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=600&h=400"
            }
        ];
        recipes = exampleRecipes;
        saveRecipes();
    }
}

// Met à jour la fonction displayRecipes
function displayRecipes(recipesToDisplay = recipes) {
    const grid = document.getElementById('recipesGrid');
    grid.innerHTML = '';

    recipesToDisplay.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.animation = `cardAppear 0.6s ease-out ${index * 0.1}s forwards`;
        
        card.innerHTML = `
            <img 
                src="${recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&h=400'}" 
                alt="Photo de ${recipe.name}"
                class="recipe-card-image"
                width="600"
                height="400"
            >
            <h3>🍳 ${recipe.name}</h3>
            <button onclick="showRecipeDetails(${recipe.id})" class="recipe-button">
                Voir la recette
            </button>
        `;
        grid.appendChild(card);
    });
}

// Ajoute une fonction pour animer les éléments lorsqu'ils entrent dans la fenêtre d'affichage
function addIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.recipe-card').forEach(card => {
        observer.observe(card);
    });
}

function addRecipe() {
    const name = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const prepTime = document.getElementById('prepTime').value;

    if (!name || !ingredients || !instructions || !prepTime) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    const recipe = {
        id: Date.now(),
        name,
        ingredients,
        instructions,
        prepTime,
        date: new Date().toLocaleDateString(),
        image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&h=400'
    };

    recipes.push(recipe);
    saveRecipes();
    displayRecipes();
    clearForm();
}

function clearForm() {
    document.getElementById('recipeName').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('instructions').value = '';
    document.getElementById('prepTime').value = '';
}

function searchRecipes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm.length === 0) {
        displayRecipes();
        return;
    }
    
    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.toLowerCase().includes(searchTerm)
    );
    displayRecipes(filteredRecipes);
}

// Ajoute un comportement de défilement doux pour les détails de la recette
function showRecipeDetails(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;

    // Défilement en douceur vers le haut avant d'afficher les détails
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Attendre que le défilement soit terminé avant d'afficher les détails
    setTimeout(() => {
        // Sélectionner la section pour afficher les détails de la recette
        const recipeDetails = document.getElementById("recipeDetails");
        
        // Mettre à jour le contenu avec les détails de la recette
        document.getElementById("recipeName").innerText = recipe.name;
        document.getElementById("recipeImage").src = recipe.image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&h=400"; // Vous pouvez définir une image par défaut ici
        document.getElementById("recipePrepTime").innerText = `Temps de préparation: ${recipe.prepTime || 'N/A'}`;

        // Mettre à jour les ingrédients
        const ingredientsList = document.getElementById("recipeIngredients");
        ingredientsList.innerHTML = ''; // Effacer les anciens ingrédients
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.innerText = ingredient;
            ingredientsList.appendChild(li);
        });

        // Mettre à jour les instructions
        const instructionsList = document.getElementById("recipeInstructions");
        instructionsList.innerHTML = ''; // Effacer les anciennes instructions
        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.innerText = instruction;
            instructionsList.appendChild(li);
        });

        // Afficher la section avec les détails
        recipeDetails.style.display = 'block';
    }, 500);
}


function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
    
    // Gestion de l'arrière-plan
    let backdrop = document.querySelector('.sidebar-backdrop');
    if (sidebar.classList.contains('active')) {
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'sidebar-backdrop';
            backdrop.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 999;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(backdrop);
            backdrop.addEventListener('click', toggleMenu);
            // Retarder pour permettre la transition
            setTimeout(() => backdrop.style.opacity = '1', 10);
        }
    } else if (backdrop) {
        backdrop.style.opacity = '0';
        setTimeout(() => backdrop.remove(), 300);
    }
}

function showFavorites() {
    // Fonctionnalité des favoris à venir
    alert('Fonctionnalité des favoris à venir!');
}

function showCategories() {
    // Fonctionnalité des catégories à venir
    alert('Fonctionnalité des catégories à venir!');
}

// Mise à jour de la fonction showAddRecipeForm
function showAddRecipeForm() {
    document.getElementById('addRecipeForm').style.display = 'block';
    document.querySelector('.featured-recipes').style.display = 'none';
    if (window.innerWidth <= 768) {
        toggleMenu();
    }
}

// Mise à jour de la fonction showAllRecipes
function showAllRecipes() {
    document.getElementById('addRecipeForm').style.display = 'none';
    document.querySelector('.featured-recipes').style.display = 'block';
    displayRecipes();
    if (window.innerWidth <= 768) {
        toggleMenu();
    }
}

function deleteRecipe(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
        recipes = recipes.filter(recipe => recipe.id !== id);
        saveRecipes();
        displayRecipes();
    }
}

function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function loadRecipes() {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
        recipes = JSON.parse(savedRecipes);
    }
    addExampleRecipes(); // Ajouter des recettes d'exemple si aucune n'existe
    displayRecipes();
}

document.addEventListener('DOMContentLoaded', () => {
    loadRecipes();
    addIntersectionObserver();
    
    // Ajoute la visibilité du bouton de bascule du menu sur mobile
    const menuToggle = document.querySelector('.menu-toggle');
    function updateMenuToggleVisibility() {
        menuToggle.style.display = window.innerWidth <= 768 ? 'block' : 'none';
    }
    
    window.addEventListener('resize', updateMenuToggleVisibility);
    updateMenuToggleVisibility();
});

// Mise à jour des fonctions de modale
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function showSignupModal() {
    const modal = document.getElementById('signupModal');
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function closeSignupModal() {
    const modal = document.getElementById('signupModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Ajouter la logique de connexion ici
    console.log('Tentative de connexion:', { email, password });
    
    // Fermer la modale
    closeLoginModal();
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
    }
    
    // Ajouter la logique d'inscription ici
    console.log('Tentative d\'inscription:', { name, email, password });
    
    // Fermer la modale
    closeSignupModal();
}

// Ajouter des gestionnaires de clic pour fermer les modales lorsqu'on clique en dehors
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === signupModal) {
        closeSignupModal();
    }
}


