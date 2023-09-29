import React, { FC } from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PUBLIC_ROUTES } from '../routes/router'
import star from '../assets/img/smallStar.png'
import { IDevice } from '../models/Device'

type TDeviceCard = Pick<IDevice, 'id' | 'img' | 'name' | 'rating'>

const DeviceCard: FC<TDeviceCard> = ({ id, img, name, rating }) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(PUBLIC_ROUTES.DEVICE_ROUTE + '/' + id)}>
            <Card style={{ width: 150, cursor: 'pointer' }} border={"light"}>
                <Image width={150} height={150} src={'http://localhost:5000/' + img} />
                <div className="text-black-50 mt-1 d-flex">
                    <div style={{ width: 150 }} className="d-flex justify-content-between">
                        <div>{name}</div>
                        <div>{rating}<Image width={18} height={18} src={star} /></div>

                    </div>
                </div>
            </Card>
        </Col>
    )
}

export default DeviceCard