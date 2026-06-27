import { notFound } from "next/navigation";
import { getTeamMemberById } from "@/lib/api/teams";
import EditTeamForm from "@/components/dashboard/EditTeamForm";


interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditTeamPage({ params }: PageProps) {
    const { id } = await params;
    const member = await getTeamMemberById(Number(id));

    if (!member) notFound();

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Edit Team Member</h4>
                    <div className="user-form">
                        <EditTeamForm member={member} />
                    </div>
                </div>
            </div>
        </div>
    );
}