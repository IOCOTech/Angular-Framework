export class Helpers {

    static guid = class {
        public static generateGuid(): string {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
          }
    };

    static color = class {

        private static r = 0;
        private static g = 0;
        private static b = 0;
        private static a = 1;

        public static setColor(color: string): void {
            if (color.indexOf('#') >= 0) {
                const colorFromHex = Helpers.color.hexToRgb(color);
                if (!colorFromHex) { console.error('Error converting color from hex', color); return; }
                this.r = colorFromHex.r;
                this.g = colorFromHex.g;
                this.b = colorFromHex.b;
            } else {
                let rgbArray: string[];
                if (color.indexOf('rgba') >= 0) {
                    rgbArray = color
                        .replace('rgba(', '')
                        .replace(')', '')
                        .split(',');
                    if (rgbArray.length < 3) { console.error('Error converting color from rgb', color); return; }
                } else {
                    rgbArray = color
                        .replace('rgb(', '')
                        .replace(')', '')
                        .split(',');
                }
                if (rgbArray.length < 3) {
                    console.error('Error converting color from rgb', color);
                    return;
                }
                this.r = Number(rgbArray[0]);
                this.g = Number(rgbArray[1]);
                this.b = Number(rgbArray[2]);
                this.a = rgbArray.length === 4 ? Number(rgbArray[3]) : 1;
            }
        }

        static setOpacity(opacity: number): void {
            this.a = opacity;
        }

        private static hexToRgb(hex: string): { r: number, g: number, b: number } | null {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        static toRgb(): string {
            return `rgb(${this._getRgbString()})`;
        }

        static toRgba(): string {
            return `rgba(${this._getRgbString()}, ${this.a})`;
        }

        static toHex(): string {
            return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`;
        }

        private static _getRgbString(): string {
            return `${this.r}, ${this.g}, ${this.b}`;
        }
    };
}
