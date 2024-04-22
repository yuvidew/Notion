'use client'

import Image from "next/image"
import {Button} from "../components/ui/button"
import Link from "next/link"

const error = () => {
    return (
        <div 
            className=" dark:bg-[#1f1f1f] h-full flex flex-col items-center justify-center space-y-4" 
        >
            <Image 
                src={'/error.png'} 
                height={"300"}
                width={"300"}
                alt = "Error"
                className="dark:hidden"
            />
            <Image 
                src={'/error-dark.png'} 
                height={"300"}
                width={"300"}
                alt = "Error"
                className=" hidden dark:block"
            />
            <h2 className=" text-xl font-medium" >
                Something went wrong!
            </h2>
            <Button asChild>
                <Link href={'/documents'}>Go back</Link>
            </Button>
        </div>
    )
}

export default error
