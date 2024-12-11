export interface UserDto {
    id: string
    email: string
    interactions: number
    join_date: string
    name: string
    profile_url: string
    user_role: UserRoleDto
}

interface UserRoleDto {
    id: string, min_interactions: number, name: string
}