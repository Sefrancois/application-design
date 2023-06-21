import { expect } from "@sefr/test";
import { FakeHotelInMemoryDatasource } from "@onion-architecture/fake/fake-hotel-in-memory.datasource";
import {
	DisplayAllAvailableRoomsForPeriod
} from "@onion-architecture/application-service/display-all-available-rooms-for-period.usecase";
import { RoomModel } from "@onion-architecture/infrastructure/model/room.model";

describe("Onion Architecture | DisplayAllAvailableRoomsForPeriodTest", () => {
	it("returns all available hotel rooms for period", () => {
		// Given
		const hotelDatasource = new FakeHotelInMemoryDatasource();
		const displayAllAvailableRoomsForPeriod = new DisplayAllAvailableRoomsForPeriod(hotelDatasource);
		const startDate = new Date("2023-06-01");
		const endDate = new Date("2023-06-08");

		// When
		const result = displayAllAvailableRoomsForPeriod.run(startDate, endDate);

		// Then
		const expected = [
			new RoomModel(101, 1, 2, "1 king size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
		];
		expect(result).to.have.deep.members(expected);
	});
});
