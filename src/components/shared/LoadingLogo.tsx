import React from 'react'

type Props = {}

const LoadingLogo = (props: Props) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="loader w-[60px] aspect-square rounded-full bg-[#ff2058db]" />
        </div>
    )
}

export default LoadingLogo;