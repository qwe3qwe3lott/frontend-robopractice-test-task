export function recordDtoTimeToMinutes(time: string): number {
	return +time.substring(0, 2) * 60 + +time.substring(3, 5);
}