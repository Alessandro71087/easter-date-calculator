import { test } from 'node:test';
import assert from 'node:assert/strict';

import { gregorianEaster, julianEaster, easterSunday } from '../src/core.js';

function dateStr(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

test('gregorianEaster returns known modern dates', () => {
  assert.equal(dateStr(gregorianEaster(2024)), '2024-03-31');
  assert.equal(dateStr(gregorianEaster(2025)), '2025-04-20');
  assert.equal(dateStr(gregorianEaster(2026)), '2026-04-05');
  assert.equal(dateStr(gregorianEaster(2000)), '2000-04-23');
});

test('gregorianEaster handles earliest and latest possible dates', () => {
  // Earliest Gregorian Easter is March 22, latest is April 25.
  assert.equal(dateStr(gregorianEaster(1818)), '1818-03-22');
  assert.equal(dateStr(gregorianEaster(1943)), '1943-04-25');
});

test('gregorianEaster supports astronomical year numbering', () => {
  // Year -1 is 2 BC in historical notation.
  assert.equal(dateStr(gregorianEaster(-1)), '-1-03-23');
});

test('gregorianEaster rejects non-integers', () => {
  assert.throws(() => gregorianEaster(2024.5), RangeError);
  assert.throws(() => gregorianEaster('2024'), RangeError);
  assert.throws(() => gregorianEaster(NaN), RangeError);
  assert.throws(() => gregorianEaster(Infinity), RangeError);
});

test('julianEaster returns known dates', () => {
  assert.equal(dateStr(julianEaster(2024)), '2024-04-22');
  assert.equal(dateStr(julianEaster(2025)), '2025-04-07');
  assert.equal(dateStr(julianEaster(1900)), '1900-04-09');
});

test('julianEaster handles earliest and latest possible dates', () => {
  // Earliest Julian Easter is March 22, latest is April 25.
  assert.equal(dateStr(julianEaster(1666)), '1666-04-15');
  assert.equal(dateStr(julianEaster(1793)), '1793-04-24');
});

test('julianEaster rejects non-integers', () => {
  assert.throws(() => julianEaster(2024.5), RangeError);
  assert.throws(() => julianEaster('2024'), RangeError);
  assert.throws(() => julianEaster(NaN), RangeError);
  assert.throws(() => julianEaster(Infinity), RangeError);
});

test('easterSunday defaults to Gregorian', () => {
  assert.equal(dateStr(easterSunday(2024)), '2024-03-31');
  assert.equal(dateStr(easterSunday(2024, 'gregorian')), '2024-03-31');
});

test('easterSunday supports explicit Julian calendar', () => {
  assert.equal(dateStr(easterSunday(2024, 'julian')), '2024-04-22');
});

test('easterSunday rejects invalid calendar', () => {
  assert.throws(() => easterSunday(2024, 'orthodox'), TypeError);
  assert.throws(() => easterSunday(2024, ''), TypeError);
  assert.throws(() => easterSunday(2024, null), TypeError);
});

test('Gregorian and Julian Easters differ when expected', () => {
  // In 2024 Gregorian Easter is March 31 and Julian Easter is April 22.
  assert.notEqual(dateStr(gregorianEaster(2024)), dateStr(julianEaster(2024)));
  // In 2025 they differ.
  assert.notEqual(dateStr(gregorianEaster(2025)), dateStr(julianEaster(2025)));
});

test('gregorianEaster returns a Date at local midnight', () => {
  const result = gregorianEaster(2024);
  assert.ok(result instanceof Date);
  assert.equal(result.getHours(), 0);
  assert.equal(result.getMinutes(), 0);
  assert.equal(result.getSeconds(), 0);
  assert.equal(result.getMilliseconds(), 0);
});
