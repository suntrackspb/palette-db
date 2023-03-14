# Backend for "Palette Archive" project

### Use stack:

* Nginx
* Gunicorn
* Python 3.10
* Flask
* Open CV
* MongoDB

### Simple dev run:
1. pip install -r requirements.txt
2. create .env file
3. settings to env file
```
  SRV_HOST="0.0.0.0"
  SRV_PORT=5001
  DEBUG=True
  LOG=False
  LOG_FILE="/path/to/log/file"
  
  DB_HOST="0.0.0.0"
  DB_PORT=27017
  DB_USER="user"
  DB_PASS="password"
  
  DEV_API_KEY="DevSecretApiKey"
  JWT_SECRET_KEY="SuperSecretKey"
  
  TEMP_PATH="/path/for/temp/images/create"
  USERS_IMAGE_PATH="/path/for/users/upload/images"
  
  HOST_IMAGE_URL="https://default_database_images"
  USERS_IMAGE_URL="https://users_upload_images"
  
  ALLOW_IPS="192.168.0.100,192.168.0.101,ip_allowed_to_admin_panel"
```
4. if you need uncomment secure options in app.py and send api key in headers
