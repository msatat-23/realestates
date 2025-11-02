import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { Readable } from 'stream';
cloudinary.config({
    cloud_name: env.process.CLOUDINARY_CLOUD_NAME,
    api_key: env.process.CLOUDINARY_API_KEY,
    api_secret: env.process.CLOUDINARY_API_SECRET
});
export const runtime = "nodejs";
export const POST = async (req) => {
    const fd = await req.formData();
    const file = fd.file;
    const id = fd.id;
    const folderpath = `user-images/${id}`;
    try {
        const result = await new Promise(
            (resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({
                    folder: folderpath,
                    resource_type: "image",
                    use_filename: true
                },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    });
                const nodeStream = Readable.fromWeb(file.stream());
                nodeStream.pipe(stream);
            }
        );

        return new NextResponse.json({
            message: 'تم رفع صورة المستخدم بنجاح',
            url: result.secure_url,
            public_id: result.public_id
        });
    }
    catch (e) {
        console.error(' خطأ أثناء الرفع:', e);
        return NextResponse.json(
            { error: 'فشل الرفع', details: e.message },
            { status: 500 }
        );
    }
};