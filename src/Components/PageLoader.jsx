import React, { Component } from 'react';
import { Container, Col, Row, Spinner } from 'reactstrap'

class PageLoader extends Component {
    state = {}
    render() {
        return (
            <Container className="my-5 d-block text-center">
                <Row>
                    <Col>
                        <img className="loading-img" src="http://shemakeswar.com/wp-content/themes/WP_SMW_THEME/images/Spotify-logo-white.png" alt="Spotify Logo" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Spinner style={{ width: '3rem', height: '3rem', color: 'white' }} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default PageLoader;