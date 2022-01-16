import React from 'react'
import Alert from '@material-ui/lab/Alert' 
const AlertMessage = (props) => {
    const {messageType ,message}=props
    return (
        <div>
            
           <Alert severity={messageType}>{message}!</Alert>   
        
        </div>
    )
}

export default AlertMessage
