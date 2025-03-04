import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import { FindAllProductsOutputDto } from "../usecase/find-all-products/find-all-products.dto";
import StoreCatalogFacadeInterface, { FindStoreCatalogFacadeInputDTO, FindStoreCatalogFacadeOutputDTO } from "./store-catalog.facade.interface";

export interface UseCaseProps {
    findUseCase: UseCaseInterface;
    findAllUseCase: UseCaseInterface;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findUseCase: UseCaseInterface;
    private _findAllUseCase: UseCaseInterface;

    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase;
        this._findAllUseCase = props.findAllUseCase;
    }

    async find(id: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO> {
        return await this._findUseCase.execute(id);
    }

    async findAll(): Promise<FindAllProductsOutputDto> {
        return await this._findAllUseCase.execute({});
    }
}