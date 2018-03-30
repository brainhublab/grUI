import React from 'react'
import enchanceWithClickOutside from 'react-click-outside'

class Dropdown extends React.Component {
  handleClickOutside() {
    this.props.handleBlur(this.props.menuId);
  }

  render() {
    let {menuId, menuOpen, text, items, handleDropdownToggle, handleDropdownItemToggle, handleAutoConnect, handleConnect} = this.props
    return (
      <li className={'nav-item dropdown' + (menuOpen ? ' show' : '')}>
        <a className="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => handleDropdownToggle(menuId)}>
          <i className="fa fa-fw fa-connectdevelop"></i>
          <span>{text}</span>
        </a>
        <div className={'dropdown-menu' + (menuOpen ? ' show' : '')} aria-labelledby="messagesDropdown">
          {items.map((el, index) => (
            <div key={index}>
              { (index !== 0) ? <div className="dropdown-divider"></div> : null }
              <a className={'dropdown-item' + (el.connected ? ' bg-success text-white' : '')} href="#" onClick={() => handleDropdownItemToggle(menuId, index)}>
                <strong>{el.name}</strong>
              </a>
              <div className={'dropdown-item-expansion collapse' + (el.expanded ? ' show' : '')}>
                <div className="dropdown-message small">{el.info}</div>
                <br />
                <div className="col">
                  <div className="row">
                    <input type="button" className={'btn col' + (el.connected ? ' btn-danger' : ' btn-success')}
                      value={el.connected ? 'Disconnect' : 'Connect'} onClick={() => handleConnect(menuId, index)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </li>
    );
  }
}

const EnhancedDropdown = enchanceWithClickOutside(Dropdown);

const Topbar = ({topbar, handleDropdownToggle, handleDropdownItemToggle, handleBlur, handleAutoConnect, handleConnect}) => (
  <ul className="navbar-nav ml-auto">
    {topbar.map((el, index) => (
      <EnhancedDropdown
        key={index}
        menuId={index}
        menuOpen={el.menuOpen}
        text={el.text}
        items={el.items}
        handleDropdownToggle={handleDropdownToggle}
        handleDropdownItemToggle={handleDropdownItemToggle}
        handleAutoConnect={handleAutoConnect}
        handleConnect={handleConnect}
        handleBlur={handleBlur}
      />
    ))}
  </ul>
);

export default Topbar
