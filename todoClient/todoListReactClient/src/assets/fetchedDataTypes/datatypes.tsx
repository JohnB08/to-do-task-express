export type TodoObject = {
    todoId?: number,
    todoItem: string,
    dateCreated: string,
    isComplete: boolean,
    isDeleted: boolean,
}

export type Response = {
    /* HUSK DENNE HVIS DU VIL LIMMITE MELLOM ET SET KEYS */
    [key in "error" | "success"]: {
        message: string
    }
}