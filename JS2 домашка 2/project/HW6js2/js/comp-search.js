Vue.component('search-form', {
   
    data(){
        return {
            search: '',
        }
    },
    methods: {
        filter(search){

            let regExp = new RegExp (search, 'i');
            this.$root.products = this.$root.products_in.filter(item => regExp.test(item.product_name));
      
          }
    },
    template:`<form action="#" class="search-form">
                 <input type="text" class="search-field" v-model.trim="search">
                 <button @click="filter(search)" class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                 </button>
            </form>`
        
});