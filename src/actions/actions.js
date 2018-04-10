import _ from 'lodash'

const products = [
    {"id":1,"name":"Produkt1","category":"bags","color":["red","rose","green"]},{"id":2,"name":"Produkt2","category":"backpacks","color":["yellow","blue","brown"]},{"id":3,"name":"Produkt3","category":"bags","color":["blue","rose","green"]},{"id":4,"name":"Produkt4","category":"accessories","color":["yellow","green","brown"]},{"id":5,"name":"Produkt5","category":"accessories","color":["white","black","brown"]},{"id":6,"name":"Produkt6","category":"accessories","color":["blue","white","black"]},{"id":7,"name":"Produkt7","category":"backpacks","color":["red","rose","green"]},{"id":8,"name":"Produkt8","category":"backpacks","color":["yellow","orange","brown"]}]

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
export const setfiltered = (category,colors) =>{
    
    const col = colors.map((item,index)=>{
        return _.filter(products, { 'color' : [item] })
    })
    const cat = category.map((item,index)=>{
        return _.filter(products, { 'category' : item })
    })
    const col_all = _.union([].concat.apply([], col));
    const cat_all = _.union([].concat.apply([], cat));
    //const all = _.union([...new Set([...col_all, ...cat_all])]);

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