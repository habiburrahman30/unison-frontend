import { prisma } from "@/lib/prisma";

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string | null;
  image: string | null;
  email: string | null;
  phone: string | null;
  social_links: any;
  created_at: Date;
  updated_at: Date;
}

export interface TeamMembersResponse {
  data: TeamMember[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TeamMemberPayload {
  name: string;
  position: string;
  bio?: string;
  image?: string | null;
  email?: string;
  phone?: string;
  social_links?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

// SERVER-SIDE: Get all team members
export async function getTeamMembers(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<TeamMembersResponse> {
  const page = params?.page || 1;
  const limit = params?.limit || 10;

  const where: any = {};
  if (params?.search) {
    where.OR = [
      { name: { contains: params.search } },
      { position: { contains: params.search } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.teamMember.findMany({
      where,
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.teamMember.count({ where }),
  ]);

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

// SERVER-SIDE: Get single team member
export async function getTeamMemberById(
  id: number,
): Promise<TeamMember | null> {
  return await prisma.teamMember.findUnique({ where: { id } });
}

// CLIENT-SIDE: Create team member
export async function createTeamMember(
  data: TeamMemberPayload,
): Promise<TeamMember> {
  const response = await fetch("/api/teams", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create team member");
  }

  const result = await response.json();
  return result.data;
}

// CLIENT-SIDE: Update team member
export async function updateTeamMember(
  id: number,
  data: Partial<TeamMemberPayload>,
): Promise<TeamMember> {
  const response = await fetch(`/api/teams/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update team member");
  }

  const result = await response.json();
  return result.data;
}

// CLIENT-SIDE: Delete team member
export async function deleteTeamMember(id: number): Promise<void> {
  const response = await fetch(`/api/teams/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete team member");
  }
}
