import { expect } from "@sefr/test";
import { RoomsXmlPresenter } from "@clean-architecture/infrastructure/presenter/rooms-xml.presenter";
import { FakeHotelInMemoryDatasource } from "@clean-architecture/fake/fake-hotel-in-memory.datasource";
import {
	DisplayAllAvailableRoomsForPeriod
} from "@clean-architecture/usecase/display-available-rooms-for-period/display-all-available-rooms-for-period.usecase";

describe("Clean Architecture | DisplayAllAvailableRoomsForPeriodTest", () => {
	it("returns all available hotel rooms for period", () => {
		// Given
		const hotelDatasource = new FakeHotelInMemoryDatasource();
		const roomsPresenter = new RoomsXmlPresenter();
		const displayAllAvailableRoomsForPeriod = new DisplayAllAvailableRoomsForPeriod(hotelDatasource, roomsPresenter);
		const startDate = new Date("2023-06-01");
		const endDate = new Date("2023-06-08")

		// When
		const result = displayAllAvailableRoomsForPeriod.run(startDate, endDate);

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
</rooms>`;
}
