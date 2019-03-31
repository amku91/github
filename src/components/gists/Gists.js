import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Placeholder, Container, Grid, Segment, Icon, Divider, Input, Dropdown, Button, Header } from 'semantic-ui-react';
import './Gists.css';

const Gists = ({ gistsData }) => {
    /**Process gist data first */
    console.log(gistsData);
    gistsData.forEach((gist, i) => {
        let fileKeys = Object.keys(gist.files);
        console.log(fileKeys);
        gistsData[i]["files"] = gist.files[fileKeys[0]];
    });
    console.log("GIST DATA");
    console.log(gistsData);
    return (
        <div>
            <Segment placeholder>
    <Header icon>
      <Icon name='search' />
      You don't have any gist yet.
    </Header>
    <Segment.Inline>
      <Button primary>Learn More</Button>
      <Button>New Gist</Button>
    </Segment.Inline>
  </Segment>
            <Container>
                <Grid columns={16}>
                    <Grid.Row>
                        <Grid.Column width={14}>
                            <Input fluid icon='search' placeholder='Find a gist...' />
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Button primary>New</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider />
                {gistsData.map((gist, index) => {
                    return <Grid key={"gist-segment-" + index}>
                        <Grid.Row>
                            <Grid.Column>
                                <h4>{gist.files.filename}</h4>
                                {gist.files.type && <span>{gist.files.type}</span>}
                                <p>{gist.files.size}</p>
                                <div><span>{gist.public ? "Public" : "Private"}</span><span>Last Updated at <Icon name='star' />{gist.updated_at}</span></div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Divider />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                })}

            </Container>
        </div>
    );
};

Gists.propTypes = {
    gistsData: PropTypes.arrayOf(Object).isRequired
};

export default Gists;