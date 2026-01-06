import CreateBrandForm from "@/components/dashboard/CreateBrandForm";



export default function CreateTeamPage() {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Create Team</h4>
                    <div className="user-form">
                        <CreateBrandForm />
                    </div>
                </div>
            </div>
        </div>
    );
}