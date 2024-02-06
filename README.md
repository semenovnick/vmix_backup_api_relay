# vmix_backup_api_relay

Relay app for VMIX API
This app will use **_"Main"_** and **_"Backup"_** VMIX instances. The application analyzes the connection status to the **_Main_** and **_Backup_** VMIX instance. Depending on the state, switches the output of the xml request result from `http://vmixip:vmixport/api`. Thus, simulating one VMIX instance. Requests via `/api?Function=` are duplicated on both **_Main_** and **_Backup_**
