import React, {Component} from 'react';
import axios from 'axios';
import UserRow from "./UserRow";
import Layout from '../Misc/Layout';
import '../../css/Users.css';

import {Table,ModalFooter, Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Label, Input, 
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

export default class Users extends Component {
    state = {
        users: [],
        open: false,
        id: false,
        name: '',
        email: '',
        password: '',
        role: '',
        status: '',
        shouldRerender: false
    };

    async componentDidMount() {
        let users = await axios.get(process.env.REACT_APP_API_URL + 'admin/users');

        this.setState({users: users.data.data});
    }

    async componentDidUpdate() {
        if (this.state.shouldRerender) {
            let users = await axios.get(process.env.REACT_APP_API_URL + 'admin/users');

            this.setState({users: users.data.data, shouldRerender: false});
        }
    }

    _toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _userAction = async () => {
        const { name, email, password, role, status, id} = this.state;

        const data = {
            id, name, email
        };

        if (role !== '') {
            data.role = role;
        }

        let res;

        if(name == '') {
            res = await axios.delete(process.env.REACT_APP_API_URL + `admin/user/${id}`, data);
        }
        else if (id) {
            res = await axios.patch(process.env.REACT_APP_API_URL + `admin/user/${id}`, data);
        } else {
            data.password = password;

            res = await axios.post(process.env.REACT_APP_API_URL + 'admin/user', data);
        }

        if (res && res.data && res.data.responseType === 'success') {
            this.setState({
                shouldRerender: true,
                open: false
            });
    
            this.refs.success.innerHTML = "Action successfully performed.";
    

        } else {

            this.refs.success.innerHTML = res.data.errorMessage;
        }
    };

     _add = () => {
        this.setState({
            id: false,
            name: 'User',
            email: '',
            role: '',
            status: '',
            open: true
        });
    };

    _edit = (user) => {
        this.setState({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role_id,
            status: user.status,
            open: true
        });
    };

    _deletes = (user) => {
        this.setState({
            id: user.id,
            name: '',
            open: true
        });
    };

    render() {
        const {users, id} = this.state;
        let content;

        if(this.state.name == '')
        {
            content = <h1>Are you sure you want to delete this user?</h1>
        }
        else
        {
            content = <Form>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this._onChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this._onChange} />
                </FormGroup>
                {!id && <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this._onChange} />
                </FormGroup>}
                <FormGroup>
                    <Label for="role">Select</Label>
                    <Input type="select"
                        name="role"
                        id="role"
                        onChange={this._onChange}
                        value={this.state.role}>
                        <option value={''}>Select</option>
                        <option value={1}>Admin</option>
                        <option value={2}>User</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="status">Status</Label>
                    <Input type="select"
                        name="status"
                        id="status"
                        onChange={this._onChange}
                        value={this.state.status}>
                        <option value={''}>Select</option>
                        <option value={1}>Activated</option>
                        <option value={0}>Deactivated</option>
                    </Input>
                </FormGroup>
            </Form>
        }

        return (
            <Layout>
               
                
                <Button id="buttonAdd" outline color="secondary" onClick={this._add}>Add user</Button>
                <br/>
                <span ref='success'></span>

                <Table id="table-users">
                    <thead>
                        <tr>
                            <th>User id</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                        {users && users.map((user, key) => {
                            return <UserRow key={key} user={user} edit={this._edit} deletes={this._deletes} />
                        })}
                   
                    </Table>
                <Modal isOpen={this.state.open} toggle={this._toggle}>
                    <ModalHeader toggle={this._toggle}>{this.state.name == '' ? 'Delete user' : id ? 'Edit user' : 'Add user'}</ModalHeader>
                    <ModalBody>
                        {content}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._userAction}>{this.state.name == '' ? 'Delete user' : id ? 'Edit user' : 'Add user'}</Button>
                        <Button color="secondary" onClick={this._toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
               
            </Layout>
        )
    }
}
