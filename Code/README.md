# MashTub.Pi

### Purpose
This will be the software to control the fully automated mashtub I'm building right now. It's going to run on a 
*Raspberry Pi Zero W* and will be accessible via a web interface.
Both the webinterface and the control software will be mostly written in python 3.6.
 
### Dependencies
```
pip install flask
pip install tornado

```

### Usage
Start `server.py` on the Raspberry Pi via `ssh` or autostart. Then you can connect with your browser and for the URL 
**192.168.0.2:5000/start** (use your Raspberry's IP).

### License
GPL v3.0

### Disclaimer
This is just a hobby project and it's far from working.