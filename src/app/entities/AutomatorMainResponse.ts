

  export interface Red {
      value: number;
      vp: number;
  }

  export interface Green {
      value: number;
      vp: number;
  }

  export interface Blue {
      value: number;
      vp: number;
  }

  export interface ColdWhite {
      value: number;
      vp: number;
  }

  export interface WarmWhite {
      value: number;
      vp: number;
  }

  export interface AutomatorMainResponse {
      ledState: number;
      red: Red;
      green: Green;
      blue: Blue;
      coldWhite: ColdWhite;
      warmWhite: WarmWhite;
      light_lvl: number;
      ledMode: string;
      temperature: number;
      humidity: number;
  }

