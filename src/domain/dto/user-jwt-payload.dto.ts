import { JwtPayload } from "jwt-decode"

export interface UserJwtPayload extends JwtPayload {
    id: string;
    name?: string | null;
    email?: string;
    profile_url?: string | null;
    user_role: UserRoleDto
}

interface UserRoleDto {
    id: string, min_interactions: number, name: string
}