import { Spinner } from "@/components/ui/spinner"
import { useState } from "react";
import Header from '../components/Header.tsx'


function Loading() {
    const [sidebarOpen, setsidebarOpen] = useState(true);
    return (
        <>
            <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
            <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center bg-white border border-(--borderColor) rounded-xl p-12 shadow-sm max-w-2xl mx-auto my-8 dark:bg-zinc-900 dark:border-zinc-800">
                <Spinner className="w-12 h-12"></Spinner>
            </div>
        </>
    )
}

export default Loading