import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FC } from 'react'
import { SxProps, Theme } from '@mui/material'

interface ICustomSelectProps {
  selectItems: string[]
  value: string
  onChangeCallback: (value: string) => void
  label?: string
  sx?: SxProps<Theme>
}

export const CustomSelect: FC<ICustomSelectProps> = ({
  value,
  label,
  onChangeCallback,
  selectItems,
  sx,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChangeCallback(event.target.value as string)
  }

  return (
    <Box sx={sx}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {selectItems.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
