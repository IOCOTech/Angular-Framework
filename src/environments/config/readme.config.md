# Configuration Settings Setup

Config settings is specified in the 'config.json'.

These json files are validated against the 'config.schema.json'.

File replacements are specified in angular.json.

To specify new properties

- First add them to the schema file using 'config.schema.json'
- Then to the IConfig file
- Then to all config.json files
- Then update the config.service.ts to include the mapping of the settings in the constructor.
