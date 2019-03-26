import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Placeholder, Container, Grid, Segment, Icon, Divider, Input, Dropdown, Button } from 'semantic-ui-react';
import './Repositories.css';

const Repositories = ({ username, reposData }) => {
    return (
        <div>
            <Container>
                <Grid columns={16}>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Input fluid icon='search' placeholder='Find a repository...' />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Dropdown text='Filter Tags' floating labeled button icon='filter' fluid className='icon'>
                                <Dropdown.Menu>
                                    <Dropdown.Header icon='tags' content='Filter by tag' />
                                    <Dropdown.Divider />
                                    <Dropdown.Item description='2 new' text='Important' />
                                    <Dropdown.Item description='10 new' text='Hopper' />
                                    <Dropdown.Item description='5 new' text='Discussion' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Dropdown text='Filter Tags' floating labeled button icon='filter' fluid className='icon'>
                                <Dropdown.Menu>
                                    <Dropdown.Header icon='tags' content='Filter by tag' />
                                    <Dropdown.Divider />
                                    <Dropdown.Item description='2 new' text='Important' />
                                    <Dropdown.Item description='10 new' text='Hopper' />
                                    <Dropdown.Item description='5 new' text='Discussion' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Button primary>New</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider />
                {reposData.map((repo, index) => {
                    return <Grid key={"repo-segment-" + index}>
                        <Grid.Row>
                            <Grid.Column>
                                <h4>{repo.name}</h4>
                                {repo.fork && <span>Forked from amku91/{repo.name}</span>}
                                <p>{repo.description}</p>
                                <div><span>{repo.language}</span><span><Icon name='star' />{repo.stargazers_count}</span></div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Divider />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                })}
                <Grid columns={2} stacked="true" padded>
                    <Grid.Column>
                        <Segment raised>
                            <Placeholder>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment raised>
                            <Placeholder>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder>
                        </Segment>
                    </Grid.Column>
                </Grid>

            </Container>
        </div>
    );
};

Repositories.propTypes = {
    username: PropTypes.string.isRequired,
    reposData: PropTypes.arrayOf(Object).isRequired
};

export default Repositories;