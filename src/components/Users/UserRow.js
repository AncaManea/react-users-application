import React, {Component} from 'react';
import {ButtonGroup, Button,

} from 'reactstrap';
import PropTypes from 'prop-types';

export default class UserRow extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        edit: PropTypes.func.isRequired,
        deletes: PropTypes.func.isRequired
    };

    _showRole = role => {
        switch (role) {
            case 1:
                return 'Admin';
            case 2:
                return 'User';
            default:
                return 'Unknown'
        }
    };

    _edit = (user) => {
        const {edit} = this.props;

        edit && edit(user);
    };

    _deletes = (user) => {
        const {deletes} = this.props;

        deletes && deletes(user);
    };

    
    render() {
        
        const {user} = this.props;

        return (
     
                    <tbody>
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{this._showRole(user.role_id)}</td>
                            <td>
                                <ButtonGroup>
                                    <Button color="warning" size="sm" onClick={() => this._edit(user)}>Edit User</Button>
                                    <Button color="danger" size="sm" onClick={() => this._deletes(user)}>Delete User</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    </tbody> 
        );
    }
}