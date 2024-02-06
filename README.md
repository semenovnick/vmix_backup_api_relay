# vmix_backup_api_relay

Relay app for VMIX API
This app will use **_"Main"_** and **_"Backup"_** VMIX instances. The application switches the connection to the **_Main_** or **_Backup_** VMIX instance.

App API:

- **_/set_** with parameters:
  - _Backup=true_ - if you want to change **_Backup_** parameters, left empty if you want to change **_Main_**
  - _ip_
  - _port_
- **_/switch_** with parameters:

  - _to=backup_ or _to=main_ - choose what instance you want to switch

- **_/getStatus_** - returning which instance is selected
- **_/getConfig_** - returning config

to use rename **/config/config_template.json** to **config.json**
