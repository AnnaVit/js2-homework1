'use strict';
/*1. Добавьте стили для верхнего меню, товара, 
списка товаров и кнопки вызова корзины.
2. Добавьте значения по умолчанию для аргументов функции.
 Как можно упростить или сократить запись функций?
3. *Сейчас после каждого товара на странице выводится запятая.
 Из-за чего это происходит? Как это исправить?
 Происходит из-за метода map, который возвращает массив. Чтоб такого не было,
 я бы использовала forEach, но можно использовать метод join()  */

const products = [
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

renderProducts(products);
