let express     = require('express'),
    app11         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    cors        = require('cors')
    
  const path    = require('path')

app11.use(cors())

app11.use(bodyParser.json());
app11.use(bodyParser.urlencoded({extended: true}));

const publicDir = require('path').join(__dirname,'/../');
app11.use(express.static(publicDir))

app11.use(
      "/css",
      express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
    )
    app11.use(
      "/js",
      express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
    )
    app11.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))
    

mongoose.connect('mongodb://localhost:27017/agenda',{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
        .once('open', ()=>console.log('connected to db'))
        .on('error',(error)=>console.log('connection to database failed'))

const Task = require('./models/task');
const User = require('./models/user');

app11.get('/', (req,res)=>{
    res.sendFile(publicDir+'/Frontend/index.html')
})
app11.get('/login', (req,res)=>{ console.log("hello")
    res.sendFile(publicDir+'/Frontend/login.html')
})
app11.get('/signup', (req,res)=>{
    res.sendFile(publicDir+'/Frontend/signup.html')
})
app11.get('/test', (req,res)=>{
    res.sendFile(publicDir+'/Frontend/homepage.html')
})

app11.post('/login', (req, res)=>{
    User.findOne(req.body)
        .then((data)=>{
            if(data){
                res.json({'auth': true});
                console.log(data);
            }else{
                res.json({'auth': false});
                console.log(`wrong username or password:`);  
            }
        })
})

app11.post('/signup', (req,res) =>{
    new User(req.body)
        .save()
        .then((data)=>{
            res.json({save: true});
            console.log(data);
        })
        .catch((err)=>{
            res.json({save: false});
            console.log(err);
        })
})

app11.get('/:username',(req,res)=> {
    res.sendFile(publicDir+'/Frontend/task.html')
})

app11.get('/:username/tasksList', (req,res)=> {

    Task.find({username: req.params.username})
        .then((taskList)=>{
            res.json({taskList:  taskList});
            console.log(taskList) 
        })
        .catch((err)=>{
            console.log(err);
            res.json({taskList: taskList});
        })
})

app11.post('/:username/addTask', (req,res)=>{
    console.log(req.body)
    new Task(req.body)
        .save()
        .then((data)=>{
            res.json({save: true});
        })
        .catch((err)=>{
            console.log(err);
            res.json({save: false});
        })    
}) 

app11.delete('/delete/:id', (req, res)=>{
    console.log('id ===== ', req.params.id)
    Task.deleteOne({_id: req.params.id})
        .then((data)=>{
            console.log(data);
            res.json({delete: true});
        })
        .catch((err)=>{
            console.log(err);
            res.json({delete: false});
        })
})

app11.get('/details/:id',(req, res)=>{
    res.sendFile(publicDir+'/Frontend/details.html')
})

app11.get('/data/:id', (req, res)=>{
    Task.findById(req.params.id)
        .then((data)=>{
            res.json(data);
        })
        .catch((err)=>{
            console.log(err);
        })
})

app11.put('/update/:id', (req,res)=>{
    Task.findByIdAndUpdate(req.params.id, {details:req.body.details},{new: true})
            .then((data)=>{
                console.log(data);
                res.json(data);
            })
            .catch((err)=>{
                console.log(err);
            })
    console.log(req.body);
})

app11.listen(3000, ()=>console.log("connected to port 3000"))