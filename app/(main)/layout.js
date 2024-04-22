'use client'

import Spinner from "../../components/Spinner"
import { useConvexAuth } from "convex/react"
import { redirect } from "next/navigation"
import Navigation from "./_components/Navigation"
import SearchCommand from "../../components/SearchCommand"

const MainLayout = ({children}) => {
    const {isAuthenticated , isLoading} = useConvexAuth()
    if(isLoading){
        return (
            <div className=" h-full flex items-center justify-center dark:bg-[#1f1f1f]">
                <Spinner size={'lg'} />
            </div>
        )
    }

    if (!isAuthenticated) {
        return redirect('/')
    }

    return (
        <div className=" dark:bg-[#1f1f1f] h-full flex" >
            <Navigation/>
            <main className=" flex-1 h-full overflow-y-auto">
                <SearchCommand/>
                {children}
            </main>
        </div>
    )
}

export default MainLayout