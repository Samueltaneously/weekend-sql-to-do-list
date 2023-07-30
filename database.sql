CREATE TABLE "todo_items" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
  "complete" BOOLEAN DEFAULT FALSE,
  "due" DATE,
  "completed" DATE
);


