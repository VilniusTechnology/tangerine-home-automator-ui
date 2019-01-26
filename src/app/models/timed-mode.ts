import {LightValues} from './light-values';

export  class TimedMode {
    id: number;
    title: string;
    from: string;
    to: string;
    settings: LightValues;

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.from = data.from;
        this.to = data.to;

        this.settings = new LightValues(JSON.parse(data.settings));
    }

    toJSON() {
        return {
            'id': this.id,
            'title': this.title,
            'from' : this.from,
            'to':    this.to,
            'red' : this.settings.red,
            'green' : this.settings.green,
            'blue': this.settings.blue,
        };
    }
}