/**
 * Gregorian calendar Easter date calculation.
 *
 * Uses the Anonymous Gregorian algorithm (the standard "Meeus/Jones/Butcher"
 * algorithm) because it is exact for all Gregorian years and requires only
 * integer arithmetic. The constants are a compact encoding of the 19-year
 * Metonic cycle and the 2500-year solar/lunar corrections.
 *
 * @param {number} year - Gregorian calendar year (integer, negative allowed
 *   for astronomical year numbering; e.g. -1 means 2 BC).
 * @returns {Date} Easter Sunday as a Date at local midnight for that year.
 * @throws {RangeError} if year is not an integer.
 */
export function gregorianEaster(year) {
  if (!Number.isInteger(year)) {
    throw new RangeError('year must be an integer');
  }

  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  // Date uses 0-indexed months. The algorithm produces 3 (March) or 4 (April).
  return new Date(year, month - 1, day);
}

/**
 * Julian calendar Easter date calculation.
 *
 * Uses the traditional 19-year Metonic cycle formula. The Julian calendar has
 * no solar equation or century corrections, so this is simpler than the
 * Gregorian version. It remains valid for all Julian years.
 *
 * @param {number} year - Julian calendar year (integer, negative allowed).
 * @returns {Date} Easter Sunday in the Julian calendar, represented as a Date
 *   with the same calendar fields. Callers should interpret the result in the
 *   Julian calendar, not as a proleptic Gregorian date.
 * @throws {RangeError} if year is not an integer.
 */
export function julianEaster(year) {
  if (!Number.isInteger(year)) {
    throw new RangeError('year must be an integer');
  }

  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

/**
 * Easter Sunday for a given year.
 *
 * The `calendar` parameter defaults to 'gregorian' so that the simplest call
 * works for the modern civil calendar. Explicitly passing 'julian' returns the
 * Julian Easter date.
 *
 * @param {number} year - Calendar year (integer).
 * @param {'gregorian'|'julian'} [calendar='gregorian'] - Which calendar to use.
 * @returns {Date} Easter Sunday at local midnight in that year and calendar.
 * @throws {RangeError} if year is not an integer.
 * @throws {TypeError} if calendar is not one of the supported values.
 */
export function easterSunday(year, calendar = 'gregorian') {
  if (calendar === 'gregorian') {
    return gregorianEaster(year);
  }
  if (calendar === 'julian') {
    return julianEaster(year);
  }
  throw new TypeError("calendar must be 'gregorian' or 'julian'");
}
