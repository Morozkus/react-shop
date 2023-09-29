import React from 'react'
import { Container, Row, Col, Card, Button, Image, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { deviceAPI } from '../Service/DeviceService'
import bigStar from '../assets/img/star.png'
import { basketAPI } from '../Service/BasketService'
import { useAppSelector } from '../hooks/redux'

const DevicePage = () => {

  const { id } = useParams()
  const { data: device } = deviceAPI.useGetDeviceByIdQuery(Number(id))
  const [pushInBasket, { }] = basketAPI.usePushInBasketMutation()

  const { basketId } = useAppSelector(state => state.user)

  const addInBasket = async () => {
    await pushInBasket({basketId: basketId || false, deviceId: Number(id)})
  }

  if (!device) {
    return (
      <Spinner />
    )
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={'http://localhost:5000/' + device.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>От: {device.price} руб.</h3>
            <Button variant={"outline-dark"} onClick={addInBasket}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info && device.info.map((info, index) =>
          <Row key={info.number} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
            {info.title}: {info.description}
          </Row>
        )}
      </Row>
    </Container>
  )
}

export default DevicePage