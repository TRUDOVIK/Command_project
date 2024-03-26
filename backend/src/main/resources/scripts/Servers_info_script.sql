CREATE TABLE IF NOT EXISTS type_server (
    type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS status_server (
    status_id SERIAL PRIMARY KEY,
    status_name VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS server_information (
    server_id SERIAL PRIMARY KEY,
	name_of_server VARCHAR(50) NOT NULL,
    add_date DATE NOT NULL, 
    server_type_id INT NOT NULL, 
    status_id INT NOT NULL,
    last_work_date DATE, 
    description TEXT, 
	server_address VARCHAR(16),
	server_comment TEXT,
	polling_interval INT NOT NULL,
	update_date DATE,
	additional_indicators TEXT,
    FOREIGN KEY (server_type_id)  REFERENCES type_server (type_id),
    FOREIGN KEY (status_id)  REFERENCES status_server (status_id)
);

INSERT INTO type_server (type_name) VALUES
('Бесплатный VPN'),
('Игровой'),
('Веб-сервис')
ON CONFLICT (type_name) DO NOTHING;

INSERT INTO status_server (status_name) VALUES
('Работает'),
('Лежит'),
('Не определен')
ON CONFLICT (status_name) DO NOTHING;

INSERT INTO server_information (name_of_server, add_date, server_type_id, status_id, polling_interval) VALUES
('Heroes and Generals', '2016-02-02', 2, 2, 1),
('Hunt Showdown', '2019-02-02', 2, 1, 1);

SELECT * FROM server_information;