export interface BaseError {
    message: string
    status: number
}

export const BadRequestResponse = (message: string): BaseError => {
    return {
        message,
        status: 400
    }
}