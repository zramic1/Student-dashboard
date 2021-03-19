const Sequelize = require("sequelize");

//Povezivanje sa bazom
const sequelize = new Sequelize('wt2018', 'root', 'root', { 
    host: 'localhost',
    dialect: 'mysql',
    logging:false
}); 


const db={};
db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//Import modela
db.student = sequelize.import(__dirname+'/student.js');
db.godina = sequelize.import(__dirname+'/godina.js');
db.zadatak = sequelize.import(__dirname+'/zadatak.js');
db.vjezba = sequelize.import(__dirname+'/vjezba.js');

//Veza jedan na vise
db.godina.hasMany(db.student,{as:'studenti', foreignKey:'studentGod'});

//Veza vise na vise
db.godina.belongsToMany(db.vjezba,{as:'vjezbe',through:'godina_vjezba',foreignKey:'idgodina'});
db.vjezba.belongsToMany(db.godina,{as:'godine',through:'godina_vjezba',foreignKey:'idvjezba'});

db.vjezba.belongsToMany(db.zadatak,{as:'zadaci',through:'vjezba_zadatak',foreignKey:'idvjezba'});
db.zadatak.belongsToMany(db.vjezba,{as:'vjezbe',through:'vjezba_zadatak',foreignKey:'idzadatak'});

module.exports=db;