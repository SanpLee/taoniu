import { _decorator, Component, Node, Label,find,Button,loader,SpriteFrame,Animation } from 'cc';
const { ccclass, property } = _decorator;
import { Gesture } from "./Gesture";
@ccclass('BtnInt')
export class BtnInt extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: Gesture})
    public Gesture: Gesture = null;
  
    start () {
        // Your initialization goes here.
    }

    onEnable(){
      
        
        this.node.getChildByName("changeNum").getComponent(Animation).play();
        // 以秒为单位的时间间隔
        let interval = 1;
        // 重复次数
        let repeat = 1;
        // 开始延时
        let delay = 4;
        this.schedule(function() {
            this.unscheduleAllCallbacks();
            this.node.active = false;
        }, interval, repeat, delay);
    }

    onDisable(){
        //find("Manager/ButtonStart").active = true;
        find("Manager/ButtonStart").getComponent(Button).interactable = true;
        this.Gesture.node.active = true;
        this.Gesture._runAn('Gesture-s1');   
    }

    


    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
