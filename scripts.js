// Infinite Scroll
const loadMoreButton = document.getElementById('load-more');
const productGrid = document.querySelector('.grid');

let currentPage = 1;
const loadProducts = async (page) => {
  try {
    const response = await fetch(`https://api.example.com/products?page=${page}`);
    const products = await response.json();

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">$${product.price}</p>
      `;
      productGrid.appendChild(productCard);
    });
  } catch (error) {
    console.error('Error loading products:', error);
  }
};

// Initial load
loadProducts(currentPage);

// Load more button click
loadMoreButton.addEventListener('click', () => {
  currentPage++;
  loadProducts(currentPage);
});

// Infinite scroll
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    currentPage++;
    loadProducts(currentPage);
  }
});
