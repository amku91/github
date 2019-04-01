import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Placeholder, Container, Grid, Segment, Icon, Divider, Input, Dropdown, Button, Image } from 'semantic-ui-react';
import './Following.css';

const Following = ({ followingData }) => {
    return (
        <div>
            <Container>
                {followingData.map((following, index) => {
                    return <Grid columns={16} key={"following-grid-" + index}>
                        <Grid.Row>
                            <Grid.Column width={14}>
                                <div className='follwing-main'>
                                <Image src={following.avatar_url} size='tiny' verticalAlign='top' as='a' href={following.url} />
                                <div>
                                    <div className='following-login'>{following.login}</div>
                                    <div className='following-type'>{following.type}</div>
                                </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Button floated='right'>Unfollow</Button>
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

Following.propTypes = {
    followingData: PropTypes.arrayOf(Object).isRequired
};

export default Following;