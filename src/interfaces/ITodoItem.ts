import { ETodoItemStatus } from "src/data-structures/ETodoItemStatus"

export interface ITodoItem {
    id:                 number
    body?:              string
    status?:            ETodoItemStatus
}