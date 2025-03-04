import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id("123"),
    name: "John Doe",
    email: "x@email.com",
    address: "1234 Elm Street"
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    };
};

describe("Find Client Usecase Unit Tests", () => {

    it("Should find a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);

        const input = {
            id: "123"
        };

        const result = await usecase.execute(input);

        expect(repository.find).toBeCalledTimes(1);
        expect(result.id).toBe(client.id.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
    });

    it("Should throw an error when client is not found", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);

        const input = {
            id: "123"
        };

        repository.find.mockReturnValue(Promise.resolve(null));

        await expect(usecase.execute(input)).rejects.toThrow("Client not found");
    });
});