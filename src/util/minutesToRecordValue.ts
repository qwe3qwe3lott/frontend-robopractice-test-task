export function minutesToRecordValue(minutes: number) {
	const displayedMinutes = minutes % 60;
	return minutes === 0 ? '0' : `${Math.trunc(minutes / 60)}:${displayedMinutes < 10 ? '0' : ''}${displayedMinutes}`;
}