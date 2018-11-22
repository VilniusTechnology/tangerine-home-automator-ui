export  class LightValues {
    red: number;
    green: number;
    blue: number;
    coldWhite: number;
    warmWhite: number;

    constructor(colors: any) {
        this.red = colors.red;
        this.green = colors.green;
        this.blue = colors.blue;
        this.coldWhite = colors.coldWhite;
        this.warmWhite = colors.warmWhite;
    }
}