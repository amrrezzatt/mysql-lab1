const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// ✅ هنا الاتصال بـ MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345' // ← نفس الباسورد اللي عملته فوق
});

// ✅ اختبار الاتصال
connection.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL successfully');
  }
});

// ✅ صفحة تسجيل الدخول
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'root' && password === '12345') {
    req.session.loggedin = true;
    res.redirect('/dashboard');
  } else {
    res.send('Login failed. Try again.');
  }
});

// ✅ عرض قاعدة البيانات والمستخدمين
app.get('/dashboard', (req, res) => {
  if (!req.session.loggedin) return res.redirect('/');
  connection.query('SHOW DATABASES', (err, dbs) => {
    if (err) return res.send(err);
    connection.query('SELECT user, host FROM mysql.user', (err2, users) => {
      if (err2) return res.send(err2);
      res.render('dashboard', { dbs, users });
    });
  });
});

// ✅ صفحة إضافة قاعدة بيانات
app.get('/add-db', (req, res) => {
  if (!req.session.loggedin) return res.redirect('/');
  res.render('add-db');
});

app.post('/add-db', (req, res) => {
  const { dbname } = req.body;
  connection.query(`CREATE DATABASE ??`, [dbname], err => {
    if (err) return res.send(err);
    res.redirect('/dashboard');
  });
});

// ✅ صفحة إضافة مستخدم
app.get('/add-user', (req, res) => {
  connection.query('SHOW DATABASES', (err, dbs) => {
    if (err) return res.send(err);
    res.render('add-user', { dbs });
  });
});

app.post('/add-user', (req, res) => {
  const { username, password, dbname } = req.body;
  const q = `CREATE USER '${username}'@'localhost' IDENTIFIED BY ?; GRANT ALL PRIVILEGES ON \`${dbname}\`.* TO '${username}'@'localhost'; FLUSH PRIVILEGES;`;
  connection.query(q, [password], err => {
    if (err) return res.send(err);
    res.redirect('/dashboard');
  });
});

// ✅ صفحة إنشاء جدول
app.get('/create-table', (req, res) => {
  connection.query('SHOW DATABASES', (err, dbs) => {
    if (err) return res.send(err);
    res.render('create-table', { dbs });
  });
});

app.post('/create-table', (req, res) => {
  const { dbname, tablename } = req.body;
  const q = `CREATE TABLE \`${dbname}\`.\`${tablename}\` (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50));`;
  connection.query(q, err => {
    if (err) return res.send(err);
    res.redirect('/dashboard');
  });
});

app.listen(3000, () => {
  console.log('🚀 App running at http://localhost:3000');
});
