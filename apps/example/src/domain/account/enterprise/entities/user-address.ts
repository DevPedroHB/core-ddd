import { UniqueEntityId } from "@pedrohb/core-ddd";
import { Address, IAddress } from "../value-objects/address";

export interface IUserAddress extends IAddress {
	userId: UniqueEntityId;
}

export class UserAddress extends Address<IUserAddress> {
	get userId() {
		return this.props.userId;
	}

	public static create(props: IUserAddress) {
		const userAddress = new UserAddress(props);

		return userAddress;
	}
}
