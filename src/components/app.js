import React,{Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash'

const products = [
  {"id":1,"name":"Produkt1","category":"bags","color":["red","rose","green"]},
  {"id":2,"name":"Produkt2","surename":"Przybysz",	"category":"backpacks","color":["yellow","blue","brown"]},{"id":3,"name":"Produkt3","surename":"Przybysz",	"category":"bags","color":["red","rose","green"]},{"id":4,"name":"Produkt4","surename":"Przybysz",	"category":"accessories","color":["yellow","green","brown"]},{"id":5,"name":"Produkt5","surename":"Przybysz",	"category":"accessories","color":["white","black","brown"]},{"id":6,"name":"Produkt6","surename":"Przybysz",	"category":"accessories","color":["blue","white","black"]},{"id":7,"name":"Produkt7","surename":"Przybysz",	"category":"backpacks","color":["red","rose","green"]},{"id":8,"name":"Produkt8","surename":"Przybysz",	"category":"backpacks","color":["yellow","orange","brown"]}]

const colors = _.union.apply(null,products.map((value,key)=>{
  return value.color;
}));
const orderedcolors = _.orderBy(colors,[],['asc']);
const categ = _.union(products.map((value,key)=>{
  return value.category;
}));


export class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        color: [],
        categories: [],
        prod: products
      }
    }


    handleColorChange = (event, index, values) => {
      
      this.setState({
        color:values
      });

      let filter = values.map((item,index)=>{
        console.log(item);
        return _.filter(products, { 'color' : item })
      })
      var merged = [].concat.apply([], filter);
      this.setState({
        prod:merged
      })
    }
    handleCategoryChange = (event, index, values) => {
      
      this.setState({
        categories:values
      });

      let filter = values.map((item,index)=>{
        return _.filter(products, { 'category' : item })
      })
      var merged = [].concat.apply([], filter);
      this.setState({
        prod:merged
      })
      
      
    }

    categoriesRender = (values) => {
      switch (values.length) {
        case 0:
          return '';
        default:
          return "CATEGORIES"
      }
      
    }
    colorsRender = (values) => {
      switch (values.length) {
        case 0:
          return '';
        default:
          return "COLOR"
      }
    }

    categoryItems(items) {
      return items.map((item) => (
      <MenuItem
        key={item}
        insetChildren={true}
        checked={this.state.categories.indexOf(item) > -1}
        value={item}
        primaryText={item}
      />
      ));
    }
    colorItems(items) {
      return items.map((item) => (
      <MenuItem
        key={item}
        insetChildren={true}
        checked={this.state.color.indexOf(item) > -1}
        value={item}
        primaryText={item}
      />
      ));
    }

    render() {
      return(
        
        <MuiThemeProvider>
          <div className="container">
            <div className="row"><br/></div>
            <div className="row">
              <div className="col-md-4">
                <SelectField
                  id="selectfield"
                  multiple={true}
                  hintText="CATEGORY"
                  value={this.state.categories}
                  onChange={this.handleCategoryChange}
                  selectionRenderer={this.categoriesRender}
                >
                  {this.categoryItems(categ)}
                </SelectField>
              </div>
              <div className="col-md-4">
                <SelectField
                  id="selectfield2"
                  multiple={true}
                  hintText="COLOR"
                  value={this.state.color}
                  onChange={this.handleColorChange}
                  selectionRenderer={this.colorsRender}
                >
                  {this.colorItems(orderedcolors)}
                </SelectField>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
              <div class="card-columns">
                {this.state.prod.map((item,key)=>{
                  return (
                    <div className="card text-center" style={{  }}>
                    <img className="card-img-top" src="http://via.placeholder.com/350x150" alt="Card image cap"/>
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.category}</p>
                      <p className="card-text"><small class="text-muted">{item.color.join(', ')}</small></p>
                    </div>
                    </div>
                  )
                })}
                </div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
  };
                  
