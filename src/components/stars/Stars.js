import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Placeholder, Container, Grid, Segment, Icon, Divider, Input, Dropdown, Button } from 'semantic-ui-react';
import './Stars.css';

const Stars = ({ reposData }) => {
    return (
        <div>
            <Container>
                <Grid columns={16}>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <div className='stars-repo-title'>
                                REPOSITORIES
                            </div>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Dropdown text='Filter' icon='filter' floating labeled button className='icon' direction='right'>
                                <Dropdown.Menu position='right'>
                                    <Dropdown.Header content='Search Issues' />
                                    <Input icon='search' iconPosition='left' name='search' />
                                    <Dropdown.Header icon='tags' content='Filter by tag' />
                                    <Dropdown.Divider />
                                    <Dropdown.Item label={{ color: 'red', empty: true, circular: true }} text='Important' />
                                    <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text='Announcement' />
                                    <Dropdown.Item label={{ color: 'black', empty: true, circular: true }} text='Discussion' />
                                </Dropdown.Menu>
                            </Dropdown>
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

Stars.propTypes = {
    reposData: PropTypes.arrayOf(Object).isRequired
};

export default Stars;