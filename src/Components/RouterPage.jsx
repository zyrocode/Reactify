import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import PageLoader from './PageLoader';
import SideBar from './SideBar';

class RouterPage extends Component {
    state = {
        isLoading: true,
        toggleSearch: false
    }
    render() {
        return (
            <>
                {this.state.isLoading && <PageLoader />}
                {!this.state.isLoading &&
                <Router>
                    <SideBar toggle={this.setToggleSearch} />
                    <Route path="/" exact component={HomePage} />
                    <Route path="/search" component={SearchPage} />
                </Router>}
            </>
        );
    }
    componentDidMount = () => 
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000); 
    
    setToggleSearch = () =>
        this.setState({
            toggleSearch: !this.state.toggleSearch
        })
}
export default RouterPage;