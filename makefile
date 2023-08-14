DATABASE_URL_VALUE=postgresql://admin:admin@localhost:5433/task_manager_test?schema=public

start-test-db:
	docker run -d \
		--name task_manager_postgres_test \
		-p 5433:5432 \
		-e POSTGRES_USERNAME=admin \
		-e POSTGRES_PASSWORD=admin \
		-e POSTGRES_PASSWORD_ROOT=admin \
		-e POSTGRES_DB=task_manager_test \
		-v pgdata_test:/data/postgres_test \
		bitnami/postgresql
	DATABASE_URL=$(DATABASE_URL_VALUE) npx prisma migrate deploy
	

stop-test-db:
	docker stop task_manager_postgres_test
	docker rm task_manager_postgres_test
	docker volume rm pgdata_test

clean: stop-test-db