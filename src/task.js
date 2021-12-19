import { parseISO } from "date-fns";

export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = parseISO(dueDate);
        this.priority = priority;
    }

    getName() {
        return this.title;
    }

}