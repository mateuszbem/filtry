import React,{Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash'
import {dane,setcategories,setcolors,setfiltered} from '../actions/actions'


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        color: [],
        categ: [],
        prod: [],
        filters: []
      }
    }
    componentDidMount(){
      this.props.dane();
      
      //this.props.setcategories(); oczekuje parametru
    }
    // componentWillUpdate(nextProps, nextState){
    //   console.log(nextProps,nextState)
    // }
    handleColorChange = (event, index, values) => {
      this.props.setcolors(values);
      this.props.setfiltered(this.props.categories,values);
    }
    handleCategoryChange = (event, index, values) => {
      this.props.setcategories(values);
      this.props.setfiltered(values,this.props.colors);
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
        return value.color;
      }));
      const orderedcolors = _.orderBy(colors,[],['asc']);

      if(this.props.filtered==0){
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
              <div className="col-md-12">
              <div class="card-columns">
                {
                  select.map((item,key)=>{
                  return (
                    <div className="card text-center">
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
                  
function mapStateToProps(state){
  //console.log(state.filtr);
  return{
    data : state.filtr.data,
    categories: state.filtr.categories,
    colors: state.filtr.colors,
    filtered: state.filtr.filtered
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    dane:dane,
    setcategories:setcategories,
    setcolors:setcolors,
    setfiltered:setfiltered
  },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(App);