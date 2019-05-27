export interface State {
  currentStep: number
  progress: number
  animation: boolean
}

export interface IProps {
  sliderRef: React.RefObject<HTMLDivElement>
}
