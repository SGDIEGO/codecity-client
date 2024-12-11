import { UserDto } from "@/api/user/dto/user.dto"
import { Button } from "../Button"
import { useAuthContext } from "@/context/Authorization"
import { IconComponent } from "../Icon"

interface MemberProps {
    member: UserDto,
}

const Member = ({ member }: MemberProps) => {
    const { user } = useAuthContext()

    return (
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg shadow-md max-w-sm mx-auto">
            <div className="flex items-center space-x-4">
                <IconComponent src={member.profile_url}/>
                <div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{member.name}</h2>
                    <p className="text-slate-600 dark:text-slate-400">{member.email}</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-slate-700 dark:text-slate-300"><strong>Interactions:</strong> {member.interactions}</p>
                <p className="text-slate-700 dark:text-slate-300"><strong>Join Date:</strong> {new Date(member.join_date).toLocaleDateString()}</p>
                <p className="text-slate-700 dark:text-slate-300"><strong>Role:</strong> {member.user_role.name}</p>
            </div>
            <div className="mt-4">
                <Button name={"Enviar Mensaje"} variant="primary" redirect={`message?from=${user?.id}&to=${member.id}`} />
            </div>
        </div>
    )
}

export {
    Member
}