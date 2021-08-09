import TextField from '@material-ui/core/TextField'
import React, {ChangeEventHandler} from 'react'

interface IDataPickers {
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

export const DatePickers = ({label, onChange, value}: IDataPickers) => {
  return (
    <form noValidate>
      <TextField
        id="date"
        label={label}
        type="date"
        value={value}
        fullWidth
        onChange={onChange}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  )
}
