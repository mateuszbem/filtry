import _ from 'lodash'

const products = [{"id":1,"name":"Produkt1","category":"bags","color":{"red":"$100","pink":"$200","black":"$300"},"price":"$120"},{"id":2,"name":"Produkt2","category":"accessories","color":{"yellow":"$100","orange":"$200","blue":"$300"},"price":"$130"},{"id":3,"name":"Produkt3","category":"backpacks","color":{"green":"$100","yellow":"$200","blue":"$300"},"price":"$100"},{"id":4,"name":"Produkt4","category":"backpacks","color":{"white":"$100","orange":"$200","blue":"$300"},"price":"$50"},{"id":5,"name":"Produkt5","category":"bags","color":{"green":"$100","yellow":"$200","blue":"$300"},"price":"$150"},{"id":6,"name":"Produkt6","category":"backpacks","color":{"green":"$100","yellow":"$200","blue":"$300"},"price":"$100"},{"id":7,"name":"Produkt7","category":"accessories","color":{"green":"$100","red":"$200","yellow":"$300"},"price":"$230"},{"id":8,"name":"Produkt8","category":"backpacks","color":{"red":"$100","yellow":"$200","blue":"$300"},"price":"$40"}];

export const dane = () =>{
    return{
        type: 'SHOW_PRODUCTS',
        payload: products
    }
}
export const setcategories = (values) =>{
    return{
        type: 'SET_CATEGORIES',
        payload: values
    }
}
export const setcolors = (values) =>{
    return{
        type: 'SET_COLORS',
        payload: values
    }
}
export const setprice = (color,item) =>{
    const color_price = item.color;
    const y = (Object.entries(color_price)).map((x)=>{
      if(x[0]==color){
        return x[1]
      }
    })
    const price_clicked=_.compact(y)[0];
    products[item.id-1].price=price_clicked
    return{
        type: 'SET_PRICE',
        payload: products
    }
}

export const setfiltered = (category,colors) =>{
    const prod = products.map((item)=>{
        return item.color
    })
    const col = colors.map((item,index)=>{
        var x =_.filter(products, function(o)
        {
            var y = _.values(_.invert(o.color))
            return _.includes(y,item)
        })
        return x;
        //return _.filter(_.invert(prod),  item )
    })
    const cat = category.map((item,index)=>{
        return _.filter(products, { 'category' : item })
    })
    const col_all = _.union([].concat.apply([], col));
    const cat_all = _.union([].concat.apply([], cat));

    if(col_all==0){
        var sum = cat_all;
    }
    else if (cat_all==0){
        var sum = col_all;
    }
    else{
       var sum =  _.intersection(col_all,cat_all)
    }
    var merged = [].concat.apply([], sum);
    return{
        type: 'SHOW_PRODUCTS_FILTERED',
        payload: merged
    }
}