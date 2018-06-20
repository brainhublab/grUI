import React from 'react'
import enchanceWithClickOutside from 'react-click-outside'

class Dropdown extends React.Component {
  handleClickOutside() {
    this.props.handleBlur(this.props.menuId);
  }

  renderMenuItems(items, openItems, handleDropdownItemToggle, handleConnect) {
    console.log(items)
    let itemIds = Object.keys(items).sort();

    return itemIds.map((id, index) => {
      let item = items[id];
      return (
        <div key={id}>
          { (index !== 0) ? <div className="dropdown-divider"></div> : null }
          <a className={'dropdown-item' + (item.connected ? ' bg-success text-white' : '')} href="#" onClick={() => handleDropdownItemToggle(id)}>
            <strong>{item.name}</strong>
          </a>
          <div className={'dropdown-item-expansion collapse' + (openItems.indexOf(id) !== -1 ? ' show' : '')}>
            <div className="dropdown-message small">{item.address}</div>
            <br />
            <div className="col">
              <div className="row">
                <input type="button" className={'btn col' + (item.connected ? ' btn-danger' : ' btn-success')}
                  value={item.connected ? 'Disconnect' : 'Connect'} onClick={() => handleConnect(id)} />
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    let {menu, items, handleDropdownToggle, handleDropdownItemToggle, handleAutoConnect, handleConnect} = this.props
    return (
      <li className={'nav-item dropdown' + (menu.menuOpen ? ' show' : '')}>
        <a className="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={handleDropdownToggle}>
          <i className="fa fa-fw fa-connectdevelop"></i>
          <span>{menu.text}</span>
        </a>
        <div className={'dropdown-menu' + (menu.menuOpen ? ' show' : '')} aria-labelledby="messagesDropdown">
          {this.renderMenuItems(items, menu.openItems, handleDropdownItemToggle, handleConnect)}
          </div>
        </li>
    );
  }
}

export default enchanceWithClickOutside(Dropdown);
