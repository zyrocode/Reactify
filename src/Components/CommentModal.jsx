import React, { Component } from 'react';
import { Button, Fade, Form, FormGroup, Input, Label, Spinner } from 'reactstrap'

class CommentModal extends Component {
    state = {
        songTitle: undefined,
        songArtist: undefined,
        songImg: undefined,
        songPreview: undefined,
        isLoading: true
    }

    render() {
        return (
            this.props.display &&
                <Fade className="comment-modal" in={!this.state.isLoading}>
                    <span className="close" onClick={this.props.setDisplay}></span>
                        <h3 className="display-4">{this.state.songTitle}</h3>
                        <h3 className="display-5">{this.state.songArtist}</h3>
                        <Form>
                        <FormGroup>
                            <Label>Comment</Label>
                            <Input type="textarea" placeholder="Type a comment..." />
                        </FormGroup>
                        <FormGroup>
                            <Label>Rate</Label>
                            <Input type="select">
                                <option defaultValue disabled>-</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                    </Fade>
        );
    }

    fetchSongData = async () => {
        let response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/track/" + this.props.commentSongID, {
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

    componentDidMount = async () => {
        await this.fetchSongData()
        await this.setState({ isLoading: true })
        await setTimeout(() => {
            this.setState({isLoading: false})
        }, 50)
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.commentSongID !== this.props.commentSongID) {
            await this.fetchSongData()
            await this.setState({ isLoading: true })
            await setTimeout(() => {
                this.setState({isLoading: false})
            }, 50)
        }
    }

}

export default CommentModal;