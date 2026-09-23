# Easter Date Calculator

Computes the date of Easter Sunday for any given year using the computus algorithm, with support for both Gregorian and Julian calendars.

```js
import { easterSunday } from 'easter-date-calculator';

const gregorianEaster2024 = easterSunday(2024); // 2024-03-31
const julianEaster2024 = easterSunday(2024, 'julian'); // 2024-05-05
```

The package exports three functions:

- `gregorianEaster(year)` — returns Easter Sunday as a `Date` for the Gregorian calendar.
- `julianEaster(year)` — returns Easter Sunday as a `Date` for the Julian calendar.
- `easterSunday(year, calendar = 'gregorian')` — convenience wrapper that accepts `'gregorian'` or `'julian'`.

All functions accept any integer year, including negative years in astronomical year numbering (where -1 is 2 BC). Non-integer values throw a `RangeError`. An invalid calendar name throws a `TypeError`.

## Why this library exists

Most Easter calculators are either tied to a specific language or a specific calendar, and they often fail for years outside the modern era. This library provides a small, dependency-free implementation of the standard computus formulas for both major Christian calendars, with careful attention to edge cases such as negative years and the earliest/latest possible Easter dates.

One trade-off to note: the Julian function returns a JavaScript `Date` whose fields are the Julian calendar date. It does not convert to the Gregorian calendar. If you need a proleptic Gregorian date, you must perform that conversion yourself.

## Awkward edge cases

The earliest possible Easter is March 22 and the latest is April 25 in both calendars, but the years when these occur differ between the two systems. For example, Gregorian Easter is March 22 in 1818, while Julian Easter is March 22 in 1666. Tests cover these extremes to ensure the formulas are correct at the boundaries.
