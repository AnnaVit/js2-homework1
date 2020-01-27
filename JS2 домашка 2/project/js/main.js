'use strict';
/*1. Добавьте стили для верхнего меню, товара, 
списка товаров и кнопки вызова корзины.
2. Добавьте значения по умолчанию для аргументов функции.
 Как можно упростить или сократить запись функций?
3. *Сейчас после каждого товара на странице выводится запятая.
 Из-за чего это происходит? Как это исправить?
 Происходит из-за метода map, который возвращает массив. Чтоб такого не было,
 я бы использовала forEach, но можно использовать метод join()  */

/*const products = [
  {id: 1, title: 'Notebook', price: 20000},
  {id: 2, title: 'Mouse', price: 1500},
  {id: 3, title: 'Keyboard', price: 5000},
  {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price,img = 'img/imgholdr-image.png') => {
  return `<div class="product-item">
            <img src=${img}>
            <h4>${title}</h4>
            <p>${price} руб</p>
            <button class="by-btn">Добавить в корзину</button>
          </div>`;
};

const renderProducts = list => {
  const productList = list.map(item => renderProduct(item.title, item.price, item.img)).join('');
  document.querySelector('.products').innerHTML = productList;

};

renderProducts(products);*/

class ProductList {
    constructor(container = '.products'){
      this.container = container;
      this.goods = [];//сначала мы не можем получить данные, тут товары, котбудут приходить к нам с сервера
      this.allProducts = [];//тут будут готовые экземпляры товаров
      this._fetchProducts();
      this.render();
      this.sum();
    }
    _fetchProducts(){
      this.goods = [
        {id: 1, title: 'Notebook', price: 20000},
        {id: 2, title: 'Mouse', price: 1500},
        {id: 3, title: 'Keyboard', price: 5000},
        {id: 4, title: 'Gamepad', price: 4500},
      ];
    }
    render(){
      const block = document.querySelector(this.container);
      for(let product of this.goods){
        const productObject = new ProductItem(product);
        this.allProducts.push(productObject);
        block.insertAdjacentHTML('beforeend', productObject.render());
      }
    }
    sum(){
      const catalogSumm = this.allProducts.reduce((total, item) =>{
        return total + item.price;
      }, 0)
      console.log(catalogSumm);
    } 
}

class ProductItem {
  constructor(product, img = 'img/imgholdr-image.png'){
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }
  render(){
    return  `<div class="product-item" data-id = ${this.id}>
              <img src=${this.img} alt = "Some img">
                <div class="desc">
                  <h4>${this.title}</h4>
                  <p>${this.price} \u20bd</p>
                  <button class="by-btn">Добавить в корзину</button>
                </div>
            </div>`;
  }
}

const list = new ProductList();
