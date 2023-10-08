import React, { Component } from 'react';
import './search.css';


//Component for the search area
class Search extends Component {
  render() {
    return (
      <div className='searchParent'>
          <input type="text" name="search" id="rollSearchBar"  onChange={(e) => this.props.updateSearchQuery(e)}/>
          <button className='bold hover-hl' onClick={() => this.props.searchRolls()}>Search</button>
          <select name='searchSort' className="item-choice" onChange={(e) => this.props.sortRolls(e.target.value)}> 
            <option value="name">Name</option>
            <option value="base">Base Price</option>
          </select>
      </div>
    ) 
  }
}

export default Search