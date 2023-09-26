// Resource names
@description('The name of the application insights.')
param appInsightsName string = 'ai-angular-framework-dev-sanorth-001'
@description('The name of the application service plan.')
param appServicePlanName string = 'asp-angular-framework-dev-sanorth-001'
@description('The name of the container registry.')
param containerRegistryName string = 'crAngularFrameworkDevSanorth001'
@description('Specifies the location for resources.')
param location string = 'southafricanorth'
@description('The name of the web application.')
param webAppName string = 'wa-angular-framework-dev-sanorth-001'
@description('The name of the application workspace.')
param workspaceName string = 'ws-angular-framework-dev-sanorth-001'
// Tags
@description('Specifies the client tag of the resource.')
param client string = 'IOCO'
@description('Specifies the owner tag of the resource.')
param owner string = 'Sakkie van Zyl'
@description('Specifies the project tag of the resource.')
param project string = 'IOCO Angular framework'
