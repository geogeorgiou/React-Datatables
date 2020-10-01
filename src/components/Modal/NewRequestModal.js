
import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
    // , Input, Label, Form, FormGroup } from 'reactstrap';

class NewRequestModal extends Component {

    state = {
        modal: false,
        backdrop: false,
        keyboard: false
    }

    // toggleModal = () => {
    //     console.log('trying to toggle modal');
    //     this.setState({modal: !this.state.modal});
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log('[Persons.js] ComponentDidUpdate with ');
    //     console.log(snapshot)
    // }

    static getDerivedStateFromProps(nextProps, prevState){
        return {
            modal: nextProps.show,
            backdrop: nextProps.modalBackdrop,
            keyboard: nextProps.modalKeyboard
        };
    }

    // componentDidMount() {
    //     console.log(`${this.state.modal} ${this.state.backdrop} ${this.state.keyboard}`)
    // }

    setBackdrop = () => {
        this.setState({backdrop: !this.state.backdrop});
    }

    setKeyboard = () => {
        this.setState({keyboard: !this.state.keyboard});
    }

    changeBackdrop = (e) => {
        let value = e.target.value;
        if (value !== 'static') {
            value = JSON.parse(value);
        }
        this.setBackdrop(value);
    }

    changeKeyboard = (e) => {
        this.setKeyboard(e.currentTarget.checked);
    }

    render() {
        return (
            // <div>
            //     <Form inline onSubmit={(e) => e.preventDefault()}>
            //         <FormGroup>
            //             <Label for="backdrop">Backdrop value</Label>{' '}
            //             <Input type="select" name="backdrop" id="backdrop" onChange={changeBackdrop}>
            //                 <option value="true">true</option>
            //                 <option value="false">false</option>
            //                 <option value="static">"static"</option>
            //             </Input>
            //         </FormGroup>
            //         <FormGroup className="mx-2" check>
            //             <Label check>
            //                 <Input type="checkbox" checked={keyboard} onChange={changeKeyboard} /> Keyboard
            //             </Label>
            //         </FormGroup>
            //         {' '}
            //         <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
            //     </Form>
            //     <Modal isOpen={modal} toggle={toggle} className={className} backdrop={backdrop} keyboard={keyboard}>
            //         <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            //         <ModalBody>
            //             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            //         </ModalBody>
            //         <ModalFooter>
            //             <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
            //             <Button color="secondary" onClick={toggle}>Cancel</Button>
            //         </ModalFooter>
            //     </Modal>
            // </div>

            //toggle={() => this.toggleModal}
            <Modal isOpen={this.state.modal}  className={this.props.className} backdrop={this.state.backdrop} keyboard={this.state.keyboard}>
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.onHide}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.props.onHide}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );

    }


}

export default NewRequestModal;