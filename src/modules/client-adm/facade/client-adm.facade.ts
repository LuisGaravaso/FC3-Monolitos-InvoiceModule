import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDTO, FindClientFacadeInputDTO, FindClientFacadeOutputDTO } from "./client-adm.facade.interface";

export interface UseCaseProps {
    add: UseCaseInterface;
    find: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private _add: UseCaseInterface;
    private _find: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._add = usecaseProps.add;
        this._find = usecaseProps.find;
    }

    async add(input: AddClientFacadeInputDTO): Promise<void> {
        await this._add.execute(input);
    }

    async find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO> {
        return await this._find.execute(input);
    }
}