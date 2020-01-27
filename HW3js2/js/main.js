'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
/*2. Добавьте в соответствующие классы методы добавления товара в корзину,
 удаления товара из корзины и получения списка товаров корзины.*/

class List {
  constructor(container, url, list = dictionary){
    this.list = list;
    this.container = container;
    this.url = url;
    this.goods = [];
    this.allProducts = [];
    this._getProducts(url)
    this.render();
    this.actionButton();
  }

  _getProducts(url){
    return fetch(url)
    .then(result => result.json())
    .catch(error => {
      console.log(error);
    })

  }
  handleData(data){
      this.goods = [...data];
      this.render();
    }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new this.list[this.constructor.name](product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  actionButton(){
    document.querySelector(this.container).addEventListener('click', event =>{
      console.log(this.constructor.name);
      const button = event.target.className;
      const productID = +event.target.dataset.id_product;
      const product = this.allProducts.find(item =>item.id_product===productID);

      switch(button){
        case 'buy-btn':
          this.addToCart(productID, product);
          break;

        case 'del-btn':
          this.remove(product);
      }
    })
    
  }

  remove(product){
    const productIndex = cart.allProducts.findIndex(item => product.id_product === item.id_product);  
    if (product.quantity > 1){
          product.quantity --;
          this.update(product);
    }else{
      cart.allProducts.splice(productIndex,1);
      document.querySelector(`.product-item[data-id_product="${product.id_product}"]`).remove();     
    }
    }
  

  addToCart(productID, product){

    console.log(product);

      if(this.constructor.name === 'ProductList'){
        let elem = cart.allProducts.some(function(item){
          return item.id_product===productID;
          })
        let elemCart = cart.allProducts.find(item =>item.id_product===productID);
            if(elem === false){
              product.quantity = 1;
              cart.allProducts.push(product);
              let product2 = new CartItem(product);
              let cartBlock = document.querySelector('#cart-block');
              cartBlock.insertAdjacentHTML('beforeend', product2.render());

              
              console.log(cart.allProducts)            
            }else{
              elemCart.quantity++; 
              console.log(product); 
              this.update(elemCart);      
            }
      }else{
        if(product.quantity >= 1){
          product.quantity++;
          this.update(product)
        }
      }
  }
  update(elem){
    let upElem = document.querySelector(`.product-item[data-id_product="${elem.id_product}"]`);
    upElem.querySelector('.product-quantity').textContent = `${elem.quantity} шт.`;
    upElem.querySelector('.product-price').textContent = `${elem.quantity*elem.price} \u20bd`;
  }   
}


class Item{
  constructor(product, img){
    this.product = product;
    this.img = img;
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
    this.render();

  }
  render() {
    return `<div class="product-item" data-id_product="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price}\u20bd</p>
                    <button class="buy-btn" data-id_product="${this.id_product}">Купить</button>
                </div>
            </div>`;
  }

}

class ProductList extends List{

    constructor(cart, container = '.products', url ="https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json"){
      super(container, url);
      this.cart = cart;
      this._getProducts(this.url)
          .then(data => this.handleData(data));
    
  }
}

class ProductItem extends Item{
  constructor(product, img = 'https://placehold.it/200x150'){
    super(product, img);
    this.render();
  }
}
class Cart extends List{
  constructor(container = '#cart-block', url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses//getBasket.json'){
    super(container, url);
    this._getProducts(this.url)
    .then(data => this.handleData(data));
    this.render();
  }
  handleData(data){
    this.goods = [...data.contents];
    this.render();
  }  
}

class CartItem extends Item{
  constructor(product, img = 'https://placehold.it/200x150'){
    super(product, img);
    this.quantity = product.quantity;
    this.render();
  }
  render(){
    return `<div class="product-item" data-id_product="${this.id_product}">
    <img src="${this.img}" alt="Some img">
    <div class="desc">
        <h3>${this.product_name}</h3>
        <div class="product-item-sum">
        <p class = "product-price">${this.price} \u20bd</p>
        <p class = "product-quantity">${this.quantity} шт</p>
        </div>
        <div class="product-button">
        <button class="buy-btn" data-id_product="${this.id_product}">Добавить</button>
        <button class="del-btn" data-id_product="${this.id_product}">Удалить</button>
        </div>
    </div>
</div>`;
 }
}
const dictionary = {
  ProductList: ProductItem,
  Cart: CartItem
}

const cart = new Cart();
const list = new ProductList(cart);