class Basket {
    constructor(container){
        this.container = container;
        this.cartList = {}//сюда будут падать товары из кэш
        this.productList = []// тут будет распарсеный список товаров
    }
    analysis(){
        //метод для распарсивания))))
    }
    render(){
        //рендерим общий вид корзины
    }
    totalCart(){
        //посчитать сумму товаров через метот reduce
    }
    remove(){
        //метод для удаления товаров из корзины
    }


}
class ProductItem{
    constructor(product){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
    }
    render(){
       //рендерим один товар
    }
    quantity(){
        //изменение количества товаров
    }
}

class UpSale{
    constructor(){

    }
}