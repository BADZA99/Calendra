import { DAYS_OF_WEEK_IN_ORDER } from "@/constants";
import { relations } from "drizzle-orm";
import { boolean, index, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";


// Define a reusable `createdAt` timestamp column with default value set to now
const createdAt = timestamp("createdAt").notNull().defaultNow()

// Define a reusable `updatedAt` timestamp column with automatic update on modification
const updatedAt = timestamp("updatedAt")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date()) // automatically updates to current time on update peu importe quand on modifie la ligne

// Define the "events" table with fields like name, description, and duration
export const EventTable = pgTable(
    "events", // table name in the database
    {
        id: uuid("id").primaryKey().defaultRandom(),            
      // unique ID with default UUID
      // uuid("id"): Defines a column named "id" with the UUID type.
  
      // .primaryKey(): Makes this UUID the primary key of the table.
  
      // .defaultRandom(): Automatically fills this column with a randomly generated UUID (v4) if no value is provided.
      name: text("name").notNull(), // event name
      description: text("description"), // optional description pck notnull
      durationInMinutes: integer("durationInMinutes").notNull(), // duration of the event
      clerkUserId: text("clerkUserId").notNull(),// ID of the user who created it (from Clerk)
      isActive: boolean("isActive").notNull().default(true),// whether the event is currently active
      createdAt,// timestamp when event was created
      updatedAt,// timestamp when event was last updated

    },
    table => ([
        index("clerkUserIdIndex").on(table.clerkUserId),// index on clerkUserId for faster querying
      ])
)

// Define the "schedules" table, one per user, with timezone and timestamps
export const ScheduleTable = pgTable("schedules", {
    id: uuid("id").primaryKey().defaultRandom(),         // primary key with random UUID
    timezone: text("timezone").notNull(),                // user's timezone
    clerkUserId: text("clerkUserId").notNull().unique(), // unique user ID from Clerk
    createdAt,                                           // when the schedule was created
    updatedAt,                                           // when the schedule was last updated
  })

    // Define relationships for the ScheduleTable: a schedule has many availabilities
    export const scheduleRelations = relations(ScheduleTable, ({ many }) => ({
    availabilities: many(ScheduleAvailabilityTable), // one-to-many relationship
  }))


  // Define a PostgreSQL ENUM for the days of the week
  export const scheduleDayOfWeekEnum = pgEnum("day", DAYS_OF_WEEK_IN_ORDER)


// Define the "scheduleAvailabilities" table, which stores available time slots per day
export const ScheduleAvailabilityTable = pgTable(
    "scheduleAvailabilities",
    {
      id: uuid("id").primaryKey().defaultRandom(),// unique ID
      scheduleId: uuid("scheduleId") // foreign key to the Schedule table
        .notNull()
        .references(() => ScheduleTable.id, { onDelete: "cascade" }), // cascade delete when schedule is deleted
      startTime: text("startTime").notNull(), // start time of availability (e.g. "09:00")
      endTime: text("endTime").notNull(), // end time of availability (e.g. "17:00")
      dayOfWeek: scheduleDayOfWeekEnum("dayOfWeek").notNull(), // day of the week (ENUM)
    },
    table => ([
      index("scheduleIdIndex").on(table.scheduleId),           // index on foreign key for faster lookups
    ])
  )

  // Define the reverse relation: each availability belongs to a schedule
export const ScheduleAvailabilityRelations = relations(
    ScheduleAvailabilityTable,
    ({ one }) => ({
      schedule: one(ScheduleTable, {
        fields: [ScheduleAvailabilityTable.scheduleId], // local key
        references: [ScheduleTable.id], // foreign key
      }),
    })
  )

  // ?neon est une base de données serverless (c'est a dire qu'elle s'adapte automatiquement à la charge de travail et ne nécessite pas de gestion de serveur  ) qui utilise PostgreSQL comme moteur de base de données.
   
  // ?Drizzle ORM est un ORM (Object-Relational Mapping) qui permet d'interagir avec la base de données de manière type-safe et intuitive. Il est conçu pour fonctionner avec des bases de données relationnelles comme PostgreSQL, MySQL, SQLite, etc.

  // ! ensuite copier ceci dans package.json (dans scripts) pour les commandes drizzle
  // "db:generate": "drizzle-kit generate", pour generer le schema
  // "db:migrate": "drizzle-kit migrate", pour migrer la base de données
  // "db:studio": "drizzle-kit studio" pour ouvrir l'interface
  //npm run db:generate pour générer le schema
  //npm run db:migrate pour migrer la base de données
  //npm run db:studio pour ouvrir l'interface de gestion de la base de données
//ensuite cree le fichier drzzle.config.ts à la racine du projet

  