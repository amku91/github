import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Placeholder, Container, Grid, Segment, Icon } from 'semantic-ui-react';
import './Overview.css';

const Overview = ({ username, reposData }) => {
    var slicedRepoData = reposData.slice(0, 10);
    /**Show only 6 repos */
    var chunkedRepos = _.chunk(slicedRepoData, 2);
    return (
        <div>
            <Container>
                <Grid>
                    <Grid.Row>
                        <div className='overview-popular-repos'>Popular repositories </div>
                        <div className='overview-customize-repos'>Customize your pins </div>
                    </Grid.Row>
                </Grid>
                {chunkedRepos.map((chunk, index) => {
                    return <Grid key={"repo-segment-" + index} columns={2}>
                            <Grid.Row stretched>
                        {chunk.map((repo, i) => {
                            return <Grid.Column>
                                <Segment raised>
                                    <h4>{repo.name}</h4>
                                    {repo.fork && <span>Forked from amku91/{repo.name}</span>}
                                    <p>{repo.description}</p>
                                    <div><span>{repo.language}</span><span><Icon name='star' />{repo.stargazers_count}</span></div>
                                </Segment>
                            </Grid.Column>
                        })}
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

Overview.propTypes = {
    username: PropTypes.string.isRequired,
    reposData: PropTypes.arrayOf(Object).isRequired
};

export default Overview;