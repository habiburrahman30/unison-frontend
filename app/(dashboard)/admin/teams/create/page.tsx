import CreateTeamForm from "@/components/dashboard/CreateTeamForm";


export default function CreateTeamPage() {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Add Team Member</h4>
                    <div className="user-form">
                        <CreateTeamForm />
                    </div>
                </div>
            </div>
        </div>
    );
}