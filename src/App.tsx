import React from 'react'
import { Box } from '@mui/material'
import {CurrencyConverter} from "./components/CurrencyConverter";

function App() {
  return <Box sx={{width:'100%', display: 'flex', justifyContent: 'center'}}>
    <CurrencyConverter/>
  </Box>
}

export default App
