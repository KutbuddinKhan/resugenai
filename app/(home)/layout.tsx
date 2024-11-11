import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const MainLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { isAuthenticated, getUser } = getKindeServerSession()
    const isUserAuthenticated = await isAuthenticated()

    const user = await getUser()
    console.log(user.id)

    if (!isUserAuthenticated) {
        redirect("/")
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default MainLayout