import {
        IAuthenticateGeneric,
        ICredentialTestRequest,
        ICredentialType,
        INodeProperties,
        Icon,
} from 'n8n-workflow';

export class UchatApi implements ICredentialType {
        name = 'uchatApi';
        displayName = 'uChat API';
        documentationUrl = 'https://www.uchat.com.au/api';
        icon: Icon = 'file:uchat.svg';
        properties: INodeProperties[] = [
                {
                        displayName: 'API Key',
                        name: 'apiKey',
                        type: 'string',
                        typeOptions: {
                                password: true,
                        },
                        default: '',
                        required: true,
                        description: 'API Key para autenticação na API do uChat',
                },
        ];

        authenticate: IAuthenticateGeneric = {
                type: 'generic',
                properties: {
                        headers: {
                                'Authorization': '=Bearer {{$credentials.apiKey}}',
                        },
                },
        };

        test: ICredentialTestRequest = {
                request: {
                        baseURL: 'https://www.uchat.com.au/api',
                        url: '/flow/bot-fields',
                        method: 'GET',
                },
        };
}
