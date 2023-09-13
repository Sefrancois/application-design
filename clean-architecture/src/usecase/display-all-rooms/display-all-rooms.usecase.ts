import { HotelDatasource } from "@clean-architecture/usecase/hotel.datasource";
import { Usecase } from "@clean-architecture/usecase/usecase";
import { Presenter } from "@clean-architecture/infrastructure/presenter/presenter";

export class DisplayAllRooms implements Usecase<string> {
	private readonly hotelDatasource: HotelDatasource;
	private readonly roomsPresenter: Presenter<string>;

	constructor(hotelDatasource: HotelDatasource, roomsPresenter: Presenter<string>) {
		this.hotelDatasource = hotelDatasource;
		this.roomsPresenter = roomsPresenter;
	}

	public run(): string {
		const hotel = this.hotelDatasource.getHotel();
		return this.roomsPresenter.present(hotel.getAllRooms());
	}
}
