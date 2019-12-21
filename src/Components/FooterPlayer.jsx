import React, { Component } from 'react';
import AudioPlayer from "react-h5-audio-player";
import { Fade } from 'reactstrap'

class FooterPlayer extends Component {
    state = {
        songImg: undefined,
        songArtist: undefined,
        songTitle: undefined,
        songPreview: undefined
    }
    render() {
        return (
            <Fade>
                <footer>
                    <div className="footer-left">
                        <img src={this.state.songImg} alt={this.state.songTitle} />
                        <div className="track-info">
                            <p className="title">{this.state.songTitle}</p>
                            <p className="artist">{this.state.songArtist}</p>
                        </div>
                        <div className="player">
                            <AudioPlayer
                                autoPlay
                                src={this.state.songPreview}
                            />
                        </div>
                    </div>
                </footer>
            </Fade>
        );
    }

    fetchSongData = async () => {
        console.log(this.props.songID)
        if (this.props.songID !== undefined) {
            let response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/track/" + this.props.songID, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": "d66c0b004dmsh9ff02beb9316fdap1419abjsn9ec964390e2c"
                }
            })
            let song = await response.json()
            this.setState({
                songTitle: song.title_short,
                songArtist: song.artist.name,
                songImg: song.album.cover,
                songPreview: song.preview
            })
        }
        else {
            this.setState({
                songTitle: "Title",
                songArtist: "Artist",
                songImg: "https://cdn.shopify.com/s/files/1/1064/0720/products/frosted_top_1024x1024.png",
                songPreview: ""
            })
        }
    }

    componentDidMount = async () => {
        await this.fetchSongData()
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.songID !== this.props.songID) {
            await this.fetchSongData()
        }
    }
}

export default FooterPlayer;