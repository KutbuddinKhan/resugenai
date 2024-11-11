import React from 'react'

type Props = {}

const LandingLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default LandingLayout