import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export const classNames = {
  ROOT: 'Menu',
  CAPITALIZE: 'Menu_capitalize',
  UPPERCASE: 'Menu_uppercase',
  BUTTON: 'Menu__Button',
  BUTTON_WITH_ICON: 'Menu__Button_icon',
  ITEMS: 'Menu__Items',
  ITEMS_VISIBLE: 'Menu__Items_visible',
  ITEM: 'Menu__Item',
};

function Menu(props) {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [visible, setVisible] = React.useState(false); // items visible ?

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const addVisible = () => {
    if (!visible) {
      setVisible(true);
    }
  };

  const removeVisible = () => {
    if (visible) {
      setVisible(false);
    }
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setVisible(false);
    props.onSelect(item);
  };

  const classes = [classNames.ROOT];
  if (props.capitalize) classes.push(classNames.CAPITALIZE);
  if (props.uppercase) classes.push(classNames.UPPERCASE);

  return (
    <div
      className={[...classes].join(' ')}
      onMouseOver={addVisible}
      onMouseLeave={removeVisible}
    >
      <button
        className={
          props.noDropIcon
            ? classNames.BUTTON
            : [classNames.BUTTON, classNames.BUTTON_WITH_ICON].join(' ')
        }
        onClick={toggleVisible}
      >
        {selectedItem || props.defaultItem || props.placeholder}
      </button>
      <ul
        className={
          visible
            ? [classNames.ITEMS, classNames.ITEMS_VISIBLE].join(' ')
            : classNames.ITEMS
        }
      >
        {props.items.map((item) => (
          <li
            key={item}
            className={classNames.ITEM}
            onClick={() => handleSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  defaultItem: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  noDropIcon: PropTypes.bool,
  capitalize: PropTypes.bool,
  uppercase: PropTypes.bool,
};

Menu.defaultProps = {
  noDropIcon: false,
  capitalize: false,
  uppercase: false,
};

export default Menu;
