CREATE TABLE IF NOT EXISTS {}.blog_categories (
    id INT(12) NOT NULL auto_increment PRIMARY KEY,
    label VARCHAR(100) NOT NULL UNIQUE,
    labelColor CHAR(7) NOT NULL UNIQUE,
    description VARCHAR(300) NOT NULL

)