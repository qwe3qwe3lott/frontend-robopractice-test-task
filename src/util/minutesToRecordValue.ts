export function minutesToRecordValue(minutes: number) {
	const displayedMinutes = minutes % 60;
	return minutes === 0 ? '0' : `${(minutes / 60).toFixed(0)}:${displayedMinutes < 10 ? '0' : ''}${displayedMinutes}`;
}