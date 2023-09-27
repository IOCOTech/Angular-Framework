# Configuration Settings Setup

Config settings is specified in the 'config.json'.

These json files are validated against the 'config.schema.json'.

File replacements are specified in angular.json.

To specify new properties

- First add them to the interface file using 'config.interface.ts'
- Then run 'npm run build:config' to generate the schema file
- Update all config.json files
