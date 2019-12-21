import React, { Component } from 'react';
import SingleSong from './SingleSong';
import { Button, Row, Fade } from 'reactstrap'

class ListSong extends Component {
    state = {
        numberSongs: 20
    }
    render() {
        return (
            <>
                <Row>
                    {this.props.songs.slice(0, this.state.numberSongs)
                        .map((song, index) =>
                            <SingleSong songInfo={song} key={index} setSong={this.props.setCurrentSong} comment={this.props.setDisplayComment} displayModal={this.props.displayComment} />
                        )}
                </Row>
                {this.props.songs.length < this.state.numberSongs.length && <Button onClick={() => this.setState({numberSongs: this.state.numberSongs + 10})} className="mb-5 mx-auto">Load More</Button>}
            </>
        );
    }
}

export default ListSong;