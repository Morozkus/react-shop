import React, { useState, FC } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { deviceAPI } from '../../Service/DeviceService'

interface ICreateBrand {
    show: boolean | undefined,
    onHide(): void
}

const CreateType: FC<ICreateBrand> = ({ onHide, show }) => {
    const [value, setValue] = useState('')
    const [CreateType, {}] = deviceAPI.useCreateTypeMutation()
    const addType = () => {
        if (value.length) {
            onHide()
            CreateType({name: value, token: localStorage.getItem('token') || ''})
        } else {
            alert('Введите название!')
        }
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateType