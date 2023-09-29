import React from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import { deviceAPI } from '../Service/DeviceService';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { DeviceSlice } from '../store/reducers/DeviceSlice';

const TypeBar = () => {
    const { data: types } = deviceAPI.useGetTypesQuery(null)
    const dispatch = useAppDispatch()
    const { selectedType } = useAppSelector(state => state.device)
    const { setType } = DeviceSlice.actions

    return (
        <ListGroup>
            {types && types.map(type =>
                <ListGroup.Item
                    style={{ cursor: 'pointer' }}
                    key={type.id}
                    onClick={() => dispatch(setType(type))}
                    active={(selectedType && selectedType.id === type.id) ? true : false}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default TypeBar;