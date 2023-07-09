
let stack = require("stack");
let binarytree = require("binarytree");
let queue = require("queue");
let singlylinkedlist = require("singlylinkedlist");
let doublelinkedlist = require("doublelinkedlist");
let set = require("set");

let act = require('act');
let action = require("action");
let condition = require("condition");
let task = require("task");

//main 2.0

module.exports.loop = function () {
    
    var s= new stack.Stack();
    var a = new action.Action(1,2,3,4);
    var t = new task.Task();   // new Mining("5bbcaf7e9099fc012e63aaae"));

/*    
    let tasks = [];
    for( var t in tasks)
    {
        for(var i = 0; i < t.creeps.length(); i++)
        {
            var actionPerformed = false;
            var actionCurrent = t.actioncycle[t.actionCounter[i]]
            while(!actionPerformed && actionCurrent.startCondition)
            {
                if(!actionCurrent.endCondition)
                {
                    actionCurrent.act(target,t.creeps[i]);
                    actionPerformed = true;
                }else{
                        t.actionCounter[i]=(t.actionCounter[i]+1) % actioncycle.length();
                        actionCurrent=t.actioncycle[t.actionCounter[i]] 
                }
            }
        }
    }
*/
}
