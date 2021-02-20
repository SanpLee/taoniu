import { _decorator, Component,Vec3, Node, systemEvent, EventMouse, animation,Animation,AnimationClip, v3, Label, loader, SpriteFrame,IPropertyCurveData,js } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('CowsCon0010')
export class CowsCon0010 extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    private _curJumpTime: number = 0;
    private _curPos: Vec3 = v3();
    private _speed :number = 300;
    private _deltaPos: Vec3 = v3(0, 0, 0);
    private _targetPos: Vec3 = v3();
    
    public cowType:number;

    private _autoDestoryTime: number = 20;

    private redAmount: any =null;

    //public spriteFrames: [] =null


    onLoad () {
        //随机生成牛类型
        //this.cowType = Math.ceil(Math.random() * 10);    
        //初始化速度
        //this._speed = -(Math.random() * 200 + 100);  
        this.node.children[1].children[0].getComponent(Label).string = '10';
        const animationComponent = this.node.children[0].addComponent(Animation);
        loader.loadResDir("cows/c10", SpriteFrame, function (err:any, assets:[], urls:string) {
           const clip = AnimationClip.createWithSpriteFrames(assets, 30);
           clip.wrapMode= AnimationClip.WrapMode.PingPong;
           animationComponent.defaultClip = clip;
           animationComponent.playOnLoad =true;
           animationComponent.play();
        });
        
        
    }

    start () {
        // Your initialization goes here.
         
         
        
         
    }
    createdCow(num:number){

        this.node.children[1].children[0].getComponent(Label).string = num.toString();
        const animationComponent = this.node.children[0].addComponent(Animation);
        loader.loadResDir("cows/c"+ num, SpriteFrame, function (err:any, assets:[], urls:string) {
           const clip = AnimationClip.createWithSpriteFrames(assets, 30);
           clip.wrapMode= AnimationClip.WrapMode.PingPong;
           animationComponent.defaultClip = clip;
           animationComponent.playOnLoad =true;
           animationComponent.play();
        });
    }
    //牛运动
    playCowWalk (sel:string) {
        console.log(sel)
        //const animationComponent = this.node.children[0].addComponent(Animation);
        //animationComponent.play('run-'+ sel); 
    }

    update (deltaTime: number) {
        // Your update function goes here.
        //this.node.getPosition(this._curPos);
        //this._deltaPos.x -= 0.3;
        //Vec3.add(this._curPos, this._curPos, this._deltaPos);
        //console.log(this._deltaPos.x)
        this._curPos.x -= deltaTime * this._speed;
        this.node.setPosition(this._curPos);
       // console.log(Math.abs(this._curPos.x))
        if (Math.abs(this._curPos.x) >= 750) {
            this.node.destroy();
            //console.log('--------------------------------------------------------------------------')
        }
        
    }
}
