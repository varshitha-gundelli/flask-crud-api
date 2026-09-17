const API_URL = "";
fetch(`${API_URL}/users`)
fetch(`${API_URL}/products`)
let users = [];
let products = [];

document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
    loadProducts();
});

async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);

        if (!response.ok) {
            throw new Error("Failed to load users");
        }

        users = await response.json();

        displayUsers(users);

        document.getElementById("userCount").textContent = users.length;

    } catch (error) {
        showMessage("Error loading users", "error");
    }
}

function displayUsers(data) {
    const tableBody = document.getElementById("userTableBody");

    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4">No users found</td>
            </tr>
        `;
        return;
    }

    data.forEach(user => {
        tableBody.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <button
                        class="action-btn edit-btn"
                        onclick="editUser(${user.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteUser(${user.id})"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function searchUsers() {
    const search = document
        .getElementById("userSearch")
        .value
        .toLowerCase();

    const filtered = users.filter(user =>
        user.username.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    );

    displayUsers(filtered);
}

function openUserModal() {
    document.getElementById("userModal").style.display = "flex";
    document.getElementById("userModalTitle").textContent = "Add User";

    document.getElementById("userId").value = "";
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
}

function closeUserModal() {
    document.getElementById("userModal").style.display = "none";
}

async function editUser(id) {
    try {
        const response = await fetch(`${API_URL}/users/${id}`);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();
        const user = data.user;

        document.getElementById("userId").value = user.id;
        document.getElementById("username").value = user.username;
        document.getElementById("email").value = user.email;

        document.getElementById("userModalTitle").textContent = "Edit User";

        document.getElementById("userModal").style.display = "flex";

    } catch (error) {
        showMessage("Error loading user", "error");
    }
}

async function saveUser() {
    const id = document.getElementById("userId").value;
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!username || !email) {
        showMessage("Please fill all fields", "error");
        return;
    }

    const userData = {
        username: username,
        email: email
    };

    try {
        let response;

        if (id) {
            response = await fetch(`${API_URL}/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
        } else {
            response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
        }

        if (!response.ok) {
            throw new Error("Operation failed");
        }

        closeUserModal();

        showMessage(
            id ? "User updated successfully" : "User created successfully",
            "success"
        );

        loadUsers();

    } catch (error) {
        showMessage("Error saving user", "error");
    }
}

async function deleteUser(id) {
    const confirmed = confirm("Are you sure you want to delete this user?");

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        showMessage("User deleted successfully", "success");

        loadUsers();

    } catch (error) {
        showMessage("Error deleting user", "error");
    }
}

async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        products = await response.json();

        displayProducts(products);

        document.getElementById("productCount").textContent =
            products.length;

    } catch (error) {
        showMessage("Error loading products", "error");
    }
}

function displayProducts(data) {
    const tableBody = document.getElementById("productTableBody");

    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4">No products found</td>
            </tr>
        `;
        return;
    }

    data.forEach(product => {
        tableBody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>₹${Number(product.price).toFixed(2)}</td>
                <td>
                    <button
                        class="action-btn edit-btn"
                        onclick="editProduct(${product.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteProduct(${product.id})"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function searchProducts() {
    const search = document
        .getElementById("productSearch")
        .value
        .toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(search)
    );

    displayProducts(filtered);
}

function openProductModal() {
    document.getElementById("productModal").style.display = "flex";

    document.getElementById("productModalTitle").textContent =
        "Add Product";

    document.getElementById("productId").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
}

function closeProductModal() {
    document.getElementById("productModal").style.display = "none";
}

async function editProduct(id) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`);

        if (!response.ok) {
            throw new Error("Product not found");
        }

        const data = await response.json();
        const product = data.product;

        document.getElementById("productId").value = product.id;
        document.getElementById("productName").value = product.name;
        document.getElementById("productPrice").value = product.price;

        document.getElementById("productModalTitle").textContent =
            "Edit Product";

        document.getElementById("productModal").style.display = "flex";

    } catch (error) {
        showMessage("Error loading product", "error");
    }
}

async function saveProduct() {
    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value;

    if (!name || price === "") {
        showMessage("Please fill all fields", "error");
        return;
    }

    const productData = {
        name: name,
        price: Number(price)
    };

    try {
        let response;

        if (id) {
            response = await fetch(`${API_URL}/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });
        } else {
            response = await fetch(`${API_URL}/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });
        }

        if (!response.ok) {
            throw new Error("Operation failed");
        }

        closeProductModal();

        showMessage(
            id
                ? "Product updated successfully"
                : "Product created successfully",
            "success"
        );

        loadProducts();

    } catch (error) {
        showMessage("Error saving product", "error");
    }
}

async function deleteProduct(id) {
    const confirmed = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        showMessage("Product deleted successfully", "success");

        loadProducts();

    } catch (error) {
        showMessage("Error deleting product", "error");
    }
}

function showMessage(text, type) {
    const message = document.getElementById("message");

    message.textContent = text;
    message.style.display = "block";

    if (type === "success") {
        message.style.background = "#16a34a";
    } else {
        message.style.background = "#dc2626";
    }

    setTimeout(() => {
        message.style.display = "none";
    }, 3000);
}