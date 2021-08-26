CREATE TABLE IF NOT EXISTS blog_post_likes (
    post_id INT(12) NOT NULL,
    user_id INT(12) NOT NULL,
    UNIQUE KEY(post_id, user_id),
    CONSTRAINT fk_bplpost FOREIGN KEY(post_id)
    REFERENCES blog_posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_bpluser FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)