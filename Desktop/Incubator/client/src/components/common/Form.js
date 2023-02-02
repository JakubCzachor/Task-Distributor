import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from './Button';
import styled from "styled-components";
import '../../App.css'
const Container = styled.div`
  background-color: #F2F2F2;
  padding-top: 200px;
  padding-bottom: 200px;
  margin-right:600px;
  margin-left: 600px;
  margin-top:600px;
  background: #EB8C8C;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: 20000px) {
    width: 30%;
    margin: 0 auto;
  }
`;
export default function BasicTextFields({ title, setPassword, setEmail, handleAction }) {
    return (
        <Container>
        <div>
            <div className="heading-container">
                <h3>
                    {title}
                </h3>
            </div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="email"
                    label="E-mail..."
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password..."
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>

            <Button title={title} handleAction={handleAction} />
            </div>
            </Container>
    );
}