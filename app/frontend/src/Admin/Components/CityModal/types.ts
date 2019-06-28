export interface IProps {
    editDate?: IFormValues & { _id: string }
    isLoading: boolean
    closeModal: () => void
    handleSubmit?: (data: any) => Promise<void>
    handleEditCity?: (data: IEditValues) => Promise<void>
}

export interface IFormValues {
    name: string
    country?: string
    tags?: string[]
    photo?: string
    isManual?: boolean
    isEnabled?: boolean
}

export type IEditValues = Partial<IFormValues>