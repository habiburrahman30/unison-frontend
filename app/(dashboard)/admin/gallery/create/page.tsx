import CreateGalleryForm from "@/components/dashboard/CreateGalleryForm";


export default function CreateGalleryPage() {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Add Gallery Image</h4>
                    <div className="user-form">
                        <CreateGalleryForm />
                    </div>
                </div>
            </div>
        </div>
    );
}