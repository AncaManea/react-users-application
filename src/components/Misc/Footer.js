import React, {Component} from 'react';
import {
    Navbar,
    Nav,
    
} from 'reactstrap';

export default class Footer extends Component {
    render() {
        return (
            <div className={'footer'}>
                <Navbar className="actions-nav" color="light" light expand="md">
                   
                    <Nav className="ml-auto" navbar>
                        <h1>Anca</h1>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}