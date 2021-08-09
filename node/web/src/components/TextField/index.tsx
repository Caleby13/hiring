import {Grid} from '../Grid'
import {TextField as TextFieldMaterial} from '@material-ui/core'
import {ChangeEventHandler} from 'react'

interface ITextField {
  placeHolder?: string
  defaultValue?: string
  type?: string
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  xs:
    | boolean
    | 2
    | 1
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 'auto'
    | 11
    | 12
    | undefined
  label?: string
}

export const TextField = ({
  placeHolder,
  defaultValue,
  type = 'text',
  onChange,
  xs,
  label = ''
}: ITextField) => {
  return (
    <Grid type={'item'} xs={xs}>
      <TextFieldMaterial
        label={label}
        fullWidth
        placeholder={placeHolder}
        defaultValue={defaultValue}
        type={type}
        onChange={onChange}
      />
    </Grid>
  )
}
