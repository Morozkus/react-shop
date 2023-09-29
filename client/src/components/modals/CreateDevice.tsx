import React, { FC, useState } from 'react'
import { Modal, Form, Dropdown, Button, Row, Col } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { DeviceSlice } from '../../store/reducers/DeviceSlice'
import { deviceAPI } from '../../Service/DeviceService'
import { INFO, IPostDevice } from '../../models/Device'

interface ICreateDevice {
  show: boolean | undefined,
  onHide(): void
}

const CreateDevice: FC<ICreateDevice> = ({ onHide, show }) => {
  const dispatch = useAppDispatch()
  const { selectedType, selectedBrand } = useAppSelector(state => state.device)
  const { setBrand, setType } = DeviceSlice.actions

  const { data: types } = deviceAPI.useGetTypesQuery(null)
  const { data: brands } = deviceAPI.useGetBrandsQuery(null)
  const [createDevice, { }] = deviceAPI.useCreateDeviceMutation()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState<any>(null)
  const [info, setInfo] = useState<INFO[]>([])

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }
  const removeInfo = (number: number) => {
    setInfo(info.filter(i => i.number !== number))
  }
  const changeInfo = (key: any, value: string | number, number: number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
  }
  const selectFile = (e: any) => {
    setFile(e.target.files[0])
  }
  const addDevice = async () => {
    if (!selectedBrand || !selectedType) {
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', String(selectedBrand.id))
    formData.append('typeId', String(selectedType.id))
    formData.append('info', JSON.stringify(info))
    await createDevice(formData)
    onHide()
    clearStates()
  }
  const clearStates = () => {
    setName('')
    setPrice(0)
    setFile(null)
    setInfo([])
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{selectedType?.name || "Выберите тип"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {types && types.map(type =>
                <Dropdown.Item
                  onClick={() => dispatch(setType(type))}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{selectedBrand?.name || "Выберите тип"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {brands && brands.map(brand =>
                <Dropdown.Item
                  onClick={() => dispatch(setBrand(brand))}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название устройства"
          />
          <Form.Control
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введите стоимость устройства"
            type="number"
          />
          <Form.Control
            className="mt-3"
            type="file"
            onChange={selectFile}
          />
          <hr />
          <Button
            variant={"outline-dark"}
            onClick={addInfo}
          >
            Добавить новое свойство
          </Button>
          {info.map(i =>
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant={"outline-danger"}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateDevice