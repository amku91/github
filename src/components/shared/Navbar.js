import React from 'react';
import _ from 'lodash';
import faker from 'faker';
import PropTypes from 'prop-types';
import { Menu, Input, Icon } from 'semantic-ui-react';
import './Navbar.css';
import DropdownList from '../dropdown_list/DropdownList';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            menuConfig: {
                showSearchbar: true,
                showNotificationIcon: true,
                hideSearchBarImage: false,
            },
            menuItems: [
                {
                    as: 'a',
                    content: 'Pull requests',
                    href: '/pulls',
                    key: 'pull_requests',
                    target: '_blank',
                },
                {
                    as: 'a',
                    content: 'Issues',
                    href: '/issues',
                    key: 'github',
                    target: '_blank',
                },
                {
                    as: 'a',
                    content: 'Marketplace',
                    href: '/marketplace',
                    key: 'marketplace',
                    target: '_blank',
                },
                {
                    as: 'a',
                    content: 'Explore',
                    href: '/explore',
                    key: 'explore',
                    target: '_blank',
                },
            ],
            rightItems: [
                {
                    key: 'create_new',
                    direction: 'left',
                    pointing: 'top left',
                    image: '',
                    icon: 'plus',
                    options: [
                        { key: 'create_new_repo', text: 'New repository', href: '/amku91' },
                        { key: 'import_new_repo', text: 'Import repository', href: '/amku91' },
                        { key: 'new_gist', text: 'New gist', href: '/amku91' },
                        { key: 'new_organization', text: 'New organization', href: '/amku91' },
                        { key: 'new_project', text: 'New project', href: '/amku91' },
                    ]
                }
            ],
            userDropdown: {
                key: 'user_account',
                direction: 'left',
                pointing: 'top left',
                image: faker.internet.avatar(),
                username: "Guest",
                icon: null,
                options: [
                    {
                        key: 'user',
                        type: 'header',
                        text: (
                            <span>
                                Signed in as <strong>{this.username}</strong>
                            </span>
                        )
                    },
                    { key: 'divider_0', type: 'divider' },
                    {
                        key: 'status',
                        type: 'text',
                        href: '/status',
                        text: (
                            <span>
                                <img className='status-image' src="https://github.githubassets.com/images/icons/emoji/unicode/1f3af.png" />&nbsp;<strong>Focusing</strong>
                            </span>
                        )
                    },
                    { key: 'divider_1', type: 'divider' },
                    { key: 'your_profile', text: 'Your profile', href: '/amku91' },
                    { key: 'your_repo', text: 'Your repositories' },
                    { key: 'your_projects', text: 'Your projects' },
                    { key: 'your_stars', text: 'Your stars' },
                    { key: 'your_gists', text: 'Your gists' },
                    { key: 'divider_2', type: 'divider' },
                    { key: 'help', text: 'Help' },
                    { key: 'settings', text: 'Settings' },
                    { key: 'sign-out', text: 'Sign Out' },
                ]
            }
        };
        //Bind methods
        this.enlargeInputBox = this.enlargeInputBox.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log("NEXT PROPS CALLED");
        console.log(nextProps);
        let username = nextProps.username;
        let userDropdownData = this.state.userDropdown;
        userDropdownData.image = nextProps.avatar_url;
        userDropdownData.options.find(item => item.key == "user").text = (
            <span>
                                Signed in as <strong>{username}</strong>
            </span>
        );
        console.log("STATE UPDATED");
        console.log(userDropdownData);
        this.setState({
            userDropdown: userDropdownData
        });
    }

    enlargeInputBox() {
        //Enlarge the input box
        let currentImageStatus = this.state.hideSearchBarImage;
        this.setState({
            hideSearchBarImage: !currentImageStatus
        });
    }
    render() {
        return (
            <Menu fixed='top' inverted>
                <Menu.Item>
                    <Icon fitted name='github' size='big' />
                </Menu.Item>
                <Menu.Menu>
                    <Menu.Item>
                        {this.state.menuConfig.showSearchbar &&
                            <div className='navbar-search' aria-expanded='false' tabIndex='0'>
                                <Input icon={null} className='navbar-search-box' size='small' placeholder='Search or jump to...' onClick={() => this.enlargeInputBox()} onBlur={() => this.enlargeInputBox()} />
                                {!this.state.hideSearchBarImage && <img src="https://github.githubassets.com/images/search-key-slash.svg" alt="" className='header-search-key-slash' />
                                }
                            </div>
                        }
                    </Menu.Item>
                </Menu.Menu>
                <Menu.Menu>
                    {_.map(this.state.menuItems, item => <Menu.Item className='Menu-item' {...item} />)}
                </Menu.Menu>

                <Menu.Menu position='right'>
                    <Menu.Item href='/notifications'>
                        {this.state.menuConfig.showNotificationIcon &&
                            <Icon fitted name='bell' href='' />
                        }
                    </Menu.Item>

                    {_.map(this.state.rightItems, item => {
                        return <Menu.Item key={'menu-' + item.key}>
                        <DropdownList dropdownData={item} /> 
                        </Menu.Item>
                    })
                    }
                    <Menu.Item>
                        <DropdownList dropdownData={this.state.userDropdown} />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

Navbar.propTypes = {
    username: PropTypes.string,
    userData: PropTypes.objectOf(String)
}

export default Navbar;