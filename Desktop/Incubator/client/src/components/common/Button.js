import * as React from 'react';
import Button from '@mui/material/Button';
import "../../App.css"
export default function BasicButtons({ title, handleAction }) {
    return (
        <Button variant="contained" onClick={handleAction}>{title}</Button>
    );
}