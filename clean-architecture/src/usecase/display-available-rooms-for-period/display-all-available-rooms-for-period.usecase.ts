import { Usecase } from "@clean-architecture/usecase/usecase";
import { Presenter } from "@clean-architecture/infrastructure/presenter/presenter";
import { HotelDatasource } from "@clean-architecture/usecase/hotel.datasource";

export class DisplayAllAvailableRoomsForPeriod implements Usecase<string> {
	private readonly roomsPresenter: Presenter<string>;
	private readonly hotelDatasource: HotelDatasource;

	constructor(hotelDatasource: HotelDatasource, roomsPresenter: Presenter<string>) {
		this.roomsPresenter = roomsPresenter;
		this.hotelDatasource = hotelDatasource;
	}

	public run(startDate: Date, endDate: Date): string {
		const hotel = this.hotelDatasource.getHotel();
		return this.roomsPresenter.present(hotel.getAllAvailableRoomsForPeriod(startDate, endDate));
	}
}
