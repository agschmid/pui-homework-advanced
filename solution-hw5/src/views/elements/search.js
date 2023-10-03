import React, { Component } from 'react';
import './search.css';


//Component for a roll, its price, and options, as would be shown on the products page
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };    
  }

  render() {
    return (
      <div className='searchParent'>
        <form className='searchForm'>
          <input type="text" name="search"/>
          <button className='bold hover-hl'>Search</button>
          {/* TODO: IMPROVE THE CSS SEPARATION WITH ITEM-CHOICE */}
          <select name='searchSort' className="item-choice" onChange={(e) => this.props.sortRolls(e.target.value)}> 
            <option value="name">Name</option>
            <option value="base">Base Price</option>
          </select>
        </form>

      </div>
    ) 
  }
}

export default Search