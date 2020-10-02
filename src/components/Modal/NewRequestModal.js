import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import NewRequestForm from '../Form/NewRequestForm'

class NewRequestModal extends Component {

    state = {
        modal: false,
        backdrop: false,
        keyboard: false,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
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
            <Modal size="lg"
                   isOpen={this.state.modal}
                   className={this.props.className}
                   backdrop={this.state.backdrop}
                   keyboard={this.state.keyboard}>
                <ModalHeader>New Request Form</ModalHeader>

                <ModalBody>

                    <NewRequestForm hideModal={this.props.onHide}/>

                </ModalBody>

            </Modal>
        );

    }


}

export default NewRequestModal;