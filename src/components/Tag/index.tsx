import { twMerge } from "tailwind-merge"

interface ITag {
    content: string
    classTag?: string
}

export default function Tag({ content, classTag }: ITag) {
    const baseClass = ""
    const mergeClass = twMerge(baseClass, classTag)

    return <span className={mergeClass}>{content}</span>
}