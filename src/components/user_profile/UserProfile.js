import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid, Divider, Icon, List, Button, Tab, Menu, Label } from 'semantic-ui-react';
import ImageStatus from '../image_status/ImageStatus';
import './UserProfile.css';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {};
    }
    componentWillReceiveProps(nextProps) {
        console.log("NEXT PROPS GET CALLED");
        console.log(nextProps);
        this.setState({
            userData: nextProps.userData,
            imageData: {
                as: 'a',
                href: '/account',
                url: nextProps.userData.avatar_url,
                size: 'medium'
            },
            statusData: {
                avatar_url: 'https://github.githubassets.com/images/icons/emoji/unicode/1f3af.png',
                text: 'Focusing'
            },
            panesData: [
                {
                  menuItem: { key: 'overview', icon: null, content: 'Overview' },
                  render: () => <Tab.Pane>Overview Content</Tab.Pane>,
                },
                {
                  menuItem: (
                    <Menu.Item key='repositories'>
                      Repositories<Label>19</Label>
                    </Menu.Item>
                  ),
                  render: () => <Tab.Pane>Repositories Content</Tab.Pane>,
                },
                {
                    menuItem: (
                      <Menu.Item key='projects'>
                        Projects<Label>0</Label>
                      </Menu.Item>
                    ),
                    render: () => <Tab.Pane>Projects Content</Tab.Pane>,
                },
                {
                    menuItem: (
                      <Menu.Item key='stars'>
                        Stars<Label>17</Label>
                      </Menu.Item>
                    ),
                    render: () => <Tab.Pane>Stars Content</Tab.Pane>,
                },
                {
                    menuItem: (
                      <Menu.Item key='followers'>
                        Followers<Label>2</Label>
                      </Menu.Item>
                    ),
                    render: () => <Tab.Pane>Followers Content</Tab.Pane>,
                },
                {
                    menuItem: (
                      <Menu.Item key='following'>
                        Following<Label>0</Label>
                      </Menu.Item>
                    ),
                    render: () => <Tab.Pane>Following Content</Tab.Pane>,
                }
              ]
        });
    }
    render() {
        if (!this.state.imageData)
            return null;
        return (
            <Grid centered columns={12} padded='vertically'>
                <Grid.Row centered>
                    <Grid.Column width={2}>
                        <ImageStatus imageData={this.state.imageData} statusData={this.state.statusData} />
                        <h1 className='vcard-names'>
                            <span className='vcard-name'>{this.state.userData.name}</span>
                            <span className='vcard-username'>{this.state.userData.login}</span>
                        </h1>
                        <Button animated fluid basic>
                            <Button.Content visible>Edit</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>
                        <Divider />
                        <div className='vcard-meta-member'>
                            <a>Developer Program Member</a>
                        </div>
                        <div className='vcard-meta-bio'>
                            {this.state.userData.bio}
                        </div>
                        <div className='vcard-personal-details'>
                            <List>
                                <List.Item icon='marker' content='Banglore, IN' />
                                <List.Item
                                    icon='mail'
                                    content={<a href='mailto:akchoudhary966@gmail.com'>jack@semantic-ui.com</a>}
                                />
                                <List.Item icon='linkify' content={<a href='https://amku91.github.io/'>semantic-ui.com</a>} />
                            </List>
                        </div>
                        <Divider />
                        <div className='user-organization'>
                            <h2 className='user-organization-name'></h2>
                            <h2 className='user-organization-imagez'>
                                <img src="https://avatars0.githubusercontent.com/u/4183553?s=70&amp;v=4" class="avatar" width="35" height="35" alt="@opensourcedesign" />
                                <img src="https://avatars3.githubusercontent.com/u/6295529?s=70&amp;v=4" class="avatar" width="35" height="35" alt="@fossasia" />
                                <img src="https://avatars0.githubusercontent.com/u/18506046?s=70&amp;v=4" class="avatar" width="35" height="35" alt="@OpenGenus" />
                            </h2>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                    <Tab panes={this.state.panesData} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

UserProfile.propTypes = {
    userData: PropTypes.objectOf(String).isRequired
};

export default UserProfile;