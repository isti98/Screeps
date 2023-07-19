class Role{
    contructor(){
        throw new Error('Role is an abstrakt class, no construtor can be called');
    }
    function body(){
        throw new Error('Role is an abstrakt class, no body function can be called');
    }
    function cost(){
        throw new Error('Role is an abstrakt class, no cost function can be called');
    }
    function task(){
        throw new Error('Role is an abstrakt class, no task function can be called');
    }
};
module.exports = Role;