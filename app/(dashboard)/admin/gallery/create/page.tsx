import CreateBrandForm from "@/components/dashboard/CreateBrandForm";



export default function CreateGalleryPage() {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Create Gallery</h4>
                    <div className="user-form">
                        <CreateBrandForm />
                    </div>
                </div>
            </div>
        </div>
    );
}