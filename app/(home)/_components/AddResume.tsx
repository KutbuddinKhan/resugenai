"use client"
import useCreateDocument from "@/features/document/use-create-document";
import { FileText, Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const AddResume = () => {
    const router = useRouter()
    const { isPending, mutate } = useCreateDocument();

    const onCreate = useCallback(() => {
        mutate(
            {
                title: "Untitled Resume"
            },
            {
                onSuccess: (response) => {
                    const documentId = response.data.documentId;
                    router.push(`/dashboard/document/${documentId}/edit`);
                },
            }
        );
    }, [mutate, router])

    return (
        <>
            <div
                role="button"
                className="p-[2px] cursor-pointer rounded-xl transition-all hover:shadow-lg hover:-translate-y-1 shadow-md overflow-hidden"
                onClick={onCreate}
            >
                <div className="py-24 h-[183px] flex flex-col rounded-lg gap-2 items-center justify-center border bg-white hover:border-primary transition hover:shadow dark:bg-secondary">
                    <span>
                        <Plus size="30px" />
                    </span>
                    <p className="text-sm font-semibold">Blank Resume</p>
                </div>
            </div>

            {isPending && (
                <div className="fixed top-0 left-0 z-[9999] right-0 flex flex-col gap-2 items-center justify-center backdrop-blur bg-black/30 w-full h-full">
                    <Loader2 size="35px" className="animate-spin" />
                    <div className="flex items-center gap-2">
                        <FileText />
                        <span className="text-sm font-semibold">Creating...</span>
                    </div>
                </div>
            )}
        </>
    )
}
export default AddResume;