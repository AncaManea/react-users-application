import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import axios from 'axios';

export default class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: ''
    };

    _onChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    _register = async () => {
        const { name, email, password } = this.state;
        
        const response = await axios.post(process.env.REACT_APP_API_URL + 'register', {
            name, email, password
        });


        
        this.refs.name.value = '';
        this.refs.email.value = '';
        this.refs.password.value = '';

        
        if (response.data.errorMessage === null) {
            
            this.refs.success.innerHTML = "Successfully registered";
        }
        else {
           
            this.refs.success.innerHTML = response.data.errorMessage;
        }

       

    };

    render() {
        
        const { name, email, password } = this.state;

        return (
            <div className="register-div">
                <br />
                <span ref='success'></span>
                <Container id="registerForm">
                    <Row>
                        <Col sm={{size: 6, offset: 3 }}>
                            <Form>

                                <FormGroup>
                                    <Label for="Name">Name</Label>
                                    <Input id="Name" ref='name' type={'text'} name={'name'} value={name} onChange={this._onChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Email">Email</Label>
                                    <Input id="Email" ref='email' type={'text'} name={'email'} value={email} onChange={this._onChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Password">Password</Label>
                                    <Input id="Password" ref='password' type={'password'} name={'password'} value={password} onChange={this._onChange} />
                                </FormGroup>
                                <Button id="registerSubmit" onClick={this._register}>Register</Button>
                            </Form>

                        </Col>
                    </Row>
                </Container>
               
               
            </div>
        )
    }
}
