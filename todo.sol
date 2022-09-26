// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract toDoList{
    struct toDo{
string text;
bool completed;
    }
    toDo[] public todos;
    function create(string calldata _text)public {
            todos.push(toDo(_text,false));
            todos.push(toDO(text:_text,completed:false));
            toDO memory todo;
            todo.text=_text;
            todos.push(todo);
    }

    function get(uint _index)public view returns(string memory text,bool completed){
toDO storage td=todos[_index];
return (td.text,td.completed);
    }
    function update(string memory _text,uint _index)public{
        toDO storage td=todos[_index];
        td.text=_text;
    }
    function toggleCompleted(uint _index) public{
        toDO storage td=todos[_index];
        td.completed=!td.completed;
    }
}