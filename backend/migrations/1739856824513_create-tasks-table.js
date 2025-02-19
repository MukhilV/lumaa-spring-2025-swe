

  exports.up = (pgm) => {
    pgm.createTable("task", {
      id: { type: "serial", primaryKey: true },
      title: { type: "varchar(255)", notNull: true },
      description: { type: "text", notNull: false },
      iscomplete: { type: "boolean", notNull: true, default: false },
      userId: {
        type: "integer",
        references: "users",
        onDelete: "CASCADE",
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable("task");
  };
  
  