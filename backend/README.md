# Backend for "Palette Archive" project

### Use stack:

* Nginx
* Gunicorn
* Python 3.10
* Flask
* Open CV
* MongoDB

### Simple dev run:
1. > python -m venv venv
2. > source venv/bin/activate
3. > pip install -r requirements.txt
4. > create .env file
5. > settings to env file
6. ```
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

7. > if you need uncomment secure options in app.py and send "dev api key" in headers
8. > python app.py
   
### Gunicorn Run (Production, Nginx Proxy)

8. > gunicorn --bind 127.0.0.1:5002 wsgi:app