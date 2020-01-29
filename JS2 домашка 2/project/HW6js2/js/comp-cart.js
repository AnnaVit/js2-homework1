Vue.component('cart', {
    props:[],
    data(){
        return{
            cartUrl: '/getBasket.json',
            isVisibleCart: false,
            cartBlock: [],            

        };
    },
    methods:{
        remove(product){
          console.log(product.id_product)
            if(product.quantity > 1){
              product.quantity --;
            }else{
              this.cartBlock.splice(this.cartBlock.indexOf(product),1);       
            }
          },
                 
    },

    mounted() {
        console.log(this)
        
        console.log(this.cartBlock)
        this.$root.getJson(`${API + this.cartUrl}`)
        .then(data => {
          for(let elem of data.contents){
            this.cartBlock.push(elem);
          }
        });
        
        
    },

    template:`  <div> 
                <slot></slot>

                <button @click="isVisibleCart=!isVisibleCart" class="btn-cart" type="button">Корзина</button>
                <div v-show="isVisibleCart" class="cart-block">
                <p v-if="!cartBlock.length">Корзина пуста</p>
                <product-cart class="product-cart" v-for="product of this.cartBlock" :key="product.id_product"
                :product-cart="product">
                </product-cart>

                </div>
                </div>
              `


});

Vue.component('product-cart', { 
  props:['productCart'],  
    data(){
        return{
            imgCatalog: 'https://placehold.it/200x150',

        };
    },
    mounted() {
      console.log(this);
    },

    
    template:  `    <div class=product-cart>
                    <img :src="imgCatalog" alt="Some img">
                    <div class="desc">
                        <h3>{{productCart.product_name}}</h3>
                        <p>{{productCart.price * productCart.quantity}}₽</p>
                        <p>{{productCart.quantity}}шт</p>
                        <button class="buy-btn" @click="$root.addProduct(productCart)">Добавить</button>
                        <button class="del-btn" @click="$parent.remove(productCart)">Удалить</button>
                    </div>
                    </div>
                `
                            });