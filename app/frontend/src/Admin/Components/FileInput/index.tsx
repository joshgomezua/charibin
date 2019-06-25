import React from 'react'
import { IProps, IState } from './types'
import './styles.scss'

export default class FileInput extends React.Component<IProps, IState> {
  state: Readonly<IState> = {
    name: ''
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    const reader = new FileReader()
    
    reader.onloadend = () => {
      if (!allowedFileTypes.includes(file.type)) {
        this.props.handleSetError('photo', 'Illegal file extension')
      } else if (file.size / 1048576 > 4.5) {
        this.props.handleSetError('photo', 'The size of the picture is too big')
      } else {
        this.props.handleChange({
          target: { id: 'photo', value: reader.result as string }
        })
        this.setState({ name: file.name })
      }
    }
    reader.readAsDataURL(file)
  }

  render() {
    const { name } = this.state

    return (
      <div className="spon-file-input">
        <input type="file" id="file" onChange={this.handleChange} />
        <label htmlFor="file">Upload File</label>
        <p>{name ? name : 'No photo selected'}</p>
      </div>
    )
  }
}
