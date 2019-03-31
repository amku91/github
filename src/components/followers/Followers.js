import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Placeholder, Container, Grid, Segment, Icon, Divider, Input, Dropdown, Button, Image } from 'semantic-ui-react';
import './Followers.css';

const Followers = ({ followersData }) => {
    return (
        <div>
            <Container>
                {followersData.map((follower, index) => {
                    return <Grid columns={16} key={"follower-grid-" + index}>
                        <Grid.Row>
                            <Grid.Column width={14}>
                                <div className='follwer-main'>
                                <Image src={follower.avatar_url} size='tiny' verticalAlign='top' as='a' href={follower.url} />
                                <div>
                                    <div className='follower-login'>{follower.login}</div>
                                    <div className='follower-type'>{follower.type}</div>
                                </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Button floated='right'>Follow</Button>
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
                        <Placeholder>
                            <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line length='medium' />
                                <Placeholder.Line length='short' />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </Grid.Column>
                    <Grid.Column>
                        <Placeholder>
                            <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line length='medium' />
                                <Placeholder.Line length='short' />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </Grid.Column>
                </Grid>

            </Container>
        </div>
    );
};

Followers.propTypes = {
    followersData: PropTypes.arrayOf(Object).isRequired
};

export default Followers;