import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client-gateway";
import { AddClientInputDTO, AddClientOutputDTO } from "./add-client.dto";

export default class AddClientUseCase implements UseCaseInterface {

    private _clientRepository: ClientGateway;

    constructor(clientRepository: ClientGateway) {
        this._clientRepository = clientRepository;
    }

    async execute(input: AddClientInputDTO): Promise<AddClientOutputDTO> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            email: input.email,
            address: input.address,
        }

        const client = new Client(props);
        await this._clientRepository.add(client);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}