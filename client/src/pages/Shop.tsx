import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BrandBar from '../components/BrandBar'
import TypeBar from '../components/TypeBar'
import DeviceBar from '../components/DeviceBar'

const Shop = () => {
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceBar />
        </Col>
      </Row>
    </Container>
  )
}

export default Shop