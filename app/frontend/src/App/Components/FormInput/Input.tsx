import * as React from 'react'
import { FieldProps } from 'formik'
import './styles.scss'

interface IFormInputLabelProps {
  render?(name: string, props: IFormInputRestProps): JSX.Element
  text?: string
  elem?: JSX.Element
}

interface IFormInputRestProps {
  [k: string]: any
}

interface IFormInputProps extends FieldProps, IFormInputRestProps {
  label?: IFormInputLabelProps
  container?: IFormInputRestProps
}

export class FormInput extends React.Component<IFormInputProps, {}> {
  private labelProps: IFormInputLabelProps
  private containerProps: IFormInputRestProps
  private fieldProps: FieldProps['field']
  private inputProps: IFormInputRestProps

  constructor(props: IFormInputProps) {
    super(props)
    const { container = {}, label = {}, field, form, ...input } = props

    this.labelProps = label
    this.containerProps = container
    this.inputProps = input
    this.fieldProps = field
  }

  tryCreateLabel(): JSX.Element | null {
    const name = this.fieldProps.name
    const { render, text, ...labelProps } = this.labelProps
    switch (true) {
      case 'render' in this.labelProps:
        return this.labelProps.render!(name, labelProps)
      case 'text' in this.labelProps:
        return (
          <label className="input-label" htmlFor={name} {...labelProps}>
            {this.labelProps.text}
          </label>
        )
      case 'elem' in this.labelProps:
        return (
          <label className="input-label" htmlFor={name} {...labelProps}>
            {this.labelProps.elem!}
          </label>
        )
      default:
        return null
    }
  }

  chooseProperElement(): JSX.Element {
    const type = this.inputProps.type
    switch (type) {
      case 'select':
        return (
          <select className="input" {...this.fieldProps} {...this.inputProps} />
        )
      default:
        return (
          <input className="input" {...this.fieldProps} {...this.inputProps} />
        )
    }
  }

  renderErrorMessage() {
    const {
      field: { name },
      form
    } = this.props
    if (!(name in form.errors) || !(name in form.touched)) {
      return null
    }
    return <span className="input_error">{form.errors[name]}</span>
  }

  render() {
    return (
      <div {...this.containerProps}>
        {this.tryCreateLabel()}
        {this.chooseProperElement()}
        {this.renderErrorMessage()}
      </div>
    )
  }
}
