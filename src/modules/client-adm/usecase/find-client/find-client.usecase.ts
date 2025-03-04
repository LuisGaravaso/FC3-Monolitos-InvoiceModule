import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGateway from "../../gateway/client-gateway";
import { FindClientInputDTO, FindClientOutputDTO } from "./find-client.dto";

export default class FindClientUseCase implements UseCaseInterface {

    private _clientRepository: ClientGateway;

    constructor(clientRepository: ClientGateway) {
        this._clientRepository = clientRepository;
    }

    async execute(input: FindClientInputDTO): Promise<FindClientOutputDTO> {
        const client = await this._clientRepository.find(input.id);

        if (!client) {
            throw new Error("Client not found");
        }

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