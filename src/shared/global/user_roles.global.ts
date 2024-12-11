export enum USER_ROLES {
    Student = 'student',
    Trainee = 'trainee',
    Junior = 'junior',
    Middle = 'middle',
    Senior = 'senior',
    Staff = 'staff',
}

export function hasRequiredRole(inputRole: USER_ROLES, minimumRole: USER_ROLES): boolean {
    const roleHierarchy = [
        USER_ROLES.Student,
        USER_ROLES.Trainee,
        USER_ROLES.Junior,
        USER_ROLES.Middle,
        USER_ROLES.Senior,
        USER_ROLES.Staff,
    ];

    return roleHierarchy.indexOf(inputRole) >= roleHierarchy.indexOf(minimumRole);
}