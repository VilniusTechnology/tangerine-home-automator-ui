import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RgbCalculatorService {

    constructor() { }

    determineCurrentColor(colors: any) {
        const red = colors.red.value;
        const green = colors.green.value;
        const blue = colors.blue.value;
        
        let cw = this.calculateWhiteOpacity(colors.coldWhite.value);
        let ww = this.calculateWhiteOpacity(colors.warmWhite.value);

        const result = {
            rgb: `rgb(${red}, ${green}, ${blue})`,
            cw:  `rgb(255, 255, 255, ${cw})`,
            ww:  `rgb(255, 246, 0, ${ww})`, 
        }
        
        return result;
    }

    calculateWhiteOpacity(whiteValue: number) {
        let wo = 0;
        if (whiteValue == 0) {
            wo = 0;
        } else {
            wo = whiteValue / 255;
        }

        return wo;
    }
}
