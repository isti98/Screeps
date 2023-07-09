
//Action - egy cselekvés típus konkrét megkezdési és befejezési feltétellel definiálva.
//act - függvény , maga a cselekvés 
//target - a cselekvés tárgya vagy poziciója
class Action {

    constructor(startCondition, target, act, endCondition){
        this.target= target;
        this.startCondition= startCondition; 
        this.endCondition= endCondition;
        this.act= act;
    }
};
module.exports = Action;