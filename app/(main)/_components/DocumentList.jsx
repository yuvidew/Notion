'use client'

import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation"
import { useState } from "react";
import { Item } from "./Item";
import { cn } from "../../../lib/utils";
import { FileIcon } from "lucide-react";

const DocumentList = ({
    parentDocumentId,
    level = 1 ,
}) => {
    const params = useParams();
    const router = useRouter();
    const [expanded , setExpanded] = useState([])

    const onExpand = (documentId) => {
        setExpanded(prev => ({
            ...prev,
            [documentId] : !prev[documentId]
        }))
    }

    const document = useQuery(api.documents.getSideBar , {
        parentDocument : parentDocumentId
    })

    // console.log(document);

    const onRedirect = (documentId) => {
        router.push(`/documents/${documentId}`)
    }

    if(document === undefined){
        return (
            <>
                <Item.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.Skeleton level = {level} />
                        <Item.Skeleton level = {level} />
                    </>
                )}
            </>
        )
    }


    return (
        <>
            <p 
                style={{
                    paddingLeft : level ? `${(level * 12) + 25}px` : undefined
                }}
                className={cn(
                    "hidden text-sm font-medium  text-muted-foreground/80",
                    expanded && "last:block",
                    level === 0 && "hidden"
                )}
            >No Page inside</p>
            
            {/* {expanded} */}
            {document != undefined && document.map(ele => {
                if(expanded !== undefined){
                    return(
                    <div key={ele._id}>
                        <Item 
                            id={ele._id}
                            onClick={() => onRedirect(ele._id)}
                            label={ele.title}
                            Icon={FileIcon}
                            documentIcon={ele.icon}
                            active={params.documentId === ele._id}
                            level={level}
                            onExpand={() => onExpand(ele._id)}
                            expanded={expanded[ele._id]}
                            
                        />
                        {/* {expanded[ele._id]} */}
                        { expanded[ele._id] && (
                            <DocumentList 
                                parentDocumentId={ele._id}
                                level={level + 1}
                            />
                        )}
                    </div>
                    )
                }
            }) }
        </>

    )
}

export default DocumentList