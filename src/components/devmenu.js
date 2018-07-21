import React from 'react'
import enchanceWithClickOutside from 'react-click-outside'

class Dropdown extends React.Component {
  handleClickOutside() {
    this.props.handleBlur(this.props.menuId);
  }

  renderMenuItems(items, handleDropdownItemClick) {
    console.log(items)
    let itemIds = Object.keys(items).sort();

    return itemIds.map((id, index) => {
      let item = items[id];
      return (
        <div key={id}>
          { (index !== 0) ? <div className="dropdown-divider"></div> : null }
          <a className="dropdown-item" href="#" onClick={() => handleDropdownItemClick(id)}>
            <strong>{item}</strong>
          </a>
        </div>
      )
    })
  }

  render() {
    let {menu, items, handleDropdownToggle, handleDropdownItemClick} = this.props
    return (
      <li className={'nav-item dropdown' + (menu.menuOpen ? ' show' : '')}>
        <a className="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={handleDropdownToggle}>
          <i className="fa fa-fw fa-connectdevelop"></i>
          <span>{menu.text}</span>
        </a>
        <div className={'dropdown-menu' + (menu.menuOpen ? ' show' : '')} aria-labelledby="messagesDropdown">
          {this.renderMenuItems(items, handleDropdownItemClick)}
          </div>
        </li>
    );
  }
}

export default enchanceWithClickOutside(Dropdown);
