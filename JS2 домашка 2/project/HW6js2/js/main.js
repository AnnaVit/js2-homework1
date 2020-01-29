const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/*1. Добавить методы и обработчики событий для поля поиска.
 Создать в объекте данных поле searchLine и привязать к нему содержимое поля ввода. 
 На кнопку «Искать» добавить обработчик клика, вызывающий метод FilterGoods.
2. Добавить корзину. В html-шаблон добавить разметку корзины. 
   Добавить в объект данных поле isVisibleCart, управляющее видимостью корзины.
3. *Добавлять в .goods-list заглушку с текстом «Нет данных» в случае, если список товаров пуст.

1. Вынести поиск в отдельный компонент-done.
2. Вынести корзину в отдельный компонент-done.
3. *Создать компонент с сообщением об ошибке. Компонент должен отображаться, когда не удаётся выполнить запрос к серверу.*/

const app = new Vue({
  el: '#app',
  data:{
    catalogUrl: '/catalogData.json',
    products_in: [],
    products:[],
    imgCatalog: 'https://placehold.it/200x150',

  },

  methods:{
    getJson(url){
      return fetch(url)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
        console.log('ВСЁ СЛОМАЛОСЬ');
      });

    }, 
    addProduct(product){
      console.log(product.id_product)
      let inCart = this.$root.$refs.cart.cartBlock.find(item => item.id_product === product.id_product)
      let elemCart = this.$root.$refs.cart.cartBlock.some(item => item.id_product === product.id_product);
      if(elemCart === true){
        inCart.quantity++;
      }else{
        let prod = Object.assign({quantity: 1}, product);
       this.$root.$refs.cart.cartBlock.push(prod);
      }     
    },

  },

  mounted(){
    this.getJson(`${API + this.catalogUrl}`)
    .then(data => {
      for(let el of data) {
        this.products_in.push(el);
        this.products.push(el);
      }
    })

  }



});
