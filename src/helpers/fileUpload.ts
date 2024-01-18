import { VITE_CLOUDINARY_CN } from "../constants";

export const fileUpload = async (file: File) => {
    if (!file) {
        // throw new Error("Please select a file");
        return null;
    }
    //react-journal
    const cloudUrl = `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_CN}/upload`;
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: "POST",
            body: formData
        });
        if (!resp.ok) {
            throw new Error("Error to upload image");
        }

        const cloudResp = await resp.json() as { secure_url: string };
        return cloudResp.secure_url;

    } catch (error) {
        // let errorMessage = "";
        // if (typeof error === 'object' && error !== null && "message" in error) {
        //     errorMessage = error.message as string
        // }
        // throw new Error(errorMessage);
        console.log(error);
        return null;
    }
}