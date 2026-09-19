import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director, Collider2D, Contact2DType, Collider, IPhysics2DContact } from 'cc';
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

    public isOver: boolean;

    onLoad(){
        this.initListener();
        this.results.resetScore();
        this.isOver = true;
        director.pause();
    }

    initListener(){
        //input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            if(this.isOver == true){
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            }else{
                this.bird.fly();
            }
        })
    }

    //testing method; DELETE IN FINAL
    //onKeyDown(event: EventKeyboard){
    //     switch(event.keyCode){
    //         case KeyCode.KEY_A:
    //             this.gameOver();
    //         break;
    //         case KeyCode.KEY_P:
    //             this.results.addScore();
    //         break;
    //         case KeyCode.KEY_Q:
    //             this.resetGame();
    //             this.bird.resetBird();
    //     }
    // }

    startGame(){
        this.results.hideResults();
        director.resume();
    }

    gameOver(){
        this.results.showResults();
        this.isOver = true;
        director.pause();
    }

    resetGame(){
        this.results.resetScore();
        this.pipes.reset();
        this.isOver = false;
        this.startGame();
    }

    passPipe(){
        this.results.addScore();
    }

    createPipe(){
        this.pipes.addPool();   
    }

    contactGroundPipe(){
        let collider = this.bird.getComponent(Collider2D);

        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        this.bird.hitSomething = true;
    }

    birdStruck(){
        this.contactGroundPipe();

        if (this.bird.hitSomething == true){
            this.gameOver();
        }
    }

    update(){
        if(this.isOver == false){
            this.birdStruck();
        }
    }
}


