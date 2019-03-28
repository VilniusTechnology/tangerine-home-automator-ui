# Prepare server and launch application

###Create user:

``sudo adduser tangerine``

``sudo visudo``

Add line `tangerine ALL=(ALL:ALL) ALL` and save file

(More info)[https://www.raspberrypi.org/documentation/linux/usage/users.md]


###Setup hostname (loacal URL):  
https://www.howtogeek.com/167190/how-and-why-to-assign-the-.local-domain-to-your-raspberry-pi/


####Install NGINX:

``sudo apt-get update``

``sudo apt-get install nginx``

####Configure NGINX

`su tangerine`

Open: ``sudo nano /etc/nginx/sites-enabled/default``

`mkdir -p /home/tangerine/nest-ui/tangerine-home-automator-ui`

Change ``root /var/www/html;`` to path ``root /home/tangerine/nest-ui/tangerine-home-automator-ui;``

Restart ``sudo systemctl restart nginx``

Copy files produced by ``ng build --prod`` to directory `/home/tangerine/nest-ui/tangerine-home-automator-ui;`

More details: http://www.codingpedia.org/ama/how-to-configure-nginx-in-production-to-serve-angular-app-and-reverse-proxy-nodejs


NG ON HTTPS:
https://medium.com/@rubenvermeulen/running-angular-cli-over-https-with-a-trusted-certificate-4a0d5f92747a

https://medium.com/@richardr39/using-angular-cli-to-serve-over-https-locally-70dab07417c8
