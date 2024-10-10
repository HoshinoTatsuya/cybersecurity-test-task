import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {
    MsUsersModuleOptions,
    MsUsersModuleOptionsFactory
} from "../libs/interaction-external-services/ms-users/ms-users.interface";

@Injectable()
export class MsUsersConfig implements MsUsersModuleOptionsFactory {
    public constructor(private readonly _configService: ConfigService) {}

    public createMsUsersOptions(): MsUsersModuleOptions {
        return {
            serviceName: this._configService.get<string>('DCBANK_HOST'),
            logger: {
                axios: this._configService.get<boolean>('DCBANK_CLIENT_ID'),
                nats: this._configService.get<boolean>('DCBANK_CLIENT_ID')
            },

        };
    }
}