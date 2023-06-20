import { expect } from "@sefr/test";
import { DisplayAllRooms } from "@clean-architecture/usecase/display-all-rooms/display-all-rooms.usecase";
import { RoomsXmlPresenter } from "@clean-architecture/presenter/rooms-xml.presenter";
import { FakeHotelInMemoryDatasource } from "@clean-architecture/fake/fake-hotel-in-memory.datasource";

describe("DisplayAllRoomsUsecase", () => {
	it("returns all hotel rooms", () => {
		// Given
		const hotelDatasource = new FakeHotelInMemoryDatasource();
		const roomsPresenter = new RoomsXmlPresenter();
		const displayAllRooms = new DisplayAllRooms(hotelDatasource, roomsPresenter);

		// When
		const result = displayAllRooms.run();

		// Then
		const expected = getExpectedXml();
		expect(result).to.equal(expected)
	});
});

function getExpectedXml(): string {
	return `<rooms>
    <room>
        <capacity>2</capacity>
        <description>1 king size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible</description>
        <floor>1</floor>
    </room>
    <room>
        <capacity>4</capacity>
        <description>2 queen size beds - A/C - Wi-Fi - private bathroom - wheelchair accessible</description>
        <floor>1</floor>
    </room>
</rooms>`;
}
