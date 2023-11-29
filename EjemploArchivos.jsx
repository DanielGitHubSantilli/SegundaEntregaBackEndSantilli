const fs = require('fs');

class ProductManager {
    static correlativoId = 0;
    path;
    products;

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    addProduct(product) {
        product.id = ++ProductManager.correlativoId;
        this.products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    getProducts() {
        this.products = JSON.parse(fs.readFileSync(this.path));
        return this.products;
    }

    getProductById(id) {
        this.products = JSON.parse(fs.readFileSync(this.path));
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        this.products = this.getProducts();
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            updatedProduct.id = id;
            this.products[index] = updatedProduct;
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }

    deleteProduct(id) {
        this.products = this.getProducts();
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }
}