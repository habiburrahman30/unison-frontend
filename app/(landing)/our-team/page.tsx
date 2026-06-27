import OurTeamPage from "@/components/landing/OurTeamPage";
import { prisma } from "@/lib/prisma";


export default async function OurTeamServerPage() {
    const teamMembers = await prisma.teamMember.findMany({
        orderBy: { created_at: "asc" },
    });

    return <OurTeamPage teamData={teamMembers} />;
}