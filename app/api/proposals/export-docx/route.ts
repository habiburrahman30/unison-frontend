import { NextRequest, NextResponse } from "next/server";
import { Packer } from "docx";
import { buildProposalDocx, type ProposalDocxInput } from "@/lib/proposal-docx";
import { ApiResponse } from "@/lib/utils/response";

// POST /api/proposals/export-docx
// Submitted as a real HTML form POST (not fetch+blob) so the browser downloads the
// response natively via its Content-Disposition header, instead of via a client-side
// Blob URL — which some Chrome download-protection configurations leave stuck as
// "<file>.crdownload" indefinitely.
export async function POST(request: NextRequest) {
    try {
        const form = await request.formData();
        const raw = form.get("payload");
        if (typeof raw !== "string") {
            return ApiResponse.error("Missing proposal payload", 400);
        }

        const data = JSON.parse(raw) as ProposalDocxInput;
        const doc = buildProposalDocx(data);
        const buffer = await Packer.toBuffer(doc);
        const filename = `${(data.proposalRef || "price-proposal").replace(/[^a-zA-Z0-9-_]/g, "_")}.docx`;

        return new NextResponse(new Uint8Array(buffer), {
            status: 200,
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Content-Length": String(buffer.length),
            },
        });
    } catch (error) {
        console.error("Failed to generate proposal DOCX", error);
        return ApiResponse.error("Failed to generate the DOC file", 500);
    }
}
