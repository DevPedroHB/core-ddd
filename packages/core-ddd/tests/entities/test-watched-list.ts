import { WatchedList } from "@/entities/watched-list";

export class TestWatchedList extends WatchedList<number> {
	public compare(a: number, b: number) {
		return a === b;
	}
}
