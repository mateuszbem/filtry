import React,{Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SelectField from 'material-ui/SelectField';
import _ from 'lodash'
import {dane,setcategories,setcolors,setfiltered,setprice} from '../actions/actions'

class ProductCard extends React.Component{
    handlePrice = (colo,item)=>{
        this.setState({price: colo})
        this.props.setprice(colo,item)
    }
    render(){
        if(this.props.colors.length>0&&this.props.categories.length>0&&this.props.filtered.length==0){
            var select = this.props.filtered
        }
        else if(this.props.filtered==0){
            var select = this.props.data
        }
        else{
            var select = this.props.filtered
        }
        return(
            select.map((item,key)=>{
                const colors_array =  (_.values(_.invert(item.color))).map((x)=>x);
                return (
                  <div className="col-sm-12 col-md-4" style={{marginBottom:'2%',paddingLeft:0,paddingRight:0}}>
                  <div className="card text-center">
                  <img className="card-img-top" src="http://via.placeholder.com/350x150" alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.category.toUpperCase()}</p>
                    <p className="card-text">{item.price}</p>
                    <p className="card-text">{colors_array.map((colo)=><span onClick={(e)=> {this.handlePrice(colo,item)}} style={{backgroundColor: colo,margin:2,borderRadius:20,border:'1px solid',padding:'0 5% 0 5%'}}></span>)}</p>
                    </div>
                  </div>
                  </div>
                )
            })
        )
    }
}
function mapStateToProps(state){
    return{
      data : state.filtr.data,
      categories: state.filtr.categories,
      colors: state.filtr.colors,
      filtered: state.filtr.filtered,
      price: state.filtr.price
    }
  }
  function mapDispatchToProps(dispatch){
    return bindActionCreators({
      dane:dane,
      setcategories:setcategories,
      setcolors:setcolors,
      setfiltered:setfiltered,
      setprice: setprice
    },dispatch)
  }
  export default connect(mapStateToProps,mapDispatchToProps)(ProductCard);