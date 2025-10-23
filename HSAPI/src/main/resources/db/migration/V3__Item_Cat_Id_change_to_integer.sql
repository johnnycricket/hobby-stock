-- categories change from bigint to integer
alter TABLE categories alter column id type integer using id::integer;
alter TABLE items alter column category_id type integer using category_id::integer;

-- projects, items, project_items change from bigint to uuid
alter TABLE projects alter column id type uuid using id::uuid;
alter TABLE items alter column id type uuid using id::uuid;
alter TABLE project_items alter column project_id type uuid using project_id::uuid;
alter TABLE project_items alter column item_id type uuid using item_id::uuid;
