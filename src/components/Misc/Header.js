import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';


export default class Header extends Component {
    state = {
        redirect: false
    };

    _logout = () => {
        sessionStorage.removeItem('token');

        this.setState({
            redirect: true
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/login'}/>;
        }

        return (
            <div className={'header'}>
                <Navbar className="actions-nav" color="light" light expand="md">
                    <NavbarBrand >Actions</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                       
                        <NavItem>
                            <NavLink onClick={this._logout}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                
            </div>
        );
    }
}