# Deployment
 
 1. signup on aws
 2. launch instance
 3. create a key value pair 
 4. chmod 400<secret_key>.pem
 // connect to machine using the below ssh command
 5. ssh -i "devsMatch-secret.pem" ubuntu@ec2-34-236-153-241.compute-1.amazonaws.com
 now will be in the terminal of my machine 

 6. install node version 
 7. now clone git folders of devTinder server and devTinder backend

8. delpoy my Frontend project
    9. cd devTinder-web -> npm i-> npm run build (creates a dist folder that contains all the code  to run  on the server)
    10. to deploy our frontend project we will ne nginx
    11.  sudo apt update
    12. sudo apt install nginx 
    13. to start nginx sudo systemctl start  nginx
    14. enable nginx sudo systemctl enable nginx
    15. now copy dist(build file )to /var/www/html/. (ngix http server) 
    16. sudo scp -r dist/* /var/www/html/   (here -r is recursively and sudo-> to get root level permissions ,scp to copy it)
    17. enable port :80 by going to security group  so that our public IP address can run

9. deploy my Backend Project 
    1. cd Dev Tinder ->npm i -> npm run build  
    2.
    3.