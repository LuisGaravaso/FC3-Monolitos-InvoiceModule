import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("ClientAdmFacade test", () => {

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

    it("should add a client", async () => {

        const facade = ClientAdmFacadeFactory.create();
        
        await facade.add({
            id: "1",
            name: "Client 1",
            email: "x.x@email.com",
            address: "Client 1 address"
        });

        const clientDb = await ClientModel.findOne({ where: { id: "1" } });

        expect(clientDb).toBeDefined();
        expect(clientDb.id).toBe("1");
        expect(clientDb.name).toBe("Client 1");
        expect(clientDb.email).toBe("x.x@email.com");
        expect(clientDb.address).toBe("Client 1 address");
    });

    it("should find a client", async () => {
    
        const facade = ClientAdmFacadeFactory.create();

        const clientProps = {
            id: "1",
            name: "Client 1",
            email: "x.x@email.com",
            address: "Client 1 address",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await ClientModel.create(clientProps);

        const client = await facade.find({ id: "1" });

        expect(client).toBeDefined();
        expect(client.id).toEqual(clientProps.id);
        expect(client.name).toEqual(clientProps.name);
        expect(client.email).toEqual(clientProps.email);
        expect(client.address).toEqual(clientProps.address);
        expect(client.createdAt).toEqual(clientProps.createdAt);
        expect(client.updatedAt).toEqual(clientProps.updatedAt);
    
    });
});