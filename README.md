# PROMOÇÃO

Deve ser permitir um administrador, usuário com acesso administrativo, criar, visualizar, deletar ou alterar informações de uma promoção. Além de, vincular uma promoção a uma categoria.
#### Modelo de Dados

```json
{
	"id_promocao": string,
	"titulo": string,
	"id_categoria": string,
	"url_redirecionamento": string,
	"url_imagem": string,
	"es_habilitado": boolean
}
```

### Desenvolvimento

Será necessário a criação de API para as funções básicas de um CRUD.
Para isso será necessário uso da dependência de código [Express]([https://www.typescriptlang.org/docs/](https://expressjs.com/)).

#### Contrato das API

O contrato de uma API é um detalhamento técnico de como utilizar aquela ferramenta.

Nele são especificados:
- os método [HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview);
- as URI de cada rota;
- os cabeçalhos da requisição (HEADERS);
- o corpo da requisição (BODY);
- e o código de status da resposta (RESPONSE CODE);
- e/ou corpo da resposta (RESPONSE BODY)

As rotas da API de promoções são:

	POST /api/v1/promocoes

```json
# CORPO DA REQUISIÇÃO (BODY)
{
	"titulo": string,
	"id_categoria": string,
	"url_imagem": string
}
```

	RESPONSE CODE 201

A rota de `POST /api/v1/promocoes` será responsável pela criação do registro de promoção.

Todos os campos devem ser obrigatórios. Para essa validação pode-se usar a biblioteca de código [Zod](https://zod.dev/).

Após validação os dados devem ser salvos como documento em um MongoDB conforme definição da modelagem de dados. Para isso pode-se usar a biblioteca de código [mongoose](https://www.mongodb.com/pt-br/docs/drivers/node/current/integrations/mongoose/mongoose-get-started/) como [ORM](https://www.freecodecamp.org/portuguese/news/o-que-e-um-orm-o-significado-das-ferramentas-de-mapeamento-relacional-de-objetos-de-banco-de-dados/).

	PATCH /api/v1/promocoes/{id_promocao}

```json
# CORPO DA REQUISIÇÃO (BODY)
{
	"titulo": string (opicional),
	"id_categoria": string (opicional),
	"url_imagem": string (opicional),
	"es_habilitado": boolean (opicional)
}
```

	RESPONSE CODE 200

A rota de `PATCH /api/v1/promocoes/{id_promocao}` será responsável pela alteração parcial ou completa de informações do registro de promoção.

Todos os campos devem ser opcionais. Para a validação de tipos pode-se usar a biblioteca de código [Zod](https://zod.dev/).

Após validação, os dados da promoção devem ser recuperados do MongoDB filtrando pelo id_promocao. Para isso pode-se usar a biblioteca de código [mongoose](https://www.mongodb.com/pt-br/docs/drivers/node/current/integrations/mongoose/mongoose-get-started/) como [ORM](https://www.freecodecamp.org/portuguese/news/o-que-e-um-orm-o-significado-das-ferramentas-de-mapeamento-relacional-de-objetos-de-banco-de-dados/). Então os dados recebidos no corpo da requisição devem ser mesclados as informações recuperadas da base. E o registro deve ser salvo novamente.

	GET /api/v1/promocoes
	RESPONSE CODE 200

```json
# CORPO DA RESPOTA (RESPONSE BODY)
[
	{
		"id_promocao": string,
		"titulo": string,
		"id_categoria": string,
		"url_redirecionamento": string,
		"url_imagem": string
	}
]

```

A rota de `GET /api/v1/promocoes` será responsável por listar as promoções ativas.

Os dados da promoção devem ser recuperados do MongoDB. Para isso pode-se usar a biblioteca de código [mongoose](https://www.mongodb.com/pt-br/docs/drivers/node/current/integrations/mongoose/mongoose-get-started/) como [ORM](https://www.freecodecamp.org/portuguese/news/o-que-e-um-orm-o-significado-das-ferramentas-de-mapeamento-relacional-de-objetos-de-banco-de-dados/). Então deve buscar usando um filtro apenas as promoções que estão como es_habiltiado = true, no corpo da requisição devem ser retornados apenas as informações do contrato.

	DELETE /api/v1/promocoes/{id_promocao}
	RESPONSE CODE 204

A rota de `DELETE /api/v1/promocoes/{id_promocao}` deve realizar a deleção lógica das promoções ativas.

Deve atualizar valor de es_habilitado = false de uma promoção filtrando apenas pelo id e com es_habiltiado = true. Para isso pode-se usar a biblioteca de código [mongoose](https://www.mongodb.com/pt-br/docs/drivers/node/current/integrations/mongoose/mongoose-get-started/) como [ORM](https://www.freecodecamp.org/portuguese/news/o-que-e-um-orm-o-significado-das-ferramentas-de-mapeamento-relacional-de-objetos-de-banco-de-dados/).

#### Referências

[Documentação Typescript](https://www.typescriptlang.org/docs/)
[Documentação Express]([https://www.typescriptlang.org/docs/](https://expressjs.com/))
[Documentação SDK S3 ](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)
[Documentação Zod](https://zod.dev/)
[Documentação mongoose](https://www.mongodb.com/pt-br/docs/drivers/node/current/integrations/mongoose/mongoose-get-started/)
[O que é um ORM](https://www.freecodecamp.org/portuguese/news/o-que-e-um-orm-o-significado-das-ferramentas-de-mapeamento-relacional-de-objetos-de-banco-de-dados/)
[Visão Geral do HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview)
