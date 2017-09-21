# test-task
Test task: list of clients.

Functionality:
 - Display list of clients
 - Add new client
 - Display information about client by id

Run instruction:
 1. Run "pm install" in base dir and in client dir
 2. Run sequelize db:migrate (need a sequelize-cli as global module)
 3. Compile backend (tsc in base dir, need a typescript as global module)
 4. Run server/dist/boot.js
 5. Client part has npm tasks for serve(develop mode), build and build-prod
