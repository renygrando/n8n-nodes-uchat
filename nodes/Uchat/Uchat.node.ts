import {
        IExecuteFunctions,
        INodeExecutionData,
        INodeType,
        INodeTypeDescription,
} from 'n8n-workflow';

export class Uchat implements INodeType {
        description: INodeTypeDescription = {
                displayName: 'uChat',
                name: 'uchat',
                icon: 'file:uchat.svg',
                group: ['transform'],
                version: 1,
                subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
                description: 'Integração com a API do uChat',
                defaults: {
                        name: 'uChat',
                },
                inputs: ['main'],
                outputs: ['main'],
                credentials: [
                        {
                                name: 'uchatApi',
                                required: true,
                        },
                ],
                usableAsTool: true,
                requestDefaults: {
                        baseURL: 'https://www.uchat.com.au/api',
                        headers: {
                                Accept: 'application/json',
                        },
                },
                properties: [
                        {
                                displayName: 'Recurso',
                                name: 'resource',
                                type: 'options',
                                noDataExpression: true,
                                options: [
                                        {
                                                name: 'Contato',
                                                value: 'contact',
                                                description: 'Operações com contatos',
                                        },
                                        {
                                                name: 'Mensagem',
                                                value: 'message',
                                                description: 'Operações com mensagens',
                                        },
                                ],
                                default: 'contact',
                        },
                ],
        };

        async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
                const items = this.getInputData();
                const returnData = [];
                const resource = this.getNodeParameter('resource', 0) as string;

                for (let i = 0; i < items.length; i++) {
                        try {
                                let responseData;

                                if (resource === 'contact') {
                                        responseData = await this.helpers.httpRequest({
                                                method: 'GET',
                                                url: '/contacts',
                                        });
                                }

                                returnData.push({ json: responseData });
                        } catch (error) {
                                if (this.continueOnFail()) {
                                        returnData.push({ json: { error: error.message } });
                                        continue;
                                }
                                throw error;
                        }
                }

                return [returnData];
        }
}