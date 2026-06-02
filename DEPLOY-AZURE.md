# Deploy do Copilot Combate na Azure — Passo a Passo

> Guia completo para colocar o projeto em produção na Azure.  
> Tempo estimado: ~30 minutos.

---

## Pré-requisitos

- [ ] Conta Azure ativa (com créditos ou assinatura)
- [ ] [Azure CLI](https://learn.microsoft.com/pt-br/cli/azure/install-azure-cli) instalada (`az --version`)
- [ ] [Node.js 18+](https://nodejs.org/) instalado
- [ ] [Azure Functions Core Tools v4](https://learn.microsoft.com/pt-br/azure/azure-functions/functions-run-local#install-the-azure-functions-core-tools) instalada (`func --version`)
- [ ] Git instalado e projeto com repositório inicializado
- [ ] Projeto compila sem erros (`cd packages/frontend && npx tsc --noEmit`)

---

## Visão Geral da Infraestrutura

```
┌─────────────────────────────────────────────────────────────┐
│                    AZURE RESOURCE GROUP                      │
│                  (rg-copilot-combate)                        │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │  Static Web App  │  │  Function App    │                 │
│  │  (Frontend)      │──│  (Backend API)   │                 │
│  │  React + Vite    │  │  Node.js 18      │                 │
│  └──────────────────┘  └────────┬─────────┘                 │
│                                 │                           │
│                        ┌────────┴─────────┐                 │
│                        │  Storage Account │                 │
│                        │  (Table Storage) │                 │
│                        └──────────────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

Recursos que serão criados:
1. **Resource Group** — container lógico
2. **Storage Account** — Azure Table Storage para dados do jogo
3. **Function App** — backend serverless (API REST)
4. **Static Web App** — frontend React (com CDN global)

---

## Etapa 1: Login na Azure

```powershell
# Fazer login
az login

# Verificar assinatura ativa
az account show --query "{name:name, id:id}" -o table

# (Opcional) Se tiver múltiplas assinaturas, escolher a correta:
# az account set --subscription "NOME_OU_ID_DA_ASSINATURA"
```

---

## Etapa 2: Criar o Resource Group

```powershell
# Variáveis (ajuste a região se necessário)
$RG = "rg-copilot-combate"
$LOCATION = "eastus2"

# Criar o resource group
az group create --name $RG --location $LOCATION
```

---

## Etapa 3: Criar o Storage Account

```powershell
# Nome precisa ser único globalmente (só letras minúsculas e números, 3-24 chars)
$STORAGE = "copilotcombatedata"

az storage account create `
  --name $STORAGE `
  --resource-group $RG `
  --location $LOCATION `
  --sku Standard_LRS `
  --kind StorageV2

# Pegar a connection string (salve-a, será usada na Function App)
$CONN_STR = $(az storage account show-connection-string `
  --name $STORAGE `
  --resource-group $RG `
  --query connectionString -o tsv)

Write-Host "Connection String: $CONN_STR"
```

### Criar as tabelas necessárias

```powershell
# Criar todas as tabelas que o backend usa
$TABLES = @("sessions", "teams", "matches", "validations", "gameState", "rooms")

foreach ($table in $TABLES) {
    az storage table create --name $table --connection-string $CONN_STR
    Write-Host "Tabela '$table' criada."
}
```

---

## Etapa 4: Criar e Fazer Deploy da Function App (Backend)

### 4.1 — Criar a Function App

```powershell
$FUNC_APP = "copilot-combate-api"

# Criar a Function App (Consumption plan = gratuito até 1M execuções/mês)
az functionapp create `
  --name $FUNC_APP `
  --resource-group $RG `
  --storage-account $STORAGE `
  --consumption-plan-location $LOCATION `
  --runtime node `
  --runtime-version 18 `
  --functions-version 4 `
  --os-type Windows
```

### 4.2 — Configurar variáveis de ambiente

```powershell
az functionapp config appsettings set `
  --name $FUNC_APP `
  --resource-group $RG `
  --settings "AZURE_STORAGE_CONNECTION_STRING=$CONN_STR"
```

### 4.3 — Configurar CORS

```powershell
# Permitir o frontend acessar a API (ajuste o domínio depois)
az functionapp cors add `
  --name $FUNC_APP `
  --resource-group $RG `
  --allowed-origins "https://your-static-web-app.azurestaticapps.net" "http://localhost:3000" "http://localhost:5173"
```

> **Nota:** Você atualizará o domínio CORS na Etapa 6 após saber a URL do Static Web App.

### 4.4 — Deploy do código backend

```powershell
# Navegar até a pasta do backend
cd packages/backend-azure

# Instalar dependências
npm install

# Fazer o deploy
func azure functionapp publish $FUNC_APP

# Voltar à raiz
cd ../..
```

### 4.5 — Testar o backend

```powershell
# Pegar a URL base
$API_URL = "https://$FUNC_APP.azurewebsites.net"

# Testar um endpoint
curl "$API_URL/api/rooms-get"
# Deve retornar [] ou { "rooms": [] }
```

Guarde a URL: `https://copilot-combate-api.azurewebsites.net`

---

## Etapa 5: Deploy do Frontend (Static Web App)

### Opção A: Via GitHub (Recomendado)

#### 5.1 — Subir o código para o GitHub

```powershell
# Na raiz do projeto
git init
git add .
git commit -m "feat: production-ready v2.0"
git remote add origin https://github.com/SEU_USUARIO/copilot-combate-game.git
git branch -M main
git push -u origin main
```

#### 5.2 — Criar o Static Web App via CLI

```powershell
$SWA = "copilot-combate-frontend"

az staticwebapp create `
  --name $SWA `
  --resource-group $RG `
  --source "https://github.com/SEU_USUARIO/copilot-combate-game" `
  --branch main `
  --app-location "packages/frontend" `
  --output-location "dist" `
  --login-with-github
```

> Isso abrirá o navegador para autorizar o GitHub. Aceite.  
> O Azure criará automaticamente um GitHub Action para build+deploy automático.

#### 5.3 — Configurar a variável VITE_API_URL

```powershell
# Pegar a URL do Static Web App
$SWA_URL = $(az staticwebapp show --name $SWA --resource-group $RG --query "defaultHostname" -o tsv)
Write-Host "Frontend URL: https://$SWA_URL"

# Configurar variável de ambiente para o frontend saber onde está a API
az staticwebapp appsettings set `
  --name $SWA `
  --resource-group $RG `
  --setting-names "VITE_API_URL=https://$FUNC_APP.azurewebsites.net"
```

> **Importante:** Variáveis `VITE_*` são substituídas **em build time** pelo Vite. 
> Para o Static Web App usar essa variável, você precisa configurá-la no **GitHub Actions workflow**.

#### 5.4 — Atualizar o GitHub Action

Após o passo 5.2, o Azure cria um arquivo `.github/workflows/azure-static-web-apps-*.yml` no seu repo. Edite-o para incluir a variável de ambiente:

```yaml
# Dentro do job "build_and_deploy_job", no step "Build And Deploy":
- name: Build And Deploy
  uses: Azure/static-web-apps-deploy@v1
  with:
    # ... campos existentes ...
    app_location: "packages/frontend"
    output_location: "dist"
  env:
    VITE_API_URL: https://copilot-combate-api.azurewebsites.net
```

Depois faça commit e push — o deploy será feito automaticamente.

---

### Opção B: Deploy Manual (sem GitHub)

```powershell
# 1. Build do frontend com a URL da API
cd packages/frontend
$env:VITE_API_URL = "https://copilot-combate-api.azurewebsites.net"
npm run build

# 2. Instalar SWA CLI
npm install -g @azure/static-web-apps-cli

# 3. Deploy
swa deploy ./dist `
  --deployment-token $(az staticwebapp secrets list --name $SWA --resource-group $RG --query "properties.apiKey" -o tsv) `
  --env production

cd ../..
```

---

## Etapa 6: Configurar CORS Final

Agora que você sabe a URL do frontend, atualize o CORS da Function App:

```powershell
# Pegar URL do frontend
$SWA_URL = $(az staticwebapp show --name $SWA --resource-group $RG --query "defaultHostname" -o tsv)

# Adicionar ao CORS
az functionapp cors add `
  --name $FUNC_APP `
  --resource-group $RG `
  --allowed-origins "https://$SWA_URL"
```

---

## Etapa 7: Verificação Final

### Checklist de Verificação

```powershell
# 1. Backend respondendo?
curl "https://$FUNC_APP.azurewebsites.net/api/rooms-get"

# 2. Frontend acessível?
Start-Process "https://$SWA_URL"

# 3. Tabelas do Storage existem?
az storage table list --connection-string $CONN_STR --query "[].name" -o table
```

### Teste Funcional no Navegador

1. Acesse `https://<SWA_URL>`
2. Clique em **"Game Master"** → faça login com um ID qualquer
3. Crie uma sala — deve aparecer um código de 6 dígitos
4. Em outra aba, acesse a URL raiz → **"Entrar na Sala"** com o código
5. Crie um time, entre como jogador
6. Selecione um round e jogue
7. Volte à aba do GM e verifique se o time aparece no dashboard

### Debug Dashboard

Acesse `/debug` (como admin, PIN `1234`) para verificar se todos os endpoints Azure estão verdes.

---

## Custos Estimados

| Recurso | Tier | Custo Estimado |
|---------|------|----------------|
| Static Web App | Free | **$0/mês** (100GB bandwidth, custom domain) |
| Function App | Consumption | **$0/mês** (1M execuções gratuitas) |
| Storage Account | Standard LRS | **~$0.05/mês** (Table Storage é muito barato) |
| **Total** | | **< $1/mês** para uso de workshop |

---

## Resumo de URLs

Após o deploy, você terá:

| Recurso | URL |
|---------|-----|
| Frontend | `https://<swa-name>.azurestaticapps.net` |
| API Backend | `https://<func-app>.azurewebsites.net/api/` |
| Portal Azure | `https://portal.azure.com` → Resource Group `rg-copilot-combate` |

---

## Troubleshooting

### "CORS error" no console do navegador
→ Verifique se a URL exata do frontend está no CORS da Function App (sem barra no final).

### Frontend carrega mas dados não sincronizam com Azure
→ Verifique se `VITE_API_URL` foi definido **em build time** (não runtime). Rebuild necessário após mudar.

### Function App retorna 500
→ No Portal Azure → Function App → **Monitor** → veja os logs de erro. Provavelmente a connection string do Storage está incorreta.

### Debug Dashboard mostra tudo vermelho
→ Normal se `VITE_API_URL` não está definido (modo localStorage). Após deploy com a variável, deve ficar verde.

### Tabelas não existem
→ Execute o script da Etapa 3 novamente para criar as tabelas. O backend tenta criar automaticamente, mas pode falhar por permissão.

---

## Comandos Rápidos de Referência

```powershell
# Re-deploy do backend
cd packages/backend-azure && func azure functionapp publish copilot-combate-api && cd ../..

# Re-deploy do frontend (se usando deploy manual)
cd packages/frontend && $env:VITE_API_URL="https://copilot-combate-api.azurewebsites.net" && npm run build && cd ../..

# Ver logs da Function App em tempo real
az functionapp log tail --name copilot-combate-api --resource-group rg-copilot-combate

# Restart da Function App
az functionapp restart --name copilot-combate-api --resource-group rg-copilot-combate

# Deletar tudo (CUIDADO!)
# az group delete --name rg-copilot-combate --yes --no-wait
```
