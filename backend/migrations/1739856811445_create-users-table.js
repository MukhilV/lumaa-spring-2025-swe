exports.up = (pgm) => {
    pgm.createTable("users", {
      id: { type: "serial", primaryKey: true },
      username: { type: "varchar(255)", notNull: true, unique: true },
      password: { type: "text", notNull: true },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable("users");
  };
