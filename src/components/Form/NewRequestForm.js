import React, {Component} from "react";
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {validateFields} from "./Validator/ValidateFields";
import CustomButton from '../UI/Buttons/CustomButton';

// import clsx from 'clsx';
import clsx from "clsx";
// import {messages} from "../../messages/messages";
import CloseIcon from '@material-ui/icons/Close';


const initialState = {
    email: {
        value: '',
        validateOnChange: false,
        error: ''
    },
    password: {
        value: '',
        validateOnChange: false,
        error: ''
    },
    submitCalled: false,
    allFieldsValidated: false
};

class NewRequestForm extends Component{

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    /*
     * validates the field onBlur if sumbit button is not clicked
     * set the validateOnChange to true for that field
     * check for error
     */
    handleBlur(validationFunc, evt) {
        const field = evt.target.name;
        // validate onBlur only when validateOnChange for that field is false
        // because if validateOnChange is already true there is no need to validate onBlur
        if (
            this.state[field]['validateOnChange'] === false &&
            this.state.submitCalled === false
        ) {
            this.setState(state => ({
                [field]: {
                    ...state[field],
                    validateOnChange: true,
                    error: validationFunc(state[field].value)
                }
            }));
        }
        return;
    }

    /*
     * update the value in state for that field
     * check for error if validateOnChange is true
     */
    handleChange(validationFunc, evt) {
        const field = evt.target.name;
        const fieldVal = evt.target.value;
        this.setState(state => ({
            [field]: {
                ...state[field],
                value: fieldVal,
                error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
            }
        }));
        // this.props.enableFormSubmit();
    }

    /*
     * validate all fields
     * check if all fields are valid if yes then submit the Form
     * otherwise set errors for the feilds in the state
     */
    handleSubmit(evt) {
        evt.preventDefault();
        // validate all fields
        const { email, password } = this.state;
        const emailError = validateFields.validateEmail(email.value);
        const passwordError = validateFields.validatePassword(password.value);
        if ([emailError, passwordError].every(e => e === false)) {
            // no errors submit the form
            console.log('success');

            // clear state and show all fields are validated
            this.setState(state => ({
                ...initialState, allFieldsValidated: true ,
                formData: {
                    ...state.email,
                    ...state.password
                },
            }));

            this.props.hideModal();
            // this.showAllFieldsValidated();
        } else {
            // update the state with errors
            this.setState(state => ({
                email: {
                    ...state.email,
                    validateOnChange: true,
                    error: emailError
                },
                password: {
                    ...state.password,
                    validateOnChange: true,
                    error: passwordError
                }
            }));
        }
    }

    // showAllFieldsValidated() {
    //     setTimeout(() => {
    //         this.setState({ allFieldsValidated: false });
    //     }, 1500);
    // }



    render() {
        return (
            <Form onSubmit={evt => this.handleSubmit(evt)}>
                {/* Email field */}
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="text"
                        name="email"
                        value={this.state.email.value}
                        autoComplete="on"
                        placeholder="Enter your email"
                        className={clsx(
                            'form-control',
                            { 'is-valid': this.state.email.error === false },
                            { 'is-invalid': this.state.email.error }
                        )}
                        onChange={evt =>
                            this.handleChange(validateFields.validateEmail, evt)
                        }
                        onBlur={evt =>
                            this.handleBlur(validateFields.validateEmail, evt)
                        }

                    />

                    <div className="invalid-feedback">{this.state.email.error}</div>
                </FormGroup>

                {/* Password field */}
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={this.state.password.value}
                        autoComplete="on"
                        placeholder="Enter your password"
                        className={clsx(
                            'form-control',
                            { 'is-valid': this.state.password.error === false },
                            { 'is-invalid': this.state.password.error }
                        )}
                        onChange={evt =>
                            this.handleChange(validateFields.validatePassword, evt)
                        }
                        onBlur={evt =>
                            this.handleBlur(validateFields.validatePassword, evt)
                        }
                    />

                    <div className="invalid-feedback">{this.state.password.error}</div>
                </FormGroup>

                <FormGroup className="d-flex justify-content-between">

                    {/*<Button onClick={this.props.hideModal}>*/}
                    {/*    <CloseIcon/>*/}
                    {/*</Button>*/}

                    {/*<Button*/}
                    {/*    type="submit"*/}
                    {/*    className="btn btn-outline-primary"*/}
                    {/*    onMouseDown={() => this.setState({ submitCalled: true })}*/}
                    {/*>*/}
                    {/*    Submit*/}
                    {/*</Button>*/}

                    <CustomButton
                        btntype="cancel"
                        onClick={this.props.hideModal}>
                        <CloseIcon/>
                    </CustomButton>

                    <CustomButton
                        btntype="confirm"
                        type="submit"
                        onMouseDown={() => this.setState({ submitCalled: true })}>
                        Submit
                    </CustomButton>
                </FormGroup>


            </Form>
        );
    }
}

export default NewRequestForm;
