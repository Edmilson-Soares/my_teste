

import { CronJob } from 'cron';

const tasks={}



export default{
    cron({time,fn,start=false,name}){
        if(!name) return null
       tasks[name]= new CronJob(time,()=>fn({job:tasks[name]}),null,start);
    },
    start(name){
        if(!name) return null
        tasks[name].start()
    },
    stop(name){
        if(!name) return null
        tasks[name].stop()
    }
}