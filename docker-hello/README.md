Play with docker

	docker build -t h0x91b/php-skeleton1 .


Mysql

	docker run --name mariadb1 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mariadb

Adminer (like phpmyadmin)

	docker run --link mariadb1:db -p 8081:8080 adminer

Go to http://127.0.0.1:8081/, host "db" name root, password "my-secret-pw"