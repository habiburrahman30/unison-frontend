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
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
                <h4 className="text-lg font-semibold text-slate-900">Edit Team Member</h4>
            </div>
            <div className="p-6 dash-form">
                <EditTeamForm member={member} />
            </div>
        </div>
    );
}