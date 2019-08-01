export interface IProps {
  items: Array<ICity | IDay | string>
  id?: string
  selectedValues: Array<string | number>
  className?: string
  isMulti?: boolean
  coloredNames?: boolean
  heading?: string
  onChange: (value: string | boolean | number, id?: string | number) => void
}

export interface ICity {
  _id: string
  name: string
}

export interface IDay {
  _id: number
  name: string
}
