import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { Box, Button, Card, SxProps, TextField, Theme } from '@mui/material'
import { CustomSelect } from './Select/Select'
import axios from 'axios'
import _ from 'lodash'

const currency = ['USD', 'EUR']
const selectStyle: SxProps<Theme> = {
  minWidth: '100px',
}

interface ICurrencyConverterProps {}

export const CurrencyConverter: FC<ICurrencyConverterProps> = () => {
  const [data, setData] = useState<{
    date: string
    rates: { [key: string]: number }
  } | null>(null)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [currencyFrom, setCurrencyFrom] = useState('')
  const [currencyTo, setCurrencyTo] = useState('')

  const onChangeQueryHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setQuery(e.currentTarget.value)
  }

  const reset = () => {
    setError('')
    setData(null)
    setQuery('')
    setCurrencyTo('')
    setCurrencyFrom('')
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceChangeCurrency = useCallback(
    _.debounce((value: string) => {
      const getCurrency = async () => {
        try {
          const url = `http://api.frankfurter.app/latest?amount=${value}&from=${currencyFrom}&to=${currencyTo}`
          const res = await axios.get(url)
          setData(res.data)
        } catch (error: any) {
          setError(error.code)
        }
      }
      getCurrency()
    }, 3000),
    [query, currencyTo, currencyFrom],
  )

  useEffect(() => {
    if (!currencyTo || !query || !currencyFrom) return
    debounceChangeCurrency(query)
  }, [query, currencyTo, currencyFrom, debounceChangeCurrency])

  useEffect(() => {
    if (error) {
      alert(`${error} - The entered currencies match`)
      reset()
    }
  }, [error])

  return (
    <Card sx={{ width: '50%' }}>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          margin: 3,
        }}
      >
        <TextField value={query} onChange={onChangeQueryHandler} />
        <CustomSelect
          selectItems={currency}
          value={currencyFrom}
          onChangeCallback={setCurrencyFrom}
          sx={selectStyle}
          label="From"
        />
        <CustomSelect
          selectItems={currency}
          value={currencyTo}
          onChangeCallback={setCurrencyTo}
          sx={selectStyle}
          label="To"
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <p>{data?.rates[currencyTo]}</p>
        <Button onClick={reset}>RESET</Button>
      </Box>
    </Card>
  )
}
