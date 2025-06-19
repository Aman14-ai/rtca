import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>

const ConversationContainer = ({ children }: Props) => {
    return (
        <>
            {children}
        </>
    )
}

export default ConversationContainer