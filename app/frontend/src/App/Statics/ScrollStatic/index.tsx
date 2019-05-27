import React from 'react'
import mouse from '../../Utils/Media/mouse.svg'
import './styles.scss'

interface IProps {
  onClick: () => void
}

const ScrollStatic: React.SFC<IProps> = ({ onClick }) => (
  <div onClick={onClick} className="scroll">
    <img src={mouse} alt="mouse" />
    <span>Scroll down to get more info</span>
  </div>
)

export default ScrollStatic
