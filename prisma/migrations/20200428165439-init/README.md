# Migration `20200428165439-init`

This migration has been generated by quino0627 at 4/28/2020, 4:54:39 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `arfit-research`.`Exercise` ADD COLUMN `muscleMain` varchar(191)   ,
ADD COLUMN `muscleSub` varchar(191)   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200427171319-init..20200428165439-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "mysql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -30,13 +30,15 @@
   isDone   Boolean
 }
 model Exercise {
-  id        Int      @default(autoincrement()) @id
-  name      String
-  machine   Machine? @relation(fields: [machineId], references: [id])
-  machineId Int?
-  questId   Int?
+  id         Int      @default(autoincrement()) @id
+  name       String
+  muscleMain String?
+  muscleSub  String?
+  machine    Machine? @relation(fields: [machineId], references: [id])
+  machineId  Int?
+  questId    Int?
 }
 model Machine {
   id                 Int        @default(autoincrement()) @id
```


