export class Queue {
    private data : any[] = [];
    private pos = 0;
    public push(elem : any) {
        this.data.push(elem);
    }
    public pop() : any {
        this.pos++;
        return this.data[this.pos - 1];
    }
    public length() : number {
        return this.data.length - this.pos;
    }
}