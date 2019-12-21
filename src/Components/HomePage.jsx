import React, { Component } from 'react';
import { Fade, Input, Row } from 'reactstrap'
import ListSong from './ListSong';
import FooterPlayer from './FooterPlayer'
import CommentModal from './CommentModal';


class HomePage extends Component {
    state = {
        songs: [],
        loaded: false,
        currentSong: undefined,
        toggleSearch: false,
        searchQuery: undefined,
        displayComment: false,
        commentSong: undefined
    }
    render() {
        return (
            <>
                <Fade in={this.state.loaded}>
                    <div className="bodyContainer">
                        {this.state.toggleSearch &&
                            <Input
                                type="search"
                                placeholder="Search"
                                className="search mb-3"
                                onChange={(val) => this.fetchData(val.target.value)}
                            />}
                        <Row>
                            <h1 className="display-4 mt-4">#CHRISTMAS</h1>
                        </Row>
                        <Row>
                            {this.state.displayComment && <CommentModal setDisplay={() => this.setState({ displayComment: !this.state.displayComment })} display={this.state.displayComment} commentSongID={this.state.commentSong} />}
                        </Row>
                        <Row>
                            {this.state.searchQuery &&
                                <ListSong songs={this.state.songs} setCurrentSong={this.setCurrentSong} setDisplayComment={this.setDisplayComment} displayComment={this.displayComment} />
                            }
                        </Row>
                    </div>
                    <FooterPlayer songID={this.state.currentSong} />
                </Fade>
            </>
        );
    }

    setDisplayComment = (songID) => {
        this.state.commentSong !== songID
            ?
            this.setState({
                commentSong: songID,
                displayComment: true
            })
            :
            this.setState({
                displayComment: !this.state.displayComment
            })
    }

    setCurrentSong = (songID) =>
        this.setState({
            currentSong: songID
        })

    fetchData = async (val) => {
        let response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?limit=24&q=" + val, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "d66c0b004dmsh9ff02beb9316fdap1419abjsn9ec964390e2c"
            }
        })
        let songs = await response.json()
        this.setState({
            songs: songs.data,
            searchQuery: val
        })
    }

    componentDidMount = async () => {
        await this.fetchData("chrismas")
        await this.setState({
            loaded: true
        })
    }
}

export default HomePage;