export interface IProps {
    editDate?: IFormValues & { _id: string }
    isLoading: boolean
    closeModal: () => void
    handleSubmit?: (data: any) => Promise<void>
    handleEditUser?: (data: IEditValues) => Promise<void>
  }
  
  export interface IFormValues {
    name: string
    email: string
    role: string
    active: boolean
  }
  
  export type IEditValues = Partial<IFormValues>
  