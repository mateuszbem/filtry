import React,{Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash'
import {dane,setcategories,setcolors,setfiltered,setprice} from '../actions/actions'

const styles = {
    columnCount: 4
}

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        color: [],
        categ: [],
        prod: [],
        filters: [],
        price:[]
      }
    }
    componentDidMount(){
      this.props.dane();
    }
    handleColorChange = (event, index, values) => {
      this.props.setcolors(values);
      this.props.setfiltered(this.props.categories,values);
    }
    handleCategoryChange = (event, index, values) => {
      this.props.setcategories(values);
      this.props.setfiltered(values,this.props.colors);
    }
    handlePrice = (colo,item)=>{
      this.setState({price: colo})
      this.props.setprice(colo,item)
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
        checked={this.props.categories && this.props.categories.indexOf(item) > -1}
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
          checked={this.props.colors && this.props.colors.indexOf(item) > -1}
          value={item}
          primaryText={item}
        />
        ));
    }

    render() {
      const categ = _.union(this.props.data.map((value,key)=>{
        return value.category;
      }));
      const colors = _.union.apply(null,this.props.data.map((value,key)=>{
        return _.values(_.invert((value.color)))
      }));
      const orderedcolors = _.orderBy(colors,[],['asc']);

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
        
        <MuiThemeProvider>
          <div className="container">
            <div className="row"><br/></div>
            <div className="row">
              <div className="col-md-4">
                <SelectField
                  id="selectfield"
                  multiple={true}
                  hintText="CATEGORY"
                  value={this.props.categories}
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
                  value={this.props.colors}
                  onChange={this.handleColorChange}
                  selectionRenderer={this.colorsRender}
                >
                  {this.colorItems(orderedcolors)}
                </SelectField>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-12">
              <div class="card-deck" style={styles}>
                {
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
                })}
                </div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
  };
                  
function mapStateToProps(state){
  //console.log(state.filtr);
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
export default connect(mapStateToProps,mapDispatchToProps)(App);