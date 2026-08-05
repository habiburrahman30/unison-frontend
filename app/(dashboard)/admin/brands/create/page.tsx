import CreateBrandForm from "@/components/dashboard/CreateBrandForm";



export default function CreateBrandPage() {
    return (
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
                <h4 className="text-lg font-semibold text-slate-900">Create Brand</h4>
            </div>
            <div className="p-6 dash-form">
                <CreateBrandForm />
            </div>
        </div>
    );
}