import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

app.use(cors())

app.use(express.json());

const db = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'blog' 
}).promise();

app.get('/blogs', async (req, res) => {
    
    try {
        const temp = await db.query('SELECT * FROM blogs');
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving blogs ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/blogs', async (req, res) => {
    try {
        let blogData = [req.body.title, req.body.content, req.body.create_at];

        if (blogData[0].length < 1) {
            return res.status(400).json({ error: "Blog's title must have at least 1 character" });
        }
        if (blogData[1].length < 1) {
            return res.status(400).json({ error: "Blog's must have content" });
        }
        var blogDate = blogData[2].split('-')
        if (blogDate.length != 3) {
            return res.status(400).json({ error: "Date should contain 3 '-'." });
        }

        const [rows, fields] = await db.query('INSERT INTO blogs (title, content, create_at) VALUES (?,?,?)', blogData);
        res.status(200).json({ message: 'Blog successfully added!'});


    } catch (error) {
        console.error(`Error retrieving blogs ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.delete('/blogs/:blogId', async (req, res) => {
    try {
        let blogId = parseInt(req.params.blogId);
        const [rows, fields] = await db.query('DELETE FROM blogs WHERE id =?', [blogId]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Blog not found" });
        } else {
            res.status(200).json({ message: "Blog successfully removed" });
        }
 
    } catch (error) {
        console.error(`Error retrieving phones ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get('/blogs/:blogId', async (req, res) => {
    try {
        let blogId = parseInt(req.params.phoneId);
        const [rows, fields] = await db.query('SELECT id, title, content, create_at FROM blogs WHERE id =?', [blogId]);
        if (rows.length == 1){
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({error: 'There is no blog with this id.'});
        }
    } catch (error) {
        console.error(`Error retrieving blogs ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.listen(3000);
