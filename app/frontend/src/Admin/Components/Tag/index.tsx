import React from 'react'
import {IState, IProps } from './types'
import './styles.scss'
import { TAGS } from 'src/Admin/Utils/constants';

class Tag extends React.Component<IProps,IState> {
    state: Readonly<IState> = {
      isActive: false
    }

    

    handleRemoveTag = (tag: string) => {
        this.props.tags.splice(this.props.tags.indexOf(tag),1)
        this.setState({isActive: !this.state.isActive})
    }
    
    handleToggleClass = (tag: string) => {
        return ((this.props.editDate && this.props.tags.includes(tag)) ? "tagbtn selected" : "tagbtn ")  
    }

    handleAddTag = (tag: string) => {
        if ( !this.props.tags.includes(tag)) {
            this.setState({isActive: !this.state.isActive})
            this.props.tags.push(tag)
        } else {
            this.handleRemoveTag(tag)
        }
    }

    render() {
        
        return( 
            TAGS.map((tag) => {
                return(
                    <button
                    type = "button"
                    key = {tag}
                    className = {this.handleToggleClass(tag)}
                    onClick = { () => {
                        this.handleAddTag(tag)}
                    }
                    >
                    {tag}
                    </button>
                )

            })

        )
    }
}

export default Tag