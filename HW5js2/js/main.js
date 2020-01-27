const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



/*const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',
  },
  methods: {
    getJson(url) {
      return fetch(url)
          .then(result => result.json())
          .catch(error => {
            console.log(error);
          });
    },
    addProduct(product) {
      console.log(product.id_product);
    },
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
    this.getJson(`${API + this.catalogUrl}`)
        .then(data => {
          for (let el of data) {
            this.products.push(el);
          }
        });

    setTimeout(() => this.$destroy(), 2000)
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  destroyed() {
    console.log('destroyed');
  },
});*/
/*1. Добавить методы и обработчики событий для поля поиска.
 Создать в объекте данных поле searchLine и привязать к нему содержимое поля ввода. 
 На кнопку «Искать» добавить обработчик клика, вызывающий метод FilterGoods.
2. Добавить корзину. В html-шаблон добавить разметку корзины. 
   Добавить в объект данных поле isVisibleCart, управляющее видимостью корзины.
3. *Добавлять в .goods-list заглушку с текстом «Нет данных» в случае, если список товаров пуст.*/

const app = new Vue({
  el: '#app',
  data:{
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    products_in: [],
    products:[],
    imgCatalog: 'https://placehold.it/200x150',
    search: '',
    isVisibleCart: false,
    cartBlock: [],
  },

  methods:{
    getJson(url){
      return fetch(url)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      });

    }, 
    addProduct(product){

      let inCart = this.cartBlock.find(item => item.id_product === product.id_product)
      let elemCart = this.cartBlock.some(item => item.id_product === product.id_product);
      if(elemCart === true){
        inCart.quantity++;
      }else{
        let prod = Object.assign({quantity: 1}, product);
       // product.quantity = 1;
        this.cartBlock.push(prod);
      }     
    },

    remove(product){
      if(product.quantity > 1){
        product.quantity --;
      }else{
        this.cartBlock.splice(this.cartBlock.indexOf(product),1);       
      }
    },
    
    filter(search){

      let regExp = new RegExp (search, 'i');
      this.products = this.products_in.filter(item => regExp.test(item.product_name));

    } 

  },

  mounted(){
    this.getJson(`${API + this.catalogUrl}`)
    .then(data => {
      for(let el of data) {
        this.products_in.push(el);
        this.products.push(el);
      }
    })

    this.getJson(`${API + this.cartUrl}`)
    .then(data => {
      for(let elem of data.contents){
        this.cartBlock.push(elem);
      }
    })
  }



});
