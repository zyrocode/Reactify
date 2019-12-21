import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardSubtitle } from 'reactstrap'

class SingleSong extends Component {
    state = {
    }
    render() {
        let song = this.props.songInfo
        return (
            <>
                <Card onClick={(e) => { if (e.target.className !== 'comment card-subtitle') this.props.setSong(song.id) }}>
                    <CardImg top width="70%" src={song.album.cover_xl} alt={song.title} />
                    <CardTitle>{song.title}</CardTitle>
                    <CardSubtitle className="artistIcon">{song.artist.name}</CardSubtitle>
                    <CardSubtitle onClick={(e) => { if (e.target.className === 'comment card-subtitle') this.props.comment(song.id) }} className="comment">Comment</CardSubtitle>
                </Card>
            </>
        );
    }
}

export default SingleSong;