import Hemera from 'nats-hemera'

import { connect, StringCodec } from "nats";

const nc = await connect({ servers: "localhost:4444" });



const hemera = new Hemera(nc, {
  logLevel: 'info'
})

hemera.ready(() => {
  hemera.add(
    {
      topic: 'math',
      cmd: 'add'
    },
    function(req, cb) {
      cb(null, req.a + req.b)
    }
  )
  hemera.act(
    {
      topic: 'math',
      cmd: 'add',
      a: 1,
      b: 2
    },
    function(err, resp) {
      this.log.info(resp, 'Result')
    }
  )
})



/*
import { connect, StringCodec } from "nats";

const nc = await connect({ servers: "localhost:4444" });
const sc = StringCodec();

// subscriptions can have wildcard subjects
// the '*' matches any string in the specified token position
const s1 = nc.subscribe("help.*.system");
const s2 = nc.subscribe("help.me.*");
// the '>' matches any tokens in that position or following
// '>' can only be specified at the end of the subject
const s3 = nc.subscribe("help.>");

async function printMsgs(s) {
  let subj = s.getSubject();
  console.log(`listening for ${subj}`);
  const c = (13 - subj.length);
  const pad = "".padEnd(c);
  for await (const m of s) {
    console.log(
      `[${subj}]${pad} #${s.getProcessed()} - ${m.subject} ${
        m.data ? " " + sc.decode(m.data) : ""
      }`,
    );
  }
}

printMsgs(s1);
printMsgs(s2);
printMsgs(s3);

// don't exit until the client closes
await nc.closed();

*/