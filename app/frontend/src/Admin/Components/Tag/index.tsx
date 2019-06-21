import React from 'react'
import {IState, IProps } from './types'
import './styles.scss'

class Tag extends React.Component<IProps,IState> {
    state: Readonly<IState> = {
      isActive: false
    }

    handleRemoveTag = (tag: string) => {
        this.props.tags.splice(this.props.tags.indexOf(tag),1)
    }
    
    handleToggleClass = (tag: string) => {
        console.log(this.props.tags.includes(tag) )
        return (this.props.tags.includes(tag) ? "tagbtn selected" : "tagbtn ")  
    }

    render() {
        return( 
            <></> 
        )
    }
}

export default Tag