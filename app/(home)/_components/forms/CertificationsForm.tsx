import React, { useCallback, useEffect } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import useUpdateDocument from "@/features/document/use-update-documents";
import { Plus, X, Loader2 } from "lucide-react";

const initialState = {
    id: undefined,
    docId: undefined,
    title: "",
    issuer: "",
    issueDate: "",
    description: "",
};

const CertificationsForm = (props: { handleNext: () => void }) => {
    const { handleNext } = props;
    const { resumeInfo, onUpdate } = useResumeContext();
    const { mutateAsync, isPending } = useUpdateDocument();

    const [certificates, setCertificates] = React.useState(() => {
        return resumeInfo?.certificates?.length
            ? resumeInfo.certificates
            : [initialState];
    });

    useEffect(() => {
        if (!resumeInfo) return;
        onUpdate({
            ...resumeInfo,
            certificates,
        });
    }, [certificates]);

    const handleChange = (
        e: { target: { name: string; value: string } },
        index: number
    ) => {
        const { name, value } = e.target;
        setCertificates((prevState) => {
            const updatedCertificates = [...prevState];
            updatedCertificates[index] = {
                ...updatedCertificates[index],
                [name]: value,
            };
            return updatedCertificates;
        });
    };

    const addNewCertificate = () => {
        setCertificates([...certificates, initialState]);
    };

    const removeCertificate = (index: number) => {
        const updatedCertificates = [...certificates];
        updatedCertificates.splice(index, 1);
        setCertificates(updatedCertificates);
    };

    const handleSubmit = useCallback(
        async (e: { preventDefault: () => void }) => {
            e.preventDefault();

            await mutateAsync(
                { certificates },
                {
                    onSuccess: () => {
                        toast({
                            title: "Success",
                            description: "Certifications updated successfully",
                        });
                        handleNext();
                    },
                    onError: () => {
                        toast({
                            title: "Error",
                            description: "Failed to update certifications",
                            variant: "destructive",
                        });
                    },
                }
            );
        },
        [certificates]
    );

    return (
        <div>
            <div className="w-full">
                <h2 className="font-bold text-lg">Certifications</h2>
                <p className="text-sm">Add details about your certifications</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div
                    className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5"
                >
                    {certificates.map((certificate, index) => (
                        <div key={index}>
                            <div
                                className="relative grid grid-cols-2 mb-5 pt-4 gap-3"
                            >
                                {certificates.length > 1 && (
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        disabled={isPending}
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                                        size="icon"
                                        onClick={() => removeCertificate(index)}
                                    >
                                        <X size="13px" />
                                    </Button>
                                )}
                                <div className="col-span-2">
                                    <Label className="text-sm">Certificate Name</Label>
                                    <Input
                                        name="name"
                                        placeholder=""
                                        required
                                        value={certificate.title || ""}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Label className="text-sm">Issuer</Label>
                                    <Input
                                        name="issuer"
                                        placeholder=""
                                        required
                                        value={certificate.issuer || ""}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm">Issue Date</Label>
                                    <Input
                                        name="issueDate"
                                        type="date"
                                        placeholder=""
                                        required
                                        value={certificate.issueDate || ""}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div className="col-span-2 mt-1">
                                    <Label className="text-sm">Description</Label>
                                    <Textarea
                                        name="description"
                                        placeholder=""
                                        value={certificate.description || ""}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                            </div>
                            {index === certificates.length - 1 &&
                                certificates.length < 5 && (
                                    <Button
                                        className="gap-1 mt-1 text-primary border-primary/50"
                                        variant="outline"
                                        type="button"
                                        disabled={isPending}
                                        onClick={addNewCertificate}
                                    >
                                        <Plus size="15px" />
                                        Add Another Certification
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button className="mt-4" type="submit" disabled={isPending}>
                    {isPending && <Loader2 size="15px" className="animate-spin" />}
                    Save Changes
                </Button>
            </form>
        </div>
    );
};

export default CertificationsForm;
