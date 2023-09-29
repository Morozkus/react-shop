import React from 'react'
import DeviceCard from './DeviceCard'
import { Row, Spinner } from 'react-bootstrap'
import { deviceAPI } from '../Service/DeviceService'
import { useAppSelector } from '../hooks/redux'

const DeviceBar = () => {
  const {selectedBrand, selectedType} = useAppSelector(state => state.device)
  const { data: devices, isLoading } = deviceAPI.useGetDevicesQuery({brandId: selectedBrand?.id, typeId: selectedType?.id}, {refetchOnMountOrArgChange: true})
  return (
    <Row className="d-flex">
      {isLoading && <Spinner />}
      {devices && devices.rows.map(device =>
        <DeviceCard key={device.id} id={device.id} img={device.img} name={device.name} rating={device.rating}/>
      )}
    </Row>
  )
}

export default DeviceBar