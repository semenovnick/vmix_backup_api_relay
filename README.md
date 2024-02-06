# vmix_backup_api_relay

Relay app for VMIX API
This app will use **_"Main"_** and **_"Backup"_** VMIX instances. The application switches the connection to the **_Main_** or **_Backup_** VMIX instance.
App API:

- /set with parameters:
  - Backup=true - if you want to change **_Backup_** parameters, left empty if you want to change **_Main_**
  - ip
  - port
- /switch with parameters:

  - to=backup or to=main - choose what instance you want to switch

- /getStatus - returning which instance is selected
- /getConfig - returning config
