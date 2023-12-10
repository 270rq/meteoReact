
INSERT INTO sun (date, city_id,sunset, sunrise)
VALUES ('2023-12-07',411,'16:30:00', '08:30:00');

INSERT INTO menu (id, city_id, temperature, precipitation, uv_index, wind_speed, wind_direction, visibility)
VALUES ('2023-12-07 18:24:00', 411, -5.0, 0.5, 2, 10.0, 'NE', 10.0);

INSERT INTO family (name)
VALUES ('Злаки'),
    ('Травы'),
    ('Деревья'),
    ('Грибы');

INSERT INTO flower (name, family)
VALUES ('Берёза','Деревья'),
    ('Ольха','Деревья'),
    ('Кладоспориум','Грибы');

INSERT INTO map (day, name_flower, x, y,lvl)
VALUES ('2023-12-07', 'Берёза', 12, 20,'Средний'),
    ('2023-12-07', 'Ольха', 30, 40,'Низкий'),
    ('2023-12-07', 'Береза', 50, 60,'Низкий'),
    ('2023-12-07', 'Кладоспориум', 7, 8,'Очень высокий');
