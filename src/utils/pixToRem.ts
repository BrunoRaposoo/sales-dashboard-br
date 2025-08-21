/**
 * Coverte Pixels to REM
 * @params pixels - Pixels value to be coverted
 * @returns rhe converted rem value
 */

export function pxToRem(pixels: number): string {
  return `${pixels / 16}rem`
}
