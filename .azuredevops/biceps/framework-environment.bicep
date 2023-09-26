// Resource names
@description('The name of the application insights.')
param appInsightsName string
@description('The name of the application service plan.')
param appServicePlanName string
@description('The name of the container registry.')
param containerRegistryName string
@description('Specifies the location for resources.')
param location string
@description('The name of the web application.')
param webAppName string
@description('The name of the application workspace.')
param workspaceName string
// Tags
@description('Specifies the client tag of the resource.')
param client string
@description('Specifies the owner tag of the resource.')
param owner string
@description('Specifies the project tag of the resource.')
param project string

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2022-02-01-preview' = {
  name: containerRegistryName
  location: location
  sku: {
    name: 'Basic'
  }
  tags: {
    owner: owner
    project: project
    client: client
  }
  properties: {
    adminUserEnabled: false
    policies: {
      quarantinePolicy: {
        status: 'disabled'
      }
      trustPolicy: {
        type: 'Notary'
        status: 'disabled'
      }
      retentionPolicy: {
        days: 7
        status: 'disabled'
      }
    }
  }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {

  name: appServicePlanName
  kind: 'linux'
  location: location
  tags: {
    owner: owner
    project: project
    client: client
  }
  sku: {
    name: 'B1'
    tier: 'Basic'
    size: 'B1'
    family: 'B'
    capacity: 1
  }
}

resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: webAppName
  kind: 'applinuxcontainer'
  location: location
  tags: {
    owner: owner
    project: project
    client: client
  }
  properties: {
    serverFarmId: appServicePlan.id
  }

}

resource workSpace 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: workspaceName
  location: location
  tags: {
    owner: owner
    project: project
    client: client
  }
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  kind: 'web'
  location: location
  tags: {
    owner: owner
    project: project
    client: client
  }
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: workSpace.id
  }
}
