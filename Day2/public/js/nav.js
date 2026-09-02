function updateAuthNav() {
  const authNav = document.getElementById('authNav');
  if (!authNav) return;

  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    authNav.innerHTML = `
      <div class="user-menu">
        <a href="/profile.html">${user.name}</a>
        <button class="btn btn-sm btn-outline" onclick="logout()">Keluar</button>
      </div>
    `;
  } else {
    authNav.innerHTML = `
      <a href="/login.html" class="btn btn-sm">Masuk</a>
    `;
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
}

async function updateCartBadge() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;

  const badge = document.getElementById('cartBadge');
  if (!badge) return;

  const result = await API.get('/api/ecommerce/cart');
  if (result.success) {
    const count = result.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = count;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateAuthNav();
  updateCartBadge();

  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
});
