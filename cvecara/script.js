/*KORPA*/

// Inicijalizacija korpe iz memorije pretraživača ili kao prazan niz
let cart = JSON.parse(localStorage.getItem("auraFloraCart")) || [];
let total = parseInt(localStorage.getItem("auraFloraTotal")) || 0;

// Funkcija koja se pokreće čim se stranica učita
document.addEventListener("DOMContentLoaded", () => {
    updateCart(); // Osveži prikaz korpe
    proveriKante(); // Prikaži kante za proizvode koji su već u korpi
});

// 1. UNIVERZALNA FUNKCIJA ZA DODAVANJE
function addToCart(name, price, id) {
    cart.push({ name, price, id });
    total += price;
    
    // Prikaži kantu za taj proizvod
    prikaziKantu(id);
    
    sacuvajIPosvezi();
}

// 2. UKLANJANJE PREKO KANTE (Ispod proizvoda)
function removeFromCartById(id) {
    const index = cart.findIndex(item => item.id === id);
    
    if (index !== -1) {
        total -= cart[index].price;
        cart.splice(index, 1);
        
        // Sakrij kantu ako tog proizvoda više nema u korpi
        const stillInCart = cart.some(item => item.id === id);
        if (!stillInCart) {
            sakrijKantu(id);
        }
        
        sacuvajIPosvezi();
    }
}

// 3. UKLANJANJE IZ SAME KORPE (Mali "x")
function removeFromCart(index) {
    const id = cart[index].id;
    total -= cart[index].price;
    cart.splice(index, 1);
    
    // Proveri da li treba sakriti kantu na stranici
    const stillInCart = cart.some(item => item.id === id);
    if (!stillInCart) {
        sakrijKantu(id);
    }
    
    sacuvajIPosvezi();
}

// 4. POMOĆNE FUNKCIJE ZA REZULTATE I MEMORIJU
function sacuvajIPosvezi() {
    localStorage.setItem("auraFloraCart", JSON.stringify(cart));
    localStorage.setItem("auraFloraTotal", total);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (!cartItems || !totalElement) return;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.marginBottom = "5px";
        
        li.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} RSD <button onclick="removeFromCart(${index})" style="color:red; border:none; background:none; cursor:pointer;">✖</button></span>
        `;
        cartItems.appendChild(li);
    });

    totalElement.textContent = `Ukupno: ${total} RSD`;
}

// Funkcije za manipulaciju kantama na stranici
function prikaziKantu(id) {
    const productCard = document.getElementById(id);
    if (productCard) {
        const trashBtn = productCard.querySelector('.remove-trash');
        if (trashBtn) trashBtn.style.display = 'block';
    }
}

function sakrijKantu(id) {
    const productCard = document.getElementById(id);
    if (productCard) {
        const trashBtn = productCard.querySelector('.remove-trash');
        if (trashBtn) trashBtn.style.display = 'none';
    }
}

function proveriKante() {
    // Prolazi kroz sve proizvode u korpi i aktivira njihove kante na trenutnoj strani
    cart.forEach(item => {
        prikaziKantu(item.id);
    });
}

/*O NAMA SLIDER*/

document.addEventListener("DOMContentLoaded", function () {
    const sliderTrack = document.getElementById("sliderTrack");
    const sliderContainer = document.querySelector(".o_nama-slider");

    // Ako nije O nama strana – ne radi ništa
    if (!sliderTrack || !sliderContainer) return;

    const slides = sliderTrack.querySelectorAll("img");
    let currentIndex = 0;

    function moveSlider() {
        const slideHeight = sliderContainer.offsetHeight;

        currentIndex++;

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        sliderTrack.style.transform =
            `translateY(-${currentIndex * slideHeight}px)`;
    }

    setInterval(moveSlider, 3000);
});
