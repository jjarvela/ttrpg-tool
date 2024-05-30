/**
 * This function takes in a hex format colour code and returns its HSL (hue, saturation, luminosity) values as numbers.
 * based on https://gist.github.com/xenozauros/f6e185c8de2a04cdfecf
 * @param hex - string (eg. #ffffff)
 * @returns "{H: number, S: number, L: number}"
 */

export function convertHexToHSL(hex: string): {
  H: number;
  S: number;
  L: number;
} {
  const result = /^#?([A-Fa-f\d]{2})([A-Fa-f\d]{2})([A-Fa-f\d]{2})$/.exec(hex);

  if (!result) {
    throw new Error("Could not convert hex");
  }

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let hue = 0;
  let sat = 0;
  let lum = (max + min) / 2;

  if (max === min) {
    hue = sat = 0;
  } else {
    const difference = max - min;

    sat = lum > 0.5 ? difference / (2 - max - min) : difference * (max + min);

    switch (max) {
      case r:
        hue = (g - b) / difference + (g < b ? 6 : 0);
        break;
      case g: {
        hue = (b - r) / difference + 2;
        break;
      }
      case b:
        hue = (r - g) / difference + 4;
        break;
    }
    hue /= 6;
  }

  return {
    H: Math.round(hue * 360),
    S: Math.round(sat * 100),
    L: Math.round(lum * 100),
  };
}

export function calcShadow(hsl: { H: number; S: number; L: number }): {
  H: number;
  S: number;
  L: number;
} {
  const sh = { H: 0, S: 0, L: 0 };
  if (hsl.H < 3) {
    sh.H = 360 + (hsl.H - 2);
  } else {
    sh.H = hsl.H - 2;
  }

  if (hsl.S > 70) {
    sh.S = hsl.S - 2;
  } else {
    sh.S = hsl.S + 5;
  }

  if (hsl.L < 41) {
    sh.L = 0;
  } else {
    sh.L = hsl.L - 40;
  }

  return sh;
}

export function calcLight(hsl: { H: number; S: number; L: number }): {
  H: number;
  S: number;
  L: number;
} {
  const lg = { H: 0, S: 0, L: 0 };

  if (hsl.H > 357) {
    lg.H = 0 + (hsl.H - 3);
  } else {
    lg.H = hsl.H + 3;
  }

  if (hsl.S < 8) {
    lg.S = 0;
  } else {
    lg.S = hsl.S - 7;
  }

  if (hsl.L > 71) {
    lg.L = 100;
  } else {
    lg.L = hsl.L + 28;
  }

  return lg;
}
