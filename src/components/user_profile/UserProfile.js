import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid, Divider, Icon, List, Button, Tab, Menu, Label, Container } from 'semantic-ui-react';
import ImageStatus from '../image_status/ImageStatus';
import Overview from '../overview/Overview';
import Repositories from '../repositories/Repositories';
import Gists from '../gists/Gists';
import Stars from '../stars/Stars';
import Followers from '../followers/Followers';
import './UserProfile.css';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reposData: [],
    };
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
          render: () => <Tab.Pane>
            {this.state.reposData.length && <Overview username={this.state.userData.login} reposData={this.state.reposData} />}
          </Tab.Pane>,
        },
        {
          menuItem: (
            <Menu.Item key='repositories'>
              Repositories<Label>19</Label>
            </Menu.Item>
          ),
          render: () => <Tab.Pane>
            {this.state.reposData.length && <Repositories username={this.state.userData.login} reposData={this.state.reposData} />}
          </Tab.Pane>,
        },
        {
          menuItem: (
            <Menu.Item key='gists'>
              Gists<Label>10</Label>
            </Menu.Item>
          ),
          render: () => <Tab.Pane>
            {this.state.gistsData.length && <Gists gistsData={this.state.gistsData} />}
          </Tab.Pane>,
        },
        {
          menuItem: (
            <Menu.Item key='stars'>
              Stars<Label>17</Label>
            </Menu.Item>
          ),
          render: () => <Tab.Pane>
            {this.state.reposData.length && <Stars reposData={this.state.reposData} />}
          </Tab.Pane>,
        },
        {
          menuItem: (
            <Menu.Item key='followers'>
              Followers<Label>2</Label>
            </Menu.Item>
          ),
          render: () => <Tab.Pane>
            {this.state.followersData && <Followers followersData={this.state.followersData} />}
          </Tab.Pane>,
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
  getReposData() {
    let userDataUrl = process.env.REACT_APP_GITHUB_URL + "users/" + process.env.REACT_APP_GITHUB_USER + "/repos";
    fetch(userDataUrl)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            reposData: data.sort((a, b) => { return (b.stargazers_count - a.stargazers_count) })
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getGistData() {
    let dataUrl = process.env.REACT_APP_GITHUB_URL + "users/" + process.env.REACT_APP_GITHUB_USER + "/gists";
    fetch(dataUrl)
      .then(res => res.json())
      .then(
        (data) => {
          console.log("GIST DATA");
          console.log(data);
          this.setState({
            gistsData: data
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getFollowersData() {
    let dataUrl = process.env.REACT_APP_GITHUB_URL + "users/" + process.env.REACT_APP_GITHUB_USER + "/followers";
    fetch(dataUrl)
      .then(res => res.json())
      .then(
        (data) => {
          console.log("FOLLOWERS DATA");
          console.log(data);
          this.setState({
            followersData: data
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getFollowingData() {
    let dataUrl = process.env.REACT_APP_GITHUB_URL + "users/" + process.env.REACT_APP_GITHUB_USER + "/following";
    fetch(dataUrl)
      .then(res => res.json())
      .then(
        (data) => {
          console.log("FOLLOWING DATA");
          console.log(data);
          this.setState({
            followingData: data
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  async componentDidMount() {
    await this.getReposData();
    await this.getGistData();
    await this.getFollowersData();
    await this.getFollowingData();
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
                  content={<a href='mailto:akchoudhary966@gmail.com'>akchoudhary966@gmail.com</a>}
                />
                <List.Item icon='linkify' content={<a href='https://amku91.github.io/'>amku91.github.io</a>} />
              </List>
            </div>
            <Divider />
            <div className='user-organization'>
              <h2 className='user-organization-name'></h2>
              <h2 className='user-organization-imagez'>
                <img src="https://avatars0.githubusercontent.com/u/4183553?s=70&amp;v=4" className="avatar" width="35" height="35" alt="@opensourcedesign" />
                <img src="https://avatars3.githubusercontent.com/u/6295529?s=70&amp;v=4" className="avatar" width="35" height="35" alt="@fossasia" />
                <img src="https://avatars0.githubusercontent.com/u/18506046?s=70&amp;v=4" className="avatar" width="35" height="35" alt="@OpenGenus" />
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