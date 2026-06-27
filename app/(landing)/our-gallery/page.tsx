import OurGalleryPage from "@/components/landing/OurGalleryPage";
import { prisma } from "@/lib/prisma";


export default async function OurGalleryServerPage() {
    const galleryItems = await prisma.gallery.findMany({
        orderBy: { created_at: "desc" },
    });

    return <OurGalleryPage galleryItems={galleryItems} />;
}