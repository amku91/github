import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Placeholder, Container, Grid, Segment, Icon } from 'semantic-ui-react';
import RandomColorCircle from '../random_color_circle/RandomColorCircle';
import './Overview.css';

const Overview = ({ reposData }) => {
    var uniqueLanguage = Array.from(new Set(reposData.map(item => {return item.language})));
    console.log(uniqueLanguage);
    var colorMap = new Map();
    uniqueLanguage.map(lang => {
        colorMap.set(lang, (RandomColorCircle(0,0, true)).props["data-color"]);
    });
    var slicedRepoData = reposData.slice(0, 10);
    /**Show only 6 repos */
    var chunkedRepos = _.chunk(slicedRepoData, 2);
    return (
        <div>
            <Container>
                <Grid>
                    <Grid.Row>
                        <div className='overview-header'>
                        <span className='overview-popular-repos'>Popular repositories </span>
                        <span className='overview-customize-repos'>Customize your pins </span>
                        </div>
                    </Grid.Row>
                </Grid>
                {chunkedRepos.map((chunk, index) => {
                    return <Grid key={"repo-segment-" + index} columns={2}>
                            <Grid.Row stretched>
                        {chunk.map((repo, i) => {
                            return <Grid.Column>
                                <Segment className='overview-repo-card'>
                                    <a className='text-blue' href={repo.url}>{repo.name}</a>
                                    {repo.fork && <div>Forked from <span className='text-blue'>amku91/{repo.name}</span></div>}
                                    <p>{repo.description}</p>
                                    <div className='overview-repo-card-footer'>
                                        { repo.language && <span className='overview-repo-card-footer-left'><RandomColorCircle width={"12px"} height={"12px"} colorHex={colorMap.get(repo.language)} /></span>}
                                        { repo.language && <spna className='overview-repo-card-footer-middle'>{repo.language}</spna>}
                                        <span className='overview-repo-card-footer-right'><Icon name='star' />{repo.stargazers_count}</span>
                                    </div>
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
    reposData: PropTypes.arrayOf(Object).isRequired
};

export default Overview;