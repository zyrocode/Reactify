import React, { Component } from 'react';
import SideBar from './SideBar';
import { Fade, Input, Row } from 'reactstrap'
import FooterPlayer from './FooterPlayer'
import CommentModal from './CommentModal';
import ListSong from './ListSong';


class SearchPage extends Component {
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
                    <SideBar toggle={this.setToggleSearch} />
                    <div className="bodyContainer">
                        <Input
                            type="search"
                            placeholder="Search"
                            className="search"
                            onChange={(val) => this.fetchData(val.target.value)}
                        />
                        <Row>
                            {this.state.searchQuery ? <h1 className="display-4 mt-4">Results for "{this.state.searchQuery}"</h1> : <h1 className="display-4 mt-4">Search for a song</h1>}
                        </Row>
                        <Row>
                            {this.state.displayComment && <CommentModal setDisplay={() => this.setState({ displayComment: !this.state.displayComment })} display={this.state.displayComment} commentSongID={this.state.commentSong} />}
                        </Row>
                        <Row>
                            {this.state.searchQuery &&
                                <ListSong songs={this.state.songs} setCurrentSong={this.setCurrentSong} setDisplayComment={this.setDisplayComment} displayComment={this.displayComment} />
                            }
                            {this.state.searchQuery &&
                                this.state.songs.length === 0 &&
                                    <h1 className="display-6 mt-5">Nothing Found</h1>
                            }
                        </Row>
                    </div>
                    <FooterPlayer songID={this.state.currentSong} />
                </Fade>}
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

    setToggleSearch = () =>
        this.setState({
            toggleSearch: !this.state.toggleSearch
        })

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
        await this.setState({
            loaded: true
        })
    }



}

export default SearchPage;