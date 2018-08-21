import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Layout from '../Misc/Layout';


export default class Forgot extends React.Component {
    state = {
        email: ''
    };

    _onChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    _confirmForgot = async () => {
        const {email} = this.state;
        const response = await axios.post(process.env.REACT_APP_API_URL + 'forgot-password', {
            email,
        });

        if (response.data.errorMessage === null) {
            console.log(response.data);
            this.refs.success.innerHTML = "Your code is: " + response.data.data;
        }
        else {

            this.refs.success.innerHTML = response.data.errorMessage;
        }



    };

    render() {
        const { email } = this.state;


        return (
            <div>
                <br />
                <span ref='success'></span>
                <Container id="loginForm">
                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Form>
                                <FormGroup>
                                    <Label for="Email">Your email is:</Label>
                                    <Input id="Email" ref='email' type={'email'} name={'email'} value={email} onChange={this._onChange} />
                                </FormGroup>
                                <Button id="loginSubmit" onClick={this._confirmForgot}>Confirm</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>


        )
    }
}
