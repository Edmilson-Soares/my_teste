import task from "./task.js";


task.cron({
    time:'* * * * * *',
    name:'test',
    fn:({job})=>{
        console.log('>')
        task.stop('test')
   
    }
})


task.start('test')