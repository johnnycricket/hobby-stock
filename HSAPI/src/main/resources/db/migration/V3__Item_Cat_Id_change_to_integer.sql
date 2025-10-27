-- categories change from bigint to integer
alter TABLE categories alter column id type integer using id::integer;
alter TABLE items alter column category_id type integer using category_id::integer;

-- projects, items, project_items change from bigint to uuid
-- Step 1: Add new UUID columns
alter TABLE projects add column id_new uuid;
alter TABLE items add column id_new uuid;
alter TABLE project_items add column id_new uuid;
alter TABLE project_items add column project_id_new uuid;
alter TABLE project_items add column item_id_new uuid;

-- Step 2: Generate UUIDs for existing records
update projects set id_new = gen_random_uuid();
update items set id_new = gen_random_uuid();
update project_items set id_new = gen_random_uuid();

-- Step 3: Update foreign key references in project_items
update project_items 
set project_id_new = (select id_new from projects where projects.id = project_items.project_id);
update project_items 
set item_id_new = (select id_new from items where items.id = project_items.item_id);

-- Step 4: Drop foreign key constraints temporarily
alter table project_items drop constraint if exists project_items_project_id_fkey;
alter table project_items drop constraint if exists project_items_item_id_fkey;
alter table items drop constraint if exists items_category_id_fkey;

-- Step 5: Drop old columns and rename new ones
-- Handle projects table
alter table projects drop column id;
alter table projects rename column id_new to id;
alter table projects add primary key (id);

-- Handle items table
alter table items drop column id;
alter table items rename column id_new to id;
alter table items add primary key (id);

-- Handle project_items table - drop primary key first, then columns
alter table project_items drop constraint project_items_pkey;
alter table project_items drop column id;
alter table project_items rename column id_new to id;
alter table project_items add primary key (id);
alter table project_items drop column project_id;
alter table project_items rename column project_id_new to project_id;
alter table project_items drop column item_id;
alter table project_items rename column item_id_new to item_id;

-- Step 6: Recreate foreign key constraints
alter table items add constraint items_category_id_fkey 
    foreign key (category_id) references categories(id);
alter table project_items add constraint project_items_project_id_fkey 
    foreign key (project_id) references projects(id) on delete cascade;
alter table project_items add constraint project_items_item_id_fkey 
    foreign key (item_id) references items(id) on delete cascade;
