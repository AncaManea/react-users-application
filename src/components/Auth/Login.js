import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Layout from '../Misc/Layout';


export default class Login extends React.Component {
    state = {
        email: '',
        password: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _login = async () => {
        const {email, password} = this.state;

        const response = await axios.post(process.env.REACT_APP_API_URL + 'login', {
            email, password
        });
        console.log(response);
        if (response && response.data && response.data.data) {
            sessionStorage.setItem('token', response.data.data.jwt);
            this.props.history.push('/users');
        } else {
            //afisam eroare
        }
    };
    
    _forgot = () => {

        this.props.history.push('/forgot');

    };



    render() {
        const {email, password} = this.state;
        

        return (
                <div>
                    <Container id="loginForm">
                        <Row>
                            <Col sm={{size:6, offset:3}}>
                                <Form>
                                    <FormGroup>
                                        <Label for="Name">Name</Label>
                                        <Input id="Name" ref='name' type={'text'} name={'email'} value={email} onChange={this._onChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="Password">Password</Label>
                                        <Input id="Password" ref='email' type={'password'} name={'password'} value={password} onChange={this._onChange} />
                                    </FormGroup>
                                    <Button id="loginSubmit"onClick={this._login}>Login</Button>
                                </Form>
                            </Col>
                        </Row>
                   
                    <Button className="buttons" outline color="danger" onClick={this._forgot}>Forgot Password</Button>
                    </Container>
                </div>
               
           
        )
    }
}
