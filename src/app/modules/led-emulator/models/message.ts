import { User } from "./user";
import { Colors } from "./colors";


export class Message {
    constructor(public from: string, public content: string, public color: Colors) {}
}