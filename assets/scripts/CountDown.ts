import { _decorator, Component,Vec3, Node, Label, ProgressBar,v3, Animation, find, Button} from 'cc';
const { ccclass, property } = _decorator;



@ccclass('CountDown')
export class CountDown extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
   
    @property({type: Node})
    public Gesture: Node = null;

    @property({type: Node})
    public UnCapture: Node = null;

    @property({type:Node})
    public CaptureS1 :Node = null;



    //倒计时10s
    public times: number = 10;


    //移动牛头原坐标
    private oldHeadPos:Vec3 = v3();
    //private pullCowsAn:any

    onLoad(){
        this.oldHeadPos = this.node.children[2].getPosition();
        
        //this.pullCowsAn.play('pull');
    }

    start () {
        // Your initialization goes here.
        //this.pullCowsAn = this.CaptureS1.getComponent(Animation);
        
    }

    public init(){
        this.times = 10;
        this.node.children[1].getComponent(ProgressBar).progress = 1;
        this.node.children[2].setPosition(this.oldHeadPos);
        this.node.children[3].getComponent(Label).string = '10'
    }
    

    _countDown(){
        //console.log(this.times)
        
        //head
        const head:Vec3 = this.node.children[2].position;

        //进度条
        this.node.children[1].getComponent(ProgressBar).progress= this.times/10;

        //时间 倒计时赋值Lebal
        this.node.children[3].getComponent(Label).string = this.times.toString();

        if(this.times < 10){
            head.x -= 36;
            this.node.children[2].setPosition(head)
        }

        if(this.times < 1){
            this.unscheduleAllCallbacks();
            find("Manager/Cature-s1").getComponent(Animation).stop();
            find("Manager/Cature-s1").active = false;
            find("Manager/Gesture").active = false;

            //this.node.parent.parent.addChild(this.UnCapture);
            
            //this.UnCapture.active = true;

            //未被捕获的牛群显示
            find("UnCapture").active = true;

            find("Manager/Cature-s2").active = true;


            find("Manager/ButtonPlay").getComponent(Button).interactable = false;

            console.log('点击时间结束');

            //this.scheduleOnce(this.gameOver(),2);


            return;
        }
        
        this.times --; 
        this.scheduleOnce(this._countDown.bind(this),1)
    }


    onEnable(){
        find("Manager/Cature-s1").getComponent(Animation).play();
    }


    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
