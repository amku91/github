import React from 'react';
import _ from 'lodash';
import faker from 'faker';
import PropTypes from 'prop-types';
import { Image, Icon, Dropdown } from 'semantic-ui-react';
import './DropdownList.css';


const triggerImage = (imageSrc) => {
    return (
        <span>
            <Image avatar src={imageSrc} />
        </span>
    );
}
const triggerIcon = (iconName) => {
    return (
        <span>
            <Icon fitted name={iconName} />
        </span>
    );
}
const DropdownList = ({dropdownData}) => {
    return(
             <Dropdown key={dropdownData.key} className='Dropdown' direction={dropdownData.direction} pointing={dropdownData.pointing} trigger={dropdownData.image ? triggerImage(dropdownData.image) : triggerIcon(dropdownData.icon)}>
                {dropdownData.options &&
                    <Dropdown.Menu className='Dropdown-menu'>
                        {_.map(dropdownData.options, option => {
                            if (option.type == 'header')
                                return <Dropdown.Item className='Dropdown-item-header' key={option.key}>{option.text}</Dropdown.Item>;
                            else if (option.type == 'divider')
                                return <Dropdown.Divider className='Dropdown-item-divider' key={option.key} content={option.text} />
                            else
                                return <Dropdown.Item className='Dropdown-item-text' key={option.key} href={option.href ? option.href : ''}>{option.text}</Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                }
            </Dropdown>
    );

};


DropdownList.propTypes = {
    dropdownData: PropTypes.object
}


export default DropdownList;