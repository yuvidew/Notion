'use client'

import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Skeleton } from "../../../components/ui/skeleton"
import { api } from "../../../convex/_generated/api"
import { useMutation } from "convex/react"
import { useRef, useState } from "react"

const Title = ({initialData}) => {
    const inputRef = useRef()
    const update = useMutation(api.documents.update)
    const [isEditing , setIsEditing] = useState(false)
    const [title , setTitle] = useState(initialData.title || "Untitled")

    const enableInput = () => {
        setTitle(initialData.title)
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        } , 0)
    }

    const disableInput = () => {
        setIsEditing(false)
    }

    const onChange = (e) => {
        setTitle(e.target.value)
        update({
            id : initialData._id,
            title:e.target.value || "Untitled"
        })
    }

    const onKeyDown = (e) => {
        if(e.key === "Enter"){
            disableInput();
        }
    }

    return (
        <div className=" flex items-center gap-x-1" >
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing ? (
                <Input 
                    ref={inputRef}
                    onClick = {enableInput}
                    onBlur = {disableInput}
                    onChange={onChange}
                    onKeyDown = {onKeyDown}
                    value = {title}
                    className =  " h-7 px-2 focus-visible:ring-transparent"
                />
            ) : (
                <Button
                    onClick = {enableInput}
                    variant = "ghost"
                    size = "sm"
                    className = "font-normal h-auto py-1 px-2"
                >
                    {initialData.title}
                </Button>
            )}
        </div>
    )
}

export default Title

Title.Skeleton = function TitleSkeleton(){
    return (
        <Skeleton 
            className={"h-8 w-16 rounded-md"}
        />
    )
}