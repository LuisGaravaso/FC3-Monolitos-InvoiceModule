import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientRepository from "./client.repository";

describe("Client Repository unit tests", () => {
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        
        const client = new Client({
            id: new Id("1"),
            name: "Client 1",
            email: "x.x@email.com",
            address: "Client 1 address",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const clientRepository = new ClientRepository();

        await clientRepository.add(client);

        const clientDb = await ClientModel.findByPk(client.id.id);

        expect(clientDb).toBeDefined();
        expect(clientDb.id).toEqual(client.id.id);
        expect(clientDb.name).toEqual(client.name);
        expect(clientDb.email).toEqual(client.email);
        expect(clientDb.address).toEqual(client.address);
        expect(clientDb.createdAt).toEqual(client.createdAt);
        expect(clientDb.updatedAt).toEqual(client.updatedAt);

    });

    it("should find a client", async () => {
        
        const client = await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "x.x@email.com",
            address: "Client 1 address",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const clientRepository = new ClientRepository();

        const clientDb = await clientRepository.find(client.id);

        expect(clientDb).toBeDefined();
        expect(clientDb.id.id).toEqual(client.id);
        expect(clientDb.name).toEqual(client.name);
        expect(clientDb.email).toEqual(client.email);
        expect(clientDb.address).toEqual(client.address);
        expect(clientDb.createdAt).toEqual(client.createdAt);
        expect(clientDb.updatedAt).toEqual(client.updatedAt);
    });

    it("should throw an error when client not found", async () => {
        
        const clientRepository = new ClientRepository();

        await expect(clientRepository.find("1")).rejects.toThrow("Client not found");
    });
});