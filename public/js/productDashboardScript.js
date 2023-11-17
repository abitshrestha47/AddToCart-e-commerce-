const table = document.getElementById("table");
const tableBody = document.getElementById("productTableBody");

//Submission of Product Form
const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", postProducts);
async function postProducts(e) {
  e.preventDefault();
  const formData = new FormData(productForm);
  try {
    const response = await fetch(`http://localhost:5000/products`, {
      method: "POST",
      body: formData,
    });
    console.log(response);
  } catch (err) {
    console.log(err.message);
  }
}
//end submission product form

//to get the all products
async function getProducts() {
  try {
    const response = await fetch(`http://localhost:5000/products`);
    const productData = await response.json();
    productData.forEach((product) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const priceCell = document.createElement("td");
      const quantityCell = document.createElement("td");
      const descriptionCell = document.createElement("td");
      const imageCell = document.createElement("td");
      const actionCell = document.createElement("td");

      nameCell.textContent = product.productName;
      priceCell.textContent = product.productPrice;
      quantityCell.textContent = product.productQuantity;
      descriptionCell.textContent = product.productDescription;
      const image = document.createElement("img");
      image.style.width = "90px";
      image.style.height = "90px";
      image.src = `http://localhost:5000/images/${product.productImage}`;
      imageCell.appendChild(image);

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.setAttribute("data-bs-toggle", "modal");
      editButton.setAttribute("data-bs-target", "#exampleModal");
      editButton.classList.add("btn", "btn-primary");
      editButton.setAttribute("data-product-id", product._id);

      editButton.addEventListener("click", function () {
        const tableRow = this.closest("tr");
        const productId = this.getAttribute("data-product-id");
        const productName =
          tableRow.querySelector("td:nth-child(1)").textContent;
        const productPrice =
          tableRow.querySelector("td:nth-child(2)").textContent;
        const productQuantity =
          tableRow.querySelector("td:nth-child(3)").textContent;
        const productDescription =
          tableRow.querySelector("td:nth-child(4)").textContent;
        const productImage = tableRow.querySelector("td:nth-child(5) img");
        const productImageSrc = productImage.getAttribute("src");

        document.getElementById("editProductName").value = productName;
        document.getElementById("editProductPrice").value = productPrice;
        document.getElementById("editProductQuantity").value = productQuantity;
        document.getElementById("editProductDescription").value =
          productDescription;
        document.getElementById("storedImage").src = productImageSrc;

        const initialData = {
          productName: productName,
          productDescription: productDescription,
          productImage: productImageSrc,
          productQuantity: productQuantity,
          productPrice: productPrice,
        };

        const updatedProductImage =
          document.getElementById("editProductImage");
        const updatedProductImageSrc = document.getElementById("storedImage");
        updatedProductImage.addEventListener("change", (e) => {
          const selectedFile = e.target.files[0];
          if (selectedFile) {
            const objectURL = URL.createObjectURL(selectedFile);
            updatedProductImageSrc.src = objectURL;
          } else {
            updatedProductImageSrc.src = productImageSrc;
          }
        });
        const submitEditButton = document.getElementById("editSaveBtn");
        submitEditButton.addEventListener("click", editProduct);
        async function editProduct() {
          //start of editProducts
          const updatedProductName =
            document.getElementById("editProductName").value;
          const updatedProductPrice =
            document.getElementById("editProductPrice").value;
          const updatedProductDescription = document.getElementById(
            "editProductDescription"
          ).value;
          const updatedProductQuantity = document.getElementById(
            "editProductQuantity"
          ).value;
          const updatedData = {
            productName: updatedProductName,
            productPrice: updatedProductPrice,
            productQuantity: updatedProductQuantity,
            productDescription: updatedProductDescription,
            productImage: updatedProductImageSrc.src,
          };
          const formData = new FormData();
          for (const field in updatedData) {
            if (updatedData[field] !== initialData[field]) {
              if (field === "productImage") {
                formData.append(
                  "productImage",
                  document.getElementById("editProductImage").files[0]
                );
              } else if (field === "productName") {
                formData.append("productName",updatedData[field]);
              } else if (field === "productPrice") {
                formData.append("productPrice", updatedData[field]);
              } else if (field === "productQuantity") {
                formData.append("productQuantity", updatedData[field]);
              } else if (field === "productDescription") {
                formData.append("productDescription", updatedData[field]);
              }
            }
          }
          // for (const entry of formData.entries()) {
          //   console.log(entry);
          // }
          try{
              const response=await fetch(`http://localhost:5000/products/${productId}`,{
                  method:'PATCH',
                  body:formData,
              });
              console.log(response);
          }catch(err){
              console.log(err.message);
          }
        }
        //end of editProducts
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("btn", "btn-danger");

      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);

      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(quantityCell);
      row.appendChild(descriptionCell);
      row.appendChild(imageCell);
      row.appendChild(actionCell);

      tableBody.appendChild(row);
    });
  } catch (err) {
    console.log(err.message);
  }
}
getProducts();
//end of getProducts
