// document.addEventListener('DOMContentLoaded', () => {
//     const quantityInput = document.getElementById('quantity');
//     const priceInput = document.getElementById('price');
//     const discountInput = document.getElementById('discount');
//     const totalInput = document.getElementById('total');
//     const productForm = document.getElementById('productForm');

//     // Function to calculate total
//     function calculateTotal() {
//         const quantity = parseFloat(quantityInput.value) || 0;
//         const price = parseFloat(priceInput.value) || 0;
//         const discount = parseFloat(discountInput.value) || 0;

//         let total = (quantity * price) - discount;
//         if (total < 0) {
//             total = 0;
//         }
//         totalInput.value = total.toFixed(2);
//     }

//     // Add event listeners for input changes
//     quantityInput.addEventListener('input', calculateTotal);
//     priceInput.addEventListener('input', calculateTotal);
//     discountInput.addEventListener('input', calculateTotal);

//     // Initial calculation in case there are pre-filled values
//     calculateTotal();

//     // Handle form submission (for demonstration, just logs data)
//     productForm.addEventListener('submit', (event) => {
//         event.preventDefault(); // Prevent default form submission

//         const formData = new FormData(productForm);
//         const data = {};
//         for (const [key, value] of formData.entries()) {
//             data[key] = value;
//         }

//         console.log('Form Submitted Data:', data);
//         alert('Product data submitted! Check console for details.');

//         // Here you would typically send `data` to your backend API
//         // and then potentially update the product list table
//         productForm.reset(); // Clear the form after submission
//         calculateTotal(); // Reset total after clearing
//     });

//     // Handle Cancel button click
//     const cancelBtn = document.querySelector('.cancel-btn');
//     cancelBtn.addEventListener('click', () => {
//         productForm.reset(); // Clear all form fields
//         calculateTotal(); // Reset total after clearing
//         console.log('Form Cancelled');
//     });

//     // Handle Edit button click (for demonstration)
//     const editBtn = document.querySelector('.edit-btn');
//     editBtn.addEventListener('click', () => {
//         alert('Edit button clicked! In a real application, this would enable editing of table rows or open an edit modal.');
//         console.log('Edit button clicked');
//         // You would add logic here to enable editing the table rows
//         // or redirect to an edit page/modal.
//     });
// });












document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantity');
    const priceInput = document.getElementById('price');
    const discountInput = document.getElementById('discount');
    const totalInput = document.getElementById('total');
    const productForm = document.getElementById('productForm');
    const productTableBody = document.getElementById('productTableBody');
    const cancelBtn = document.querySelector('.cancel-btn');
    const toggleEditModeBtn = document.getElementById('toggleEditMode');
    const productTable = document.querySelector('.product-table');
    const noDataMessage = document.getElementById('noDataMessage');

    let isEditMode = false;
    let products = []; // Array to store product data

    // Function to calculate total and ensure valid numbers
    function calculateTotal() {
        // Use parseFloat and default to 0 if NaN to prevent issues
        const quantity = parseFloat(quantityInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        const discount = parseFloat(discountInput.value) || 0;

        let total = (quantity * price) - discount;
        if (total < 0) {
            total = 0; // Prevent negative total
        }
        totalInput.value = total.toFixed(2); // Format to 2 decimal places
    }

    // Function to render products into the table
    function renderProducts() {
        productTableBody.innerHTML = ''; // Clear existing rows
        if (products.length === 0) {
            noDataMessage.style.display = 'block';
            // Ensure edit mode is off if no data and reset button text
            productTable.classList.remove('edit-mode');
            toggleEditModeBtn.textContent = 'Edit';
            isEditMode = false;
            return; // Exit function if no products
        } else {
            noDataMessage.style.display = 'none';
        }

        products.forEach((product, index) => {
            const row = productTableBody.insertRow();
            row.dataset.index = index; // Store index for easy access

            // Ensure numbers are formatted for display
            const displayedPrice = `$ ${product.price.toFixed(2)}`;
            const displayedDiscount = `${product.discount.toFixed(0)}%`; // Format as percentage
            const displayedTotal = `$ ${product.total.toFixed(2)}`;

            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${displayedPrice}</td>
                <td>${displayedDiscount}</td>
                <td>${displayedTotal}</td>
                <td>${product.category}</td>
                <td class="action-column">
                    <div class="action-buttons">
                        <button class="edit-action-btn" data-action="edit"><i class="fas fa-edit"></i></button>
                        <button class="delete-action-btn" data-action="delete"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            `;
        });

        // Re-apply edit mode class after rendering to correctly show/hide action column
        if (isEditMode) {
            productTable.classList.add('edit-mode');
        } else {
            productTable.classList.remove('edit-mode');
        }
    }

    // Add event listeners for input changes
    quantityInput.addEventListener('input', calculateTotal);
    priceInput.addEventListener('input', calculateTotal);
    discountInput.addEventListener('input', calculateTotal);

    // Initial calculation and rendering on page load
    calculateTotal();
    renderProducts(); // Initially render an empty table (or any pre-existing data)

    // Handle form submission
    productForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form data and ensure correct data types
        const newProduct = {
            name: document.getElementById('name').value,
            id: document.getElementById('id').value,
            category: document.getElementById('category').value,
            quantity: parseFloat(document.getElementById('quantity').value) || 0,
            price: parseFloat(document.getElementById('price').value) || 0,
            discount: parseFloat(document.getElementById('discount').value) || 0,
            total: parseFloat(document.getElementById('total').value) || 0 // Ensure total is also a number
        };

        // Validate required fields before adding
        if (!newProduct.name || !newProduct.id || !newProduct.category || newProduct.quantity === 0 || newProduct.price === 0) {
            alert('Please fill in all required fields (Name, ID Code, Category, Quantity, Price) and ensure Quantity and Price are not zero.');
            return;
        }

        products.push(newProduct);
        renderProducts(); // Update the table

        console.log('Product Added:', newProduct);
        alert('Product added successfully!');
        productForm.reset(); // Clear the form
        calculateTotal(); // Reset total after clearing
    });

    // Handle Cancel button click
    cancelBtn.addEventListener('click', () => {
        const confirmClear = confirm("Are you sure you want to clear the form data?");
        if (confirmClear) {
            productForm.reset(); // Clear all form fields
            calculateTotal(); // Reset total after clearing
            console.log('Form Cancelled and Cleared');
        } else {
            console.log('Form Clear Cancelled');
        }
    });

    // Toggle Edit Mode for the table
    toggleEditModeBtn.addEventListener('click', () => {
        // Only allow toggling if there are products to edit
        if (products.length === 0 && !isEditMode) {
            alert('No products to edit. Please add products first.');
            return;
        }

        isEditMode = !isEditMode;
        if (isEditMode) {
            productTable.classList.add('edit-mode');
            toggleEditModeBtn.textContent = 'Done Editing';
        } else {
            productTable.classList.remove('edit-mode');
            toggleEditModeBtn.textContent = 'Edit';
        }
        renderProducts(); // Re-render to ensure action column visibility is correct
        console.log('Edit Mode:', isEditMode);
    });

    // Handle Edit/Delete actions on table rows (event delegation)
    productTableBody.addEventListener('click', (event) => {
        if (!isEditMode) return; // Only allow actions in edit mode

        const targetButton = event.target.closest('button');
        if (!targetButton) return; // Not a button

        const action = targetButton.dataset.action;
        const row = targetButton.closest('tr');
        const index = parseInt(row.dataset.index);

        if (action === 'edit') {
            const productToEdit = products[index];

            // Populate form with data from the row for editing
            document.getElementById('name').value = productToEdit.name;
            document.getElementById('id').value = productToEdit.id;
            document.getElementById('category').value = productToEdit.category;
            document.getElementById('quantity').value = productToEdit.quantity;
            document.getElementById('price').value = productToEdit.price;
            document.getElementById('discount').value = productToEdit.discount;
            // Total will auto-calculate when other fields are populated due to input listeners

            // Remove the edited item from the array (it will be added back as an updated item on submit)
            // This is one common pattern for "edit in form, then resubmit"
            products.splice(index, 1);
            renderProducts(); // Re-render table without the item being edited
            alert('Product data loaded into form for editing. Please modify and click Submit to update.');

            // After loading for edit, switch off edit mode in table but keep form active
            isEditMode = false;
            productTable.classList.remove('edit-mode');
            toggleEditModeBtn.textContent = 'Edit';

        } else if (action === 'delete') {
            const confirmDelete = confirm(`Are you sure you want to delete product "${products[index].name}" (ID: ${products[index].id})?`);
            if (confirmDelete) {
                products.splice(index, 1); // Remove the product from the array
                renderProducts(); // Update the table
                alert('Product deleted successfully!');
            }
        }
    });
});