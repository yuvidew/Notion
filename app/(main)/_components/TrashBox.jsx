"use client"
import Spinner from '../../../components/Spinner'
import ConfirmModal from '../../../components/models/ConfirmModal'
import { Input } from '../../../components/ui/input'
import { api } from '../../../convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { Search, Trash, Undo } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const TrashBox = () => {
    const router = useRouter()
    const params = useParams()
    const documents = useQuery(api.documents.getTrash)
    const restore = useMutation(api.documents.restore)
    const remove = useMutation(api.documents.remove)

    const [search , setSearch] = useState("")
    const [filteredDoc , setFilteredDoc] = useState([])

    useEffect(() => {
        if(documents !== undefined){
            const filteredDocuments = documents.filter(doc => {
                return doc.title.toLowerCase().includes(search.toLowerCase())
            })
    
            setFilteredDoc(filteredDocuments)
        }
    } , [documents])

    console.log("filteredDoc" , filteredDoc);

    const onClick = (docId) => {
        router.push(`/documents/${docId}`)
    }

    const onReStore = (e , docId) => {
        e.stopPropagation()

        const promise = restore({
            id : docId
        })

        toast.promise(promise , {
            loading : 'Restoring note...',
            success : "Note restored!",
            error : "Failed to restore note."
        })

    }

    const onRemove = ( docId) => {

        const promise = remove({
            id : docId
        })

        toast.promise(promise , {
            loading : 'Deleting note...',
            success : "Note deleted!",
            error : "Failed to delete note."
        })

        if(params.documentId === docId ){
            router.push("/documents")
        }

    }

    if(documents === undefined){
        return(
            <div className=' h-full flex items-center justify-center p-4'>
                <Spinner size={"lg"}/>
            </div>
        )
    }

    return (
        <div className='text-sm dark:bg-[#1f1f1f]'>
            <div className=' flex items-center gap-x-2 p-2'>
                <Search className='h-4 w-4' />
                <Input 
                    value = {search}
                    onChange = {e => setSearch(e.target.value)}
                    className = "h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder = "Filter by page title..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className=' hidden last:block text-xs text-center text-muted-foreground pb-2'>
                    No documents found.
                </p>
                {filteredDoc.map((doc) => (
                    <div 
                        key={doc._id}
                        role = "button"
                        onClick={() => onClick(doc._id)}
                        className=' flex  text-sm rounded-sm w-full hover:bg-primary/5 
                        items-center text-primary justify-between'
                    >
                        <span className=' truncate pl-2'>
                            {doc.title}
                        </span>
                        <div className='flex items-center'>
                            <div
                                onClick={(e) => onReStore(e, doc._id)}
                                role=' button'
                                className=' rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                            >
                                <Undo className='h-4 w-4 text-muted-foreground '/>
                            </div>
                            <ConfirmModal
                                onConfirm={() => onRemove( doc._id)}
                            >
                                <div
                                    role=' button'
                                    className=' rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                                >
                                    <Trash className='h-4 w-4 text-muted-foreground '/>
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrashBox