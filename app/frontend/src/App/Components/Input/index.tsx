import React from 'react'
import { FieldProps } from 'formik'
import { Form, Input } from 'antd'
import { IProps } from './types'

const InputComponent: React.SFC<FieldProps & IProps> = ({
  field,
  className,
  label,
  type = 'input'
}) => {
  return (
    <Form.Item className={className} label={label}>
      {type === 'input' ? (
        <Input
          id={field.name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
        />
      ) : (
        <Input.TextArea
          id={field.name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
        />
      )}
    </Form.Item>
  )
}

export default InputComponent
