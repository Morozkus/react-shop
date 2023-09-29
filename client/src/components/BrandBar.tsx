import React from 'react'
import { Card, Col } from "react-bootstrap";
import { deviceAPI } from '../Service/DeviceService'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { DeviceSlice } from '../store/reducers/DeviceSlice';

const BrandBar = () => {
    const { data: brands } = deviceAPI.useGetBrandsQuery(null)
    const dispatch = useAppDispatch()
    const { selectedBrand } = useAppSelector(state => state.device)
    const { setBrand } = DeviceSlice.actions

    return (
        <Col className="d-flex g-1">
            {brands && brands.map(brand =>
                <Card
                    style={{ cursor: 'pointer' }}
                    key={brand.id}
                    className="p-3"
                    onClick={() => dispatch(setBrand(brand))}
                    border={(selectedBrand && selectedBrand.id === brand.id) ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Col>
    );
};

export default BrandBar;