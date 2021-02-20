import { _decorator, Component, Node, AudioSource,Button,EventHandler,Event,find, Sprite,Animation } from 'cc';
const { ccclass, property } = _decorator;
import { Permanent } from './Permanent';
@ccclass('Music')
export class Music extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: Permanent})
    public Permanent: Permanent = null;
    //private musicStatus = true;

    onLoad(){
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = 'StartBtn';// 这个是代码文件名
        clickEventHandler.handler = 'callback';
        clickEventHandler.customEventData = 'foobar';

        const button = this.node.getChildByName('Button').getComponent(Button);
        button.clickEvents.push(clickEventHandler);


        const music = this.node.getChildByName('pic').getComponent(AudioSource);
        music.play();
    }

    start () {
        // Your initialization goes here.
    }

    callbackControllerMusic(event: Event, customEventData: string){
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        const node = event.target as Node;
        const button = node.getComponent(Button);
        //console.log(customEventData); // foobar
        //find("Loading").active = true;
        //const that = this;
        const bgMusic = find("Audio").getChildByName('pic');
        if(this.Permanent.musicStatus){
            this.Permanent.musicStatus = false;
            bgMusic.getComponent(AudioSource).stop();
            bgMusic.getComponent(Animation).stop(); 
        }else{
            this.Permanent.musicStatus = true;
            bgMusic.getComponent(AudioSource).play();
            bgMusic.getComponent(Animation).play(); 
        }
    }    

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
