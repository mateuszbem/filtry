import React,{Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash'
import {dane,setcategories,setcolors,setfiltered,setprice,setsearch} from '../actions/actions'
import  ProductCard  from '../containers/product_card';
import TopBar from '../components/topbar';
import LeftBar from '../components/leftbar';

const columns = {
    columnCount: 4
}
const styles = {
  customWidth: {
    width: '100%',
    marginBottom: '15%'
  },
};

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        price:[],
        search: []
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
    handleSearch = (event, index, values) => {
      console.log(this.props.filtered)
      this.setState({
        search: event.target.value
      })
      this.props.setsearch(event.target.value);
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
      return(
        <MuiThemeProvider>


        <TopBar/>
          <div className="container-fluid">
            <div className="row"><br/></div>
            <div className="row">
            <div className="col-md-2 col-lg-2 offset-2">
                <div className="row-fluid">
                  <h5>Categories</h5>
                  <SelectField
                  id="selectfield"
                  multiple={true}
                  hintText="CATEGORY"
                  value={this.props.categories}
                  onChange={this.handleCategoryChange}
                  selectionRenderer={this.categoriesRender}
                  style={styles.customWidth}
                  >
                  {this.categoryItems(categ)}
                </SelectField>
                <h5>Colors</h5>
                <SelectField
                  id="selectfield2"
                  multiple={true}
                  hintText="COLOR"
                  value={this.props.colors}
                  onChange={this.handleColorChange}
                  selectionRenderer={this.colorsRender}
                  style={styles.customWidth}
                >
                  {this.colorItems(orderedcolors)}
                </SelectField>

                <h5>Search</h5>
                <TextField
                  hintText="Name of product"
                  fullWidth={true}
                  value={this.state.search}
                  onChange={this.handleSearch}
                />
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div class="card-deck" style={columns}>
                  <ProductCard/>
                </div>
              </div>
            </div>
          </div>

          
        </MuiThemeProvider>
      );
    }
  };
                  
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
    setprice: setprice,
    setsearch: setsearch
  },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(App);