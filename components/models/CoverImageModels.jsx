'use client';
import { useState } from "react";
import { useEdgeStore } from "../../lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "../../components/ui/dialog"
import useCoverImage from "../../hooks/useCoverImage";
import { SingleImageDropzone } from "../../components/SingleImageDropDown";
import { useParams } from "next/navigation";


const CoverImageModels = () => {
    const params = useParams() 
    const update = useMutation(api.documents.update)
    const coverImg = useCoverImage()
    const {edgestore} = useEdgeStore()
    const [file , setFile] = useState()
    const [isSubmitting , setIsSubmitting] = useState(false)

    const onClose = () => {
        setFile(undefined)
        setIsSubmitting(false)
        coverImg.onClose();
    }

    const onChange = async (file) => {
        if(file){
            setIsSubmitting(true)
            setFile(file)

            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImg.url,
                },
            });


            await update({
                id : params.documentId ,
                coverImage : res.url
            })

            onClose()
        }
    }

    return (
        <Dialog 
            open = {coverImg.isOpen} 
            onOpenChange={coverImg.onClose}
        >
        <DialogContent>
            <DialogHeader>
                <h2 className=" text-center text-lg font-semibold">
                    Cover Image
                </h2>
            </DialogHeader>
            <SingleImageDropzone 
                className = "w-full outline-none"
                disabled = {isSubmitting}
                value = {file}
                onChange = {onChange}
            />
        </DialogContent>
        </Dialog>

    )
}

export default CoverImageModels