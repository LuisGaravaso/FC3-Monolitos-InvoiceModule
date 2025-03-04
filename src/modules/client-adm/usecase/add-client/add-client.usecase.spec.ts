import AddClientUseCase from "./add-client.usecase";

const MockRepoistory = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    };
};

describe("Add Client Usecase Unit Tests", () => {

    it("Should add a new client", async () => {
        const repository = MockRepoistory();
        const usecase = new AddClientUseCase(repository);

        const input = {
            name: "John Doe",
            email: "john.doe@email.com",
            address: "1234 Elm Street"
        };

        const result = await usecase.execute(input);

        expect(repository.add).toBeCalledTimes(1);
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address).toBe(input.address);

    });

});