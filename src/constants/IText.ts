interface IHomePage {
    todoListApp:                string
    addTodo:                    string
    restoreFromTrash:           string
}

interface ITodoItem {
    mark:                       string
    moveToTrash:                string
}

export interface IText {
    homePage:                   IHomePage
    todoItem:                   ITodoItem
}