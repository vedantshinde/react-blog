CREATE TABLE IF NOT EXISTS {}.blog_post_comments (
    id INT(12) NOT NULL auto_increment PRIMARY KEY,
    post_id INT(12) NOT NULL,
    user_id INT(12) NOT NULL,
    comment VARCHAR(250) NOT NULL,
    INDEX bpcuser_ind (user_id),
    INDEX bpcpost_ind (post_id),
    CONSTRAINT fk_bpcuser FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_bpcpost FOREIGN KEY (post_id)
    REFERENCES blog_posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)