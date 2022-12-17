export interface ETodoItemStatus {
    value: number
}

const createETodoItemStatus = (value: number): ETodoItemStatus => {
    return { value };
}

export const ETodoItemStatus = {
    UN_MARKED:      createETodoItemStatus(0), 
    MARKED:         createETodoItemStatus(1), 
    IN_TRASH:       createETodoItemStatus(2), 
}