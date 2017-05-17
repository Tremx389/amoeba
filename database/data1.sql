-- Table: public.lepesek

-- DROP TABLE public.lepesek;

CREATE TABLE public.lepesek
(
  lepo_id integer,
  date date,
  latta_date date,
  "x.y" point
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.lepesek
  OWNER TO postgres;
