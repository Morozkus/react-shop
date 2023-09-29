import React from 'react'
import DeviceCard from './DeviceCard'
import { Row, Spinner } from 'react-bootstrap'
import { useAppSelector } from '../hooks/redux'
import { basketAPI } from '../Service/BasketService'

const BasketList = () => {
    const { basketId } = useAppSelector(state => state.user)
    const { data: devices, isLoading } = basketAPI.useGetBasketQuery(basketId || false)
    return (
        <Row className="d-flex justify-content-around align-items-center">
            {isLoading && <Spinner />}
            {(devices?.length && devices.map(device =>
                <DeviceCard key={device.id} id={device.id} img={device.img} name={device.name} rating={device.rating} />
            )) || <h1>Избранных товаров нет</h1>}
        </Row>
    )
}

export default BasketList