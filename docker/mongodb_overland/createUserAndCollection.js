// db.createUser({
//   user: "overland",
//   pwd: "overland",
//   roles: [
//     { role: "readWrite", db: "overland" }
//   ]
// });

db.createUser({
  user: '$MONGO_INITDB_DATABASE_USER',
  pwd: 'MONGO_INITDB_DATABASE_PWD',
  roles: [
    { role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }
  ]
});

// db.createCollection("locations", (err, result) => {});
db.createCollection("locations");
