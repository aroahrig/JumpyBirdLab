import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property({
        type:Ground,
        tooltip:'this is ground'
    })
    public ground: Ground;

    @property({
        type:Results,
        tooltip:'results go here'
    })
    public results: Results;

    @property({
        type:Bird,
        tooltip:'bird goes here'
    })
    public bird: Bird;

    @property({
        type:PipePool,
        tooltip:'pipePool here'
    })
    public pipes: PipePool;
    
    @property({
        type:CCInteger
    })
    public speed: number = 300;

    @property({
        type:CCInteger
    })
    public pipeSpeed: number = 200;

    onLoad(){
        this.initListener();
        this.results.resetScore();
        director.pause();
    }

    initListener(){
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            this.bird.fly();
        })
    }

    //testing method; DELETE IN FINAL
    onKeyDown(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.gameOver();
            break;
            case KeyCode.KEY_P:
                this.results.addScore();
            break;
            case KeyCode.KEY_Q:
                this.resetGame();
                this.bird.resetBird();
        }
    }

    startGame(){
        this.results.hideResults();
        director.resume();
    }

    gameOver(){
        this.results.showResults();
        director.pause();
    }

    resetGame(){
        this.results.resetScore();
        this.pipes.reset();
        this.startGame();
    }

    passPipe(){
        this.results.addScore();
    }

    createPipe(){
        this.pipes.addPool();
        
    }
}


