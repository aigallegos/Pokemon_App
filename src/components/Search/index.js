import { Component } from 'react';
import PropTypes from "prop-types";
import './styles.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => { }
  }

  handleChange(event) {
    const { onChange } = this.props;
    onChange(event);
  }

  render() {
    return (
      <div className="Search">
        Search for Pokemon...
        <br></br>
        <input className="Search-input" onChange={this.handleChange} id = 'searchbar' />
      </div>
    );
  }
}

export default Search;