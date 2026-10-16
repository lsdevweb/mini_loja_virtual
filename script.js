const products = [
  {
    id: "vaso-aurora",
    name: "Vaso Aurora",
    category: "decoracao",
    categoryLabel: "Decoração",
    description: "Cerâmica artesanal com acabamento natural.",
    price: 129.9,
    tag: "Feito à mão",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80",
    alt: "Vaso de cerâmica artesanal em tom natural"
  },
  {
    id: "luminaria-lua",
    name: "Luminária Lua",
    category: "iluminacao",
    categoryLabel: "Iluminação",
    description: "Luz suave para desacelerar no fim do dia.",
    price: 289,
    tag: "Queridinho",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=700&q=80",
    alt: "Luminária de mesa acesa em um ambiente aconchegante"
  },
  {
    id: "manta-campo",
    name: "Manta Campo",
    category: "textil",
    categoryLabel: "Têxteis",
    description: "Algodão macio para tardes mais tranquilas.",
    price: 219.9,
    tag: "",
    image: "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?auto=format&fit=crop&w=700&q=80",
    alt: "Manta de algodão dobrada em uma poltrona"
  },
  {
    id: "bandeja-areia",
    name: "Bandeja Areia",
    category: "decoracao",
    categoryLabel: "Decoração",
    description: "Um lugar bonito para os pequenos rituais.",
    price: 89,
    tag: "Peça única",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80",
    alt: "Bandeja decorativa em madeira com objetos delicados"
  },
  {
    id: "almofada-serra",
    name: "Almofada Serra",
    category: "textil",
    categoryLabel: "Têxteis",
    description: "Textura gostosa e tons que combinam com tudo.",
    price: 149.9,
    tag: "",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80",
    alt: "Almofada em tecido natural sobre um sofá claro"
  },
  {
    id: "abajur-ninho",
    name: "Abajur Ninho",
    category: "iluminacao",
    categoryLabel: "Iluminação",
    description: "Luz acolhedora com formas orgânicas.",
    price: 349,
    tag: "Novo",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
    alt: "Abajur de mesa com luz quente"
  },
  {
    id: "escultura-origem",
    name: "Escultura Origem",
    category: "decoracao",
    categoryLabel: "Decoração",
    description: "Formas naturais para dar personalidade à estante.",
    price: 179,
    tag: "",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80",
    alt: "Peça de cerâmica decorativa com formas orgânicas"
  },
  {
    id: "capa-trama",
    name: "Capa Trama",
    category: "textil",
    categoryLabel: "Têxteis",
    description: "Toque artesanal para renovar seu cantinho.",
    price: 119,
    tag: "",
    image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=700&q=80",
    alt: "Tecido decorativo em tons neutros"
  }
];

const storageKey = "casa-serena-cart";
const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});
const productGrid = document.querySelector("#product-grid");
const filters = document.querySelector("#category-filters");
const productTotal = document.querySelector("#product-total");
const catalogFeedback = document.querySelector("#catalog-feedback");
const cartDialog = document.querySelector("#cart-dialog");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartFooter = document.querySelector("#cart-footer");
const cartCount = document.querySelector("#cart-count");
const dialogCartCount = document.querySelector("#dialog-cart-count");
const cartSubtotal = document.querySelector("#cart-subtotal");
const cartFeedback = document.querySelector("#cart-feedback");
const cart = loadCart();

function loadCart() {
  const savedCart = localStorage.getItem(storageKey);
  if (!savedCart) return {};

  try {
    const parsedCart = JSON.parse(savedCart);
    if (!parsedCart || typeof parsedCart !== "object" || Array.isArray(parsedCart)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsedCart).filter(([id, quantity]) =>
        products.some((product) => product.id === id) &&
        Number.isInteger(quantity) &&
        quantity > 0
      )
    );
  } catch (error) {
    console.error("Não foi possível ler a sacola salva.", error);
    return {};
  }
}

function saveCart() {
  localStorage.setItem(storageKey, JSON.stringify(cart));
}

function renderProducts(category = "todos") {
  const visibleProducts = category === "todos"
    ? products
    : products.filter((product) => product.category === category);

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.alt}" loading="lazy" />
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
      </div>
      <div class="product-info">
        <p class="product-category">${product.categoryLabel}</p>
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-buy">
          <span class="product-price">${currency.format(product.price)}</span>
          <button class="add-to-cart" type="button" data-add="${product.id}" aria-label="Adicionar ${product.name} à sacola">
            Adicionar <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </article>
  `).join("");

  productTotal.textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? "produto" : "produtos"}`;
}

function renderCart() {
  const entries = Object.entries(cart);
  const itemCount = entries.reduce((total, [, quantity]) => total + quantity, 0);
  const subtotal = entries.reduce((total, [id, quantity]) => {
    const product = products.find((item) => item.id === id);
    return total + product.price * quantity;
  }, 0);

  cartCount.textContent = String(itemCount);
  cartCount.setAttribute("aria-label", `${itemCount} ${itemCount === 1 ? "item" : "itens"}`);
  dialogCartCount.textContent = `(${itemCount})`;
  cartSubtotal.textContent = currency.format(subtotal);
  cartEmpty.hidden = itemCount > 0;
  cartFooter.hidden = itemCount === 0;
  cartItems.innerHTML = entries.map(([id, quantity]) => {
    const product = products.find((item) => item.id === id);
    return `
      <article class="cart-item">
        <img src="${product.image}" alt="" />
        <div class="cart-item-info">
          <strong>${product.name}</strong>
          <span>${currency.format(product.price)} cada</span>
          <div class="quantity-control" aria-label="Quantidade de ${product.name}">
            <button type="button" data-decrease="${id}" aria-label="Remover uma unidade de ${product.name}">−</button>
            <span>${quantity}</span>
            <button type="button" data-increase="${id}" aria-label="Adicionar uma unidade de ${product.name}">+</button>
          </div>
        </div>
        <span class="cart-item-price">${currency.format(product.price * quantity)}</span>
      </article>
    `;
  }).join("");
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  filters.querySelectorAll("[data-category]").forEach((filterButton) => {
    const isActive = filterButton === button;
    filterButton.classList.toggle("is-active", isActive);
    filterButton.setAttribute("aria-pressed", String(isActive));
  });

  renderProducts(button.dataset.category);
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  const product = products.find((item) => item.id === button.dataset.add);
  cart[product.id] = (cart[product.id] || 0) + 1;
  saveCart();
  renderCart();
  catalogFeedback.textContent = `${product.name} foi adicionado à sacola.`;
});

cartItems.addEventListener("click", (event) => {
  const increaseButton = event.target.closest("[data-increase]");
  const decreaseButton = event.target.closest("[data-decrease]");

  if (increaseButton) {
    const id = increaseButton.dataset.increase;
    cart[id] += 1;
  } else if (decreaseButton) {
    const id = decreaseButton.dataset.decrease;
    cart[id] -= 1;
    if (cart[id] === 0) delete cart[id];
  } else {
    return;
  }

  saveCart();
  renderCart();
}
);

document.querySelector("#open-cart").addEventListener("click", () => {
  cartFeedback.textContent = "";
  cartDialog.showModal();
});

document.querySelector("#continue-shopping").addEventListener("click", () => {
  cartDialog.close();
  document.querySelector("#produtos").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#checkout-button").addEventListener("click", () => {
  cartFeedback.textContent = "Esta é uma demonstração: o pedido não foi enviado e nenhum pagamento foi realizado.";
});

renderProducts();
renderCart();
