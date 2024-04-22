'use client'

import { useEffect, useState } from "react"
import { SettingModel } from "../models/SettingsModal"
import CoverImageModels from "../models/CoverImageModels"


const ModalProvider = () => {
    const [isMounted , setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    } , []);

    

    if (!isMounted) return null;

    return (
        <>
            <SettingModel/>
            <CoverImageModels/>
        </>
    )
}

export default ModalProvider