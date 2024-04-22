'use client'

import { useMutation, useQuery } from "convex/react"
import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react"

import ToolBar from "../../../../../components/ToolBar"
import Cover from "../../../../../components/Cover"
import { Skeleton } from "../../../../../components/ui/skeleton"
import { api } from "../../../../../convex/_generated/api"
import { useParams } from "next/navigation"
// import Editor from "../../../../../components/Editor"


const DocumentIdPage = () => {
    const url = useParams() 
    const Editor = useMemo(() => dynamic(() => import("../../../../../components/Editor")),{ssr : false} , [])
    const document = useQuery(api.documents.getById , {
        documentId : url.doucmentId
    })

    const update = useMutation(api.documents.update)

    const onChange = (content) => {
        update({
            id:url.doucmentId,
            content
        })
    }

    if(document === undefined) {
        return (
        <div>
            <Cover.Skeleton/>
            <div className=" md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                <div className=" space-y-4 pl-8 pt-4">
                    <Skeleton className={"h-14 w-[50%]"} />
                    <Skeleton className={"h-4 w-[80%]"} />
                    <Skeleton className={"h-4 w-[40%]"} />
                    <Skeleton className={"h-4 w-[60%]"} />
                </div>
            </div>
        </div>
        )
    }

    if(document === null){
        return <div>Not found</div>
    }

    return (
        <div className=" dark:bg-[#1f1f1f] pb-40">
        <Cover preview  url = {document.coverImage} />
            <div className=" md:max-w-3xl lg:max-w-4xl mx-auto">
                <ToolBar preview initialData = {document} />
                <Editor 
                    editable={false}
                    onChange={onChange} 
                    initialContent={document.content}
                />
            </div>
        </div>
    )
}

export default DocumentIdPage