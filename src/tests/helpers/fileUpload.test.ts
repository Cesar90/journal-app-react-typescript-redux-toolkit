import { v2 as cloudinary } from 'cloudinary';
//@ts-ignore
import { VITE_CLOUDINARY_CN } from "../../constants";
import { fileUpload } from "../../helpers";

cloudinary.config({
    cloud_name: 'testtt',
    api_key: '52345325324',
    api_secret: '53245324fdgdsgdg',
    secure: true
})

jest.mock('../../constants', () => ({
    VITE_CLOUDINARY_CN: '',
}));

describe("Testing in fileUpload", () => {
    // test("must of upload the file successfully to cloudinary", async () => {
    //     const imageUrl = "https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png";
    //     const resp = await fetch(imageUrl);
    //     const blob = await resp.blob();
    //     const file = new File([blob], 'image.png');
    //     const url = await fileUpload(file);
    //     expect(typeof url).toBe('string');

    //     if (url) {
    //         const segments = url.split("/");
    //         const imageId = segments[segments?.length - 1].replace(".jpg", "");
    //         console.log({ imageId });
    //         await cloudinary.api.delete_resources(['journal/' + imageId], {
    //             resource_type: 'image'
    //         });
    //     }
    // });

    test("must return null", async () => {
        const file = new File([], "image.png");
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
});