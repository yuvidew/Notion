'use client'
import { useUser } from "@clerk/clerk-react"
import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { toast } from "sonner"
import { Button } from "../../../components/ui/button"
import { MoreHorizontal, Trash } from "lucide-react"
import { Skeleton } from "../../../components/ui/skeleton"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"


const Menu = ({documentId}) => {
    console.log(documentId);
    const router = useRouter()
    const {user} = useUser()

    const archived = useMutation(api.documents.archive)

    const onArchived = () => {
        const promise = archived({
            id : documentId
        })

        toast.promise(promise , {
            loading : 'Moving to trash...',
            success : "Note moved to trash!",
            error : "Failed to archive note."
        })

        router.push("/documents")
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    size = "sm"
                    variant = "ghost"
                >
                    <MoreHorizontal className=" h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className = "w-60"
                align="end"
                alignOffset = {8}
                forceMount
            >

                <DropdownMenuItem onClick = {onArchived}>
                    <Trash className=" h-4 w-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                    <div className=" text-xs text-muted-foreground p-2">
                        Last edited by: {user.fullName}
                    </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Menu

Menu.Skeleton = function MenuSkeleton () {
    return <Skeleton/>
}