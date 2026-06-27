interface GalleryItem {
    id: number;
    title: string;
    description: string | null;
    image: string;
    created_at: Date;
}

interface Props {
    galleryItems: GalleryItem[];
}

// Alternating layout pattern like the original
function getColClass(index: number): string {
    const patterns = [
        "col-md-12 col-lg-6", // large
        "col-md-4 col-lg-3",  // small
        "col-md-4 col-lg-3",  // small
        "col-md-4 col-lg-3",  // small
        "col-md-4 col-lg-3",  // small
        "col-md-8 col-lg-6",  // medium
    ];
    return patterns[index % patterns.length];
}

function getWowClass(index: number): string {
    return index % 2 === 0 ? "fadeInUp" : "fadeInDown";
}

export default function HomeGallery({ galleryItems }: Props) {
    return (
        <>

            {
                galleryItems.length === 0 ? (
                    <div className="text-center py-5">

                    </div>
                ) : (
                    <div className="row g-4 popup-gallery">
                        {galleryItems.map((item, index) => (
                            <div className={getColClass(index)} key={item.id}>
                                <div
                                    className={`gallery-item wow ${getWowClass(index)} ${index === 0 ? "gallery-btn-active" : ""}`}
                                    data-wow-delay=".25s"
                                >
                                    <div className="gallery-img">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                        />
                                        <a
                                            className="popup-img gallery-link"
                                            href={item.image}
                                            title={item.title}
                                        >
                                            <i className="fal fa-plus" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

        </>

    );
}