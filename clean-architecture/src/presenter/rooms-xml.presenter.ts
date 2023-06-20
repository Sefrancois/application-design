import { Presenter } from "@clean-architecture/presenter/presenter";
import { Room } from "@clean-architecture/entities/room";

export class RoomsXmlPresenter implements Presenter<string> {
	public present(rooms: Array<Room>): string {
		let chains = "<rooms>";

		for (const room of rooms) {
			chains = chains.concat(`\n    <room>
        <capacity>${room.capacity}</capacity>
        <description>${room.description}</description>
        <floor>${room.floor}</floor>
    </room>`);
		}

		return chains.concat("\n</rooms>");
	}
}
