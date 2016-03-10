DROP TABLE if exists tasks;

CREATE TABLE tasks (
  task_id SERIAL UNIQUE PRIMARY KEY,
  task_name VARCHAR(50),
  task_desc TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  task_time_start TIMESTAMP,
  task_time_end TIMESTAMP,
  task_created TIMESTAMP DEFAULT now()
);
