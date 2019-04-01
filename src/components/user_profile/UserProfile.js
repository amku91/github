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
import Following from '../following/Following';
import './UserProfile.css';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repositoriesCount: 0,
      gistsCount: 0,
      starsCount: 0,
      followersCount: 0,
      followingCount: 0,
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
    });
  }
  setPaneData(){
    console.log("REPOS COUNT");
    console.log(this.state.reposData.filter(item => {return item.stargazers_count > 0}).length);
    this.setState({
      repositoriesCount: this.state.reposData.public_repos,
      starsCount: this.state.reposData.filter(item => {return item.stargazers_count > 0}).length,
      gistsCount: (this.state.reposData.public_gists + this.state.reposData.private_gists),
      followersCount: this.state.reposData.followers,
      followingCount: this.state.reposData.following,
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
              Repositories<Label circular={true} content={this.state.userData.public_repos}></Label>
            </Menu.Item>
          ),
          render: () => <Tab.Pane>
            {this.state.reposData.length && <Repositories username={this.state.userData.login} reposData={this.state.reposData} />}
          </Tab.Pane>,
        },
        {
          menuItem: (
            <Menu.Item key='gists'>
              Gists<Label circular={true} content={(this.state.userData.public_gists + this.state.userData.private_gists)}></Label>
            </Menu.Item>
          ),
          render: () => <Tab.Pane>
            {this.state.gistsData.length && <Gists gistsData={this.state.gistsData} />}
          </Tab.Pane>,
        },
        {
          menuItem: (
            <Menu.Item key='stars'>
              Stars<Label circular={true} content={this.state.reposData.filter(item => {return item.stargazers_count > 0}).length}></Label>
            </Menu.Item>
          ),
          render: () => <Tab.Pane>
            {this.state.reposData.length && <Stars reposData={this.state.reposData} />}
          </Tab.Pane>,
        },
        {
          menuItem: (
            <Menu.Item key='followers'>
              Followers<Label circular={true} content={this.state.userData.followers}></Label>
            </Menu.Item>
          ),
          render: () => <Tab.Pane>
            {this.state.followersData && <Followers followersData={this.state.followersData} />}
          </Tab.Pane>,
        },
        {
          menuItem: (
            <Menu.Item key='following'>
              Following<Label circular={true} content={this.state.userData.following}></Label>
            </Menu.Item>
          ),
          render: () => <Tab.Pane>
            {this.state.followingData && <Following followingData={this.state.followingData} />}
          </Tab.Pane>,
        }
      ]
    });
  }
  getReposData() {
    let userDataUrl = process.env.REACT_APP_GITHUB_URL + "users/" + process.env.REACT_APP_GITHUB_USER + "/repos?access_token=" + encodeURIComponent(process.env.REACT_APP_GITHUB_TOKEN);
    fetch(userDataUrl)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            reposData: data.sort((a, b) => { return (b.stargazers_count - a.stargazers_count) })
          });
          /**Also set pane data */
          this.setPaneData();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getGistData() {
    let dataUrl = process.env.REACT_APP_GITHUB_URL + "users/" + process.env.REACT_APP_GITHUB_USER + "/gists?access_token=" + encodeURIComponent(process.env.REACT_APP_GITHUB_TOKEN);
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
    let dataUrl = process.env.REACT_APP_GITHUB_URL + "users/" + process.env.REACT_APP_GITHUB_USER + "/followers?access_token=" + encodeURIComponent(process.env.REACT_APP_GITHUB_TOKEN);
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
    let dataUrl = process.env.REACT_APP_GITHUB_URL + "users/" + process.env.REACT_APP_GITHUB_USER + "/following?access_token=" + encodeURIComponent(process.env.REACT_APP_GITHUB_TOKEN);
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
    if (!this.state.reposData.length)
      return null;
    return (
      <Grid centered columns={12} className='user-page-container'>
        <Grid.Row centered>
          <Grid.Column width={3}>
            <ImageStatus imageData={this.state.imageData} statusData={this.state.statusData} />
            <h1 className='vcard-names'>
              <span className='vcard-name d-block'>{this.state.userData.name}</span>
              <span className='vcard-username d-block'>{this.state.userData.login}</span>
            </h1>
            <Divider />
            <div className='vcard-meta-member d-block'>
              <Icon name='address card outline' />&nbsp;<a href='https://github.com/settings/profile#github-developer-program'>Developer Program Member</a>
            </div>
            <div className='vcard-meta-bio d-block'>
              {this.state.userData.bio}
            </div>
            <div className='vcard-personal-details d-block'>
              <List>
                <List.Item icon='marker' content='Banglore, IN' />
                <List.Item
                  icon='mail'
                  content={<a href='mailto:akchoudhary966@gmail.com'>akchoudhary966@gmail.com</a>}
                />
                <List.Item icon='linkify' content={<a href='https://amku91.github.io/'>amku91.github.io</a>} />
              </List>
            </div>
            <Button animated fluid basic size='mini'>
              <Button.Content visible>Edit</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
            <Divider />
            <div className='user-organization'>
              <h2 className='user-organization-name'>Organizations</h2>
              <div className='user-organization-images d-block'>
                <img src="https://avatars0.githubusercontent.com/u/4183553?s=70&amp;v=4" className="avatar" width="35" height="35" alt="@opensourcedesign" />
                <img src="https://avatars3.githubusercontent.com/u/6295529?s=70&amp;v=4" className="avatar" width="35" height="35" alt="@fossasia" />
                <img src="https://avatars0.githubusercontent.com/u/18506046?s=70&amp;v=4" className="avatar" width="35" height="35" alt="@OpenGenus" />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={9}>
            {this.state.reposData.length && <Tab renderActiveOnly={true} menu={{ secondary: true, pointing: true }} panes={this.state.panesData} />}
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